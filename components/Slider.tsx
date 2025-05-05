"use client";
import Heading from "./typography/Heading";
import Slide, { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import { wrapLink } from "util/index";
import clsx from "clsx";
import Transition from "components/Transition";
import Image from "components/Image";
import { AppProps, Content, ContentData } from "index";

import staticImages from "util/images";
import { useRef, useState, useMemo, Children, useEffect } from "react";
import { Button } from "@headlessui/react";

type Props = {
  slide?: boolean;
  animate?: boolean;
  type: SlideProps["type"];
  title: NonNullable<ContentData>["title"];
  headline: NonNullable<ContentData>["headline"];
  slides: TypeOmittedSlideProps[];
};

const Slider = ({ type, title, headline, slides, slide = false }: Props) => {
  slides = slides.slice(0, 3);
  // delay-[1000ms], delay-[2000ms], delay-[3000ms]

  return (
    <Transition>
      {(start: boolean) => (
        <>
          {(title || headline) && (
            <div className="container mx-auto">
              <Heading level={2}>{title}</Heading>
              <p className="my-4">{headline}</p>
            </div>
          )}
          <div
            className={clsx(
              slide ? "flex-col" : "flex-row flex-nowrap",
              "flex md:flex-row justify-start md:justify-center min-h-96 overflow-x-scroll no-scrollbar gap-6"
            )}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={clsx(
                  "basis-4/5 md:basis-1/4 shrink-0 md:shrink ease-in-out transition-transform duration-[1000ms]",
                  `delay-[${i + 1}000ms]`
                  // !start ? "-translate-x-full" : "-translate-x-0"
                )}
              >
                {wrapLink(
                  slide.content.link,
                  <Slide
                    {...{
                      type,
                      ...slide,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Transition>
  );
};

const B = () => {
  const b = [
    <>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.laptopbag}
          loading="lazy"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.kal}
          loading="lazy"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.marta1}
          loading="lazy"
          sizes="(max-width: 1439px) 25vw, 100vw"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
    </>,
    <>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.laptopbag}
          loading="lazy"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.kal}
          loading="lazy"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
      <a href="#" className="k-insta-post w-inline-block">
        <Image
          src={staticImages.marta1}
          loading="lazy"
          sizes="(max-width: 1439px) 25vw, 100vw"
          alt=""
          className="k-insta-img"
        />
        <div className="k-insta-overlay">
          <div className="k-icon-24 w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"></path>
            </svg>
          </div>
        </div>
      </a>
    </>,
  ];

  return (
    <div className="k-slider-wrapper">
      <div
        data-delay="4000"
        data-animation="slide"
        className="k-insta-slider w-slider"
        data-autoplay="false"
        data-easing="ease"
        data-hide-arrows="false"
        data-disable-swipe="false"
        data-autoplay-limit="0"
        data-nav-spacing="3"
        data-duration="500"
        data-infinite="true"
      >
        <div className="k-slider-mask-space-around w-slider-mask">
          {b.map((ele, i) => (
            <div className="k-insta-slide w-slide transition duration-500 -translate-x-0">
              <div className="k-insta-feed-slide">{ele}</div>
            </div>
          ))}
        </div>

        <div className="k-r-arrow w-slider-arrow-right">
          <div className="k-arrow-icon w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </div>
        <div className="hide-slider-dots w-slider-nav w-round"></div>
      </div>
    </div>
  );
};

export const WebflowSlider = ({
  children,
  visibleItemsCount = 1, // how many items to show
  isInfinite, // is it an infinite loop?
  withIndicator, // show dots?
}: AppProps & { visibleItemsCount: number; isInfinite: boolean, withIndicator: boolean }) => {
  const indicatorContainerRef = useRef(null);
  const [timeoutInProgress, setTimeoutInProgress] = useState(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions

  /**
   * Total item
   */
  const originalItemsLength = useMemo(
    () => Children.count(children),
    [children]
  );

  /**
   * Is the carousel repeating it's item
   */
  const isRepeating = useMemo(
    () => isInfinite && Children.count(children) > visibleItemsCount,
    [children, isInfinite, visibleItemsCount]
  );

  /**
   * Current Index Item of the Carousel
   */
  const [currentIndex, setCurrentIndex] = useState(
    isRepeating ? visibleItemsCount : 0
  );

  /**
   * Is the carousel's transition enabled
   */
  const [isTransitionEnabled, setTransitionEnabled] = useState(true);

  /**
   * First touch position to be used in calculation for the swipe speed
   */
  const [touchPosition, setTouchPosition] = useState(null);

  /**
   * Handle if the carousel is repeating
   * and the currentIndex have been set to the last or first item
   */
  // useEffect(() => {
  //   if (isRepeating) {
  //     if (
  //       currentIndex === visibleItemsCount ||
  //       currentIndex === originalItemsLength
  //     ) {
  //       setTransitionEnabled(true);
  //     }
  //   }
  // }, [currentIndex, isRepeating, visibleItemsCount, originalItemsLength]);

  // useEffect(() => {
  //   if (withIndicator) {
  //     const active =
  //       indicatorContainerRef.current?.querySelector(".dots-active");
  //     if (active) {
  //       let index = active.getAttribute("data-index");
  //       if (index !== null && indicatorContainerRef.current?.scrollTo) {
  //         indicatorContainerRef.current?.scrollTo({
  //           left: ((Number(index) - 2) / 5) * 50,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   }
  // }, [withIndicator, currentIndex]);

  /**
   * Move forward to the next item
   */
  const nextItem = () => {
    const isOnEdgeForward = currentIndex > originalItemsLength;
    if (isOnEdgeForward) {
      setTimeoutInProgress(true);
    }



    if (isRepeating || currentIndex < originalItemsLength - visibleItemsCount) {
      if (
        currentIndex === visibleItemsCount ||
        currentIndex === originalItemsLength
      ) {
        setTransitionEnabled(true);
      }
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  /**
   * Move backward to the previous item
   */
  const previousItem = () => {
    const isOnEdgeBack = isRepeating
      ? currentIndex <= visibleItemsCount
      : currentIndex === 0;

    if (isOnEdgeBack) {
      setTimeoutInProgress(true);
    }

    if (isRepeating || currentIndex > 0) {
      if (
        currentIndex === visibleItemsCount ||
        currentIndex === originalItemsLength
      ) {
        setTransitionEnabled(true);
      }
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  const childrenWrapper = (children: any) => Children.map(children, child => <div style={{ width: `calc(100% / ${visibleItemsCount})` }} className="grow shrink-0">{child}</div>)

  /**
   * Handle when the user start the swipe gesture
   * @param e TouchEvent
   */
  // const handleTouchStart = (e) => {
  //   // Save the first position of the touch
  //   const touchDown = e.touches[0].clientX;
  //   setTouchPosition(touchDown);
  // };

  /**
   * Handle when the user move the finger in swipe gesture
   * @param e TouchEvent
   */
  // const handleTouchMove = (e) => {
  //   // Get initial location
  //   const touchDown = touchPosition;

  //   // Proceed only if the initial position is not null
  //   if (touchDown === null) {
  //     return;
  //   }

  //   // Get current position
  //   const currentTouch = e.touches[0].clientX;

  //   // Get the difference between previous and current position
  //   const diff = touchDown - currentTouch;

  //   // Go to next item
  //   if (diff > 5) {
  //     nextItem();
  //   }

  //   // Go to previous item
  //   if (diff < -5) {
  //     previousItem();
  //   }

  //   // Reset initial touch position
  //   setTouchPosition(null);
  // };

  /**
   * Handle when carousel transition's ended
   */
  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(originalItemsLength);
      } else if (currentIndex === originalItemsLength + visibleItemsCount) {
        console.log("setting transition to false and index to " + visibleItemsCount)
        setTransitionEnabled(false);
        setCurrentIndex(visibleItemsCount);
      }
    }

    setTimeoutInProgress(false);
  };

  /**
   * Render previous items before the first item
   */
  const extraPreviousItems = useMemo(() => {
    let output = [];
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(childrenWrapper(children)[originalItemsLength - 1 - index]);
    }
    output.reverse();
    return output;
  }, [children, originalItemsLength, visibleItemsCount]);

  /**
   * Render next items after the last item
   */
  const extraNextItems = useMemo(() => {
    let output = [];
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(childrenWrapper(children)[index]);
    }
    return output;
  }, [children, visibleItemsCount]);

  // render n (n being the count of original items / visibleItemsCount) dots
  const renderDots = useMemo(() => {
    let output = [];

    const localShow = isRepeating ? visibleItemsCount : 0;
    const localLength = isRepeating
      ? originalItemsLength
      : Math.ceil(originalItemsLength / visibleItemsCount);
    const calculatedActiveIndex =
      currentIndex - localShow < 0
        ? originalItemsLength + (currentIndex - localShow)
        : currentIndex - localShow;

    for (let index = 0; index < localLength; index++) {
      let className = "";
      if (calculatedActiveIndex === index) {
        className = "dots-active";
      } else {
        if (calculatedActiveIndex === 0) {
          if (calculatedActiveIndex + index <= 2) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        } else if (calculatedActiveIndex === localLength - 1) {
          if (Math.abs(calculatedActiveIndex - index) <= 2) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        } else {
          if (Math.abs(calculatedActiveIndex - index) === 1) {
            className = "dots-close";
          } else {
            className = "dots-far";
          }
        }
      }
      output.push(<div key={index} data-index={index} className={className} />);
    }

    return output;
  }, [currentIndex, isRepeating, originalItemsLength, visibleItemsCount]);

  const isNextButtonVisible = useMemo(() => {
    return (
      isRepeating || currentIndex < originalItemsLength - visibleItemsCount
    );
  }, [isRepeating, currentIndex, originalItemsLength, visibleItemsCount]);

  const isPrevButtonVisible = useMemo(
    () => isRepeating || currentIndex > 0,
    [isRepeating, currentIndex]
  );
  const classes = {
    btnControl: "absolute z-10 top-1/2"
  }

  return (
    <div className="flex flex-col relative w-full text-center">
      <div className="flex w-full relative">
        {isPrevButtonVisible ? (
          <button
            disabled={timeoutInProgress}
            style={{
              cursor: timeoutInProgress ? "not-allowed" : "pointer",
              pointerEvents: timeoutInProgress ? "none" : "inherit"
            }}
            onClick={previousItem}
            className={clsx(classes.btnControl, " k-l-arrow w-slider-arrow-left")}
          >
            <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg></div>
          </button>
        ) : null}
        <div className="overflow-hidden w-full h-full" style={{ margin: "12.5vw" }}>
          <div
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItemsCount)}%)`,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
            className={clsx("flex duration-500", isTransitionEnabled ? "transition" : "transition-none")}
          >
            {isRepeating && extraPreviousItems}
            {childrenWrapper(children)}
            {isRepeating && extraNextItems}
          </div>
        </div>
        {isNextButtonVisible ? (
          <button
            disabled={timeoutInProgress}
            style={{
              cursor: timeoutInProgress ? "not-allowed" : "pointer",
              pointerEvents: timeoutInProgress ? "none" : "inherit"
            }}
            onClick={nextItem}
            className={clsx(classes.btnControl, " k-r-arrow w-slider-arrow-right")}
          >
            <div className="k-arrow-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg></div>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Slider;