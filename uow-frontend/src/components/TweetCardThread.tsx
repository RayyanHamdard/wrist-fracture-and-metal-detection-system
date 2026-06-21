import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TweetCardThreadType = {
  className?: string;
  daysAgo?: string;
  scientificDiscoveriesAndInventio?: string;
  theFieldOfRespiratoryMedicine?: string;
  thisLungCancerAwarenessMonth?: string;
  pastPresentAndFutureOfLunghe?: string;

  /** Style props */
  frameDivGap?: CSSProperties["gap"];
  frameDivMinWidth?: CSSProperties["minWidth"];
  frameDivWidth?: CSSProperties["width"];
  frameDivAlignSelf?: CSSProperties["alignSelf"];
  daysAgoMinWidth?: CSSProperties["minWidth"];
  frameDivAlignSelf1?: CSSProperties["alignSelf"];
  theFieldOfDisplay?: CSSProperties["display"];
  pastPresentAndDisplay?: CSSProperties["display"];
};

const TweetCardThread: FunctionComponent<TweetCardThreadType> = ({
  className = "",
  frameDivGap,
  frameDivMinWidth,
  frameDivWidth,
  frameDivAlignSelf,
  daysAgo,
  daysAgoMinWidth,
  frameDivAlignSelf1,
  scientificDiscoveriesAndInventio,
  theFieldOfRespiratoryMedicine,
  theFieldOfDisplay,
  thisLungCancerAwarenessMonth,
  pastPresentAndFutureOfLunghe,
  pastPresentAndDisplay,
}) => {
  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      gap: frameDivGap,
    };
  }, [frameDivGap]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {
      minWidth: frameDivMinWidth,
    };
  }, [frameDivMinWidth]);

  const frameDiv3Style: CSSProperties = useMemo(() => {
    return {
      width: frameDivWidth,
      alignSelf: frameDivAlignSelf,
    };
  }, [frameDivWidth, frameDivAlignSelf]);

  const daysAgoStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: daysAgoMinWidth,
    };
  }, [daysAgoMinWidth]);

  const frameDiv4Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: frameDivAlignSelf1,
    };
  }, [frameDivAlignSelf1]);

  const theFieldOfStyle: CSSProperties = useMemo(() => {
    return {
      display: theFieldOfDisplay,
    };
  }, [theFieldOfDisplay]);

  const pastPresentAndStyle: CSSProperties = useMemo(() => {
    return {
      display: pastPresentAndDisplay,
    };
  }, [pastPresentAndDisplay]);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start gap-[0.137rem] max-w-full text-left text-[0.85rem] text-gray-500 font-inter mq450:flex-wrap ${className}`}
      style={frameDiv1Style}
    >
      <div
        className="flex-1 flex flex-col items-start justify-start gap-[1.218rem] max-w-full"
        style={frameDiv2Style}
      >
        <div
          className="w-[23.2rem] flex flex-row items-start justify-start gap-[0.625rem] max-w-full mq450:flex-wrap"
          style={frameDiv3Style}
        >
          <img
            className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
            alt=""
            src="/div-tb-wt-author-profile@2x.png"
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem] box-border min-w-[12.875rem]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start mix-blend-normal">
                <a className="[text-decoration:none] relative leading-[1.05rem] font-semibold text-[inherit] inline-block min-w-[3.063rem]">
                  Wrist Fracture and Metal Detection System
                </a>
              </div>
              <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                  <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                    @WristFracture_ai
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                  <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                </div>
                <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                  <div
                    className="relative leading-[0.75rem] font-medium inline-block min-w-[3.188rem] shrink-0"
                    style={daysAgoStyle}
                  >
                    {daysAgo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start text-[0.944rem] text-gray-600">
          <div
            className="self-stretch flex flex-row items-start justify-start gap-[0.112rem]"
            style={frameDiv4Style}
          >
            <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[3]">
              
            </div>
            <div className="relative leading-[1.5rem] shrink-0 z-[3]">
              {scientificDiscoveriesAndInventio}
            </div>
          </div>
          <div
            className="relative leading-[1.5rem] z-[2]"
            style={theFieldOfStyle}
          >
            {theFieldOfRespiratoryMedicine}
          </div>
          <div className="relative leading-[1.5rem] whitespace-nowrap z-[1]">
            {thisLungCancerAwarenessMonth}
          </div>
          <div
            className="relative leading-[1.5rem]"
            style={pastPresentAndStyle}
          >
            {pastPresentAndFutureOfLunghe}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
        <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
          
        </div>
      </div>
    </div>
  );
};

export default TweetCardThread;
