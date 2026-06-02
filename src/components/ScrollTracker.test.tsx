/// <reference types="jest" />
/**
 * @jest-environment jsdom
 */

import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { expect, jest } from '@jest/globals';

jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
}));

import ScrollTracker from './ScrollTracker';
import { track } from '@vercel/analytics';

const trackMock = track as jest.MockedFunction<typeof track>;

describe('ScrollTracker', () => {
  let container: HTMLElement;
  const originalRaf = global.requestAnimationFrame;
  const originalCancel = global.cancelAnimationFrame;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    // Make requestAnimationFrame behave like a browser frame scheduler.
    // @ts-ignore
    global.requestAnimationFrame = (cb: FrameRequestCallback) => {
      return window.setTimeout(() => cb(performance.now()), 0) as any;
    };
    // @ts-ignore
    global.cancelAnimationFrame = (id: number) => window.clearTimeout(id);

    window.innerHeight = 800;
    window.scrollY = 0;
    window.history.pushState({}, '', '/test-path');
  });

  afterEach(() => {
    cleanup();
    // @ts-ignore
    global.requestAnimationFrame = originalRaf;
    // @ts-ignore
    global.cancelAnimationFrame = originalCancel;
    jest.clearAllMocks();
  });

  it('sends an event when user scrolls down one viewport', async () => {
    render(<ScrollTracker />, { container });

    expect(trackMock).not.toHaveBeenCalled();

    window.scrollY = window.innerHeight * 1;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(trackMock).toHaveBeenCalledWith('Page Scroll Depth', {
        depth: '1 screen',
        path: '/test-path',
      });
    });
  });

  it('sends subsequent events for additional viewport screens only once', async () => {
    render(<ScrollTracker />, { container });

    window.scrollY = window.innerHeight * 1;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(trackMock).toHaveBeenCalledWith('Page Scroll Depth', {
        depth: '1 screen',
        path: '/test-path',
      });
    });

    window.scrollY = window.innerHeight * 2;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(trackMock).toHaveBeenCalledWith('Page Scroll Depth', {
        depth: '2 screens',
        path: '/test-path',
      });
    });

    expect(trackMock.mock.calls).toEqual([
      ['Page Scroll Depth', { depth: '1 screen', path: '/test-path' }],
      ['Page Scroll Depth', { depth: '2 screens', path: '/test-path' }],
    ]);
  });
});
