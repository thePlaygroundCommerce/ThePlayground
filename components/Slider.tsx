"use client";
import Heading from "./typography/Heading";
import Slide, { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import { wrapLink } from "util/index";
import clsx from "clsx";
import Transition from "components/Transition";
import { AppProps, ContentData } from "index";
import { useDrag } from "@use-gesture/react";

import { useRef, useState, useMemo, Children, useEffect, SetStateAction } from "react";

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
                  "basis-4/5 md:basis-1/4 shrink-0 md:shrink ease-in-out transition-transform duration-1000",
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

export const WebflowSlider = ({
  active = 0,
  children,
  className,
  onIndexChange = () => { },
  visibleItemsCount = 1, // how many items to show
  isInfinite, // is it an infinite loop?
  withIndicator = false, // show dots?
  withControls = false, // show dots?
}: AppProps & { active?: number; visibleItemsCount: number; isInfinite: boolean, withIndicator: boolean, withControls: boolean, onIndexChange?: (index: number) => void }) => {
  const ref = useRef(null);
  const [timeoutInProgress, setTimeoutInProgress] = useState(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions

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
    isRepeating ? visibleItemsCount : active
  );

  /**
   * Total item
   */
  const originalItemsLength = useMemo(
    () => Children.count(children),
    [children]
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
  useEffect(() => {
    if (active !== currentIndex) onIndexChange(currentIndex)

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
  }, [currentIndex]);

  useEffect(() => {
    if (active !== currentIndex) goToItem(active)
  }, [active])

  const goToItem = (index: number | SetStateAction<number>) => {

    if (typeof index === "number") onIndexChange(index)
    setCurrentIndex(index)
  }

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
      goToItem((prevState) => prevState + 1);
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
      goToItem((prevState) => prevState - 1);
    }
  };
  const childrenWrapper = (children: any) => Children.map(children, (child, i) => <div key={i} style={{ width: `calc(100% / ${visibleItemsCount})` }} className="grow shrink-0">{child}</div>)

  const handleDrag: Parameters<typeof useDrag>[0] = ({ last, movement: [mx] }) => {
    const DRAG_THRESHOLD_PX = 50;
    if (!last || timeoutInProgress) return;

    if (mx <= -DRAG_THRESHOLD_PX) {
      nextItem();
    } else if (mx >= DRAG_THRESHOLD_PX) {
      previousItem();
    }
  };

  /**
   * Handle when carousel transition's ended
   */
  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        goToItem(originalItemsLength);
      } else if (currentIndex === originalItemsLength + visibleItemsCount) {
        console.log("setting transition to false and index to " + visibleItemsCount)
        setTransitionEnabled(false);
        goToItem(visibleItemsCount);
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
    const classes = {
      active: "bg-red-500",
      close: "",
      far: ""
    }

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
        className = classes.active;
      } else {
        if (calculatedActiveIndex === 0) {
          if (calculatedActiveIndex + index <= 2) {
            className = classes.close;
          } else {
            className = classes.far;
          }
        } else if (calculatedActiveIndex === localLength - 1) {
          if (Math.abs(calculatedActiveIndex - index) <= 2) {
            className = classes.close;
          } else {
            className = classes.far;
          }
        } else {
          if (Math.abs(calculatedActiveIndex - index) === 1) {
            className = classes.close;
          } else {
            className = classes.far;
          }
        }
      }
      output.push(<div key={index} data-index={index} className={clsx(className, "rounded-full bg-black w-3 h-3")} />);
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

  useDrag(handleDrag, { target: ref, axis: "x" })

  return (
    <div className={clsx("flex flex-col relative w-full text-center touch-none", className)}>
      <div className="flex w-full relative">
        {withControls && isPrevButtonVisible ? (
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
        <div className="overflow-hidden w-full h-full">
          <div
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItemsCount)}%)`,
            }}

            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            ref={ref}
            onTransitionEnd={() => handleTransitionEnd()}
            className={clsx("flex duration-500 touch-none", isTransitionEnabled ? "transition" : "transition-none")}
          >
            {isRepeating && extraPreviousItems}
            {childrenWrapper(children)}
            {isRepeating && extraNextItems}
          </div>
          <div className="flex justify-center gap-6">
            {withIndicator && renderDots}
          </div>
        </div>
        {withControls && isNextButtonVisible ? (
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