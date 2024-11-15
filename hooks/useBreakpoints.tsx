import { useEffect, useState } from 'react';
import breakpoints from '../util/breakpoints';

const useBreakpoint = () => {
    const [breakpoint, setBreakPoint] = useState('');
    const [windowSize, setWindowSize] = useState<{
        width: number,
        height: number,
    }>({
        width: 0,
        height: 0,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth ?? 0,
            height: window.innerHeight ?? 0,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (0 < windowSize.width && windowSize.width < 600) {
            setBreakPoint(breakpoints[640]);
        }
        if (600 < windowSize.width && windowSize.width < 960) {
            setBreakPoint(breakpoints[768]);
        }
        if (960 < windowSize.width && windowSize.width < 1280) {
            setBreakPoint(breakpoints[1024]);
        }
        if (1280 < windowSize.width && windowSize.width < 1920) {
            setBreakPoint(breakpoints[1280]);
        }
        if (windowSize.width >= 1920) {
            setBreakPoint(breakpoints[1536]);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize.width]);
    return breakpoint;
};

export default useBreakpoint;