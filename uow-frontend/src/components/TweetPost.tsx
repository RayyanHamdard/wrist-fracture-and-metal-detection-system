import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TweetPostType = {
  className?: string;
  lungcancerRemainsOneOfTheMost?: string;
  globalhealthConcernsYetEarlyd?: string;
  keyToSavingLivesThis?: string;
  lungCancerAwarenessMonthWe?: string;
  howFarMedicalimagingInnovation?: string;
  castingAWiderNetInProactive?: string;

  /** Style props */
  globalhealthConcernsYetDisplay?: CSSProperties["display"];
  howFarMedicalimagingDisplay?: CSSProperties["display"];
  frameDivJustifyContent?: CSSProperties["justifyContent"];
  frameDivGap?: CSSProperties["gap"];
  frameDivFlex?: CSSProperties["flex"];
  tweetAlignSelf?: CSSProperties["alignSelf"];
  tweetGap?: CSSProperties["gap"];
  castingAWiderDisplay?: CSSProperties["display"];
  castingAWiderMinWidth?: CSSProperties["minWidth"];
};

const TweetPost: FunctionComponent<TweetPostType> = ({
  className = "",
  lungcancerRemainsOneOfTheMost,
  globalhealthConcernsYetEarlyd,
  globalhealthConcernsYetDisplay,
  keyToSavingLivesThis,
  lungCancerAwarenessMonthWe,
  howFarMedicalimagingInnovation,
  howFarMedicalimagingDisplay,
  frameDivJustifyContent,
  frameDivGap,
  frameDivFlex,
  tweetAlignSelf,
  tweetGap,
  castingAWiderNetInProactive,
  castingAWiderDisplay,
  castingAWiderMinWidth,
}) => {
  const globalhealthConcernsYetStyle: CSSProperties = useMemo(() => {
    return {
      display: globalhealthConcernsYetDisplay,
    };
  }, [globalhealthConcernsYetDisplay]);

  const howFarMedicalimagingStyle: CSSProperties = useMemo(() => {
    return {
      display: howFarMedicalimagingDisplay,
    };
  }, [howFarMedicalimagingDisplay]);

  const frameDiv10Style: CSSProperties = useMemo(() => {
    return {
      justifyContent: frameDivJustifyContent,
      gap: frameDivGap,
    };
  }, [frameDivJustifyContent, frameDivGap]);

  const frameDiv11Style: CSSProperties = useMemo(() => {
    return {
      flex: frameDivFlex,
    };
  }, [frameDivFlex]);

  const tweetStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: tweetAlignSelf,
      gap: tweetGap,
    };
  }, [tweetAlignSelf, tweetGap]);

  const castingAWiderStyle: CSSProperties = useMemo(() => {
    return {
      display: castingAWiderDisplay,
      minWidth: castingAWiderMinWidth,
    };
  }, [castingAWiderDisplay, castingAWiderMinWidth]);

  return (
    <div
      className={`self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] mix-blend-normal max-w-full text-left text-[0.944rem] text-gray-600 font-inter ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.218rem] max-w-full text-[0.85rem] text-gray-500">
        <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] mq450:flex-wrap">
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
                  <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.25rem]">
                    1 week ago
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
            <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
              
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[0.112rem] max-w-full text-[0.944rem] text-gray-600">
          <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[5]">
            
          </div>
          <div className="relative leading-[1.5rem] shrink-0 z-[5]">
            {lungcancerRemainsOneOfTheMost}
          </div>
        </div>
      </div>
      <div
        className="relative leading-[1.5rem] inline-block max-w-full z-[4]"
        style={globalhealthConcernsYetStyle}
      >
        {globalhealthConcernsYetEarlyd}
      </div>
      <div className="relative leading-[1.5rem] z-[3]">
        {keyToSavingLivesThis}
      </div>
      <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">
        {lungCancerAwarenessMonthWe}
      </div>
      <div
        className="relative leading-[1.5rem] z-[1]"
        style={howFarMedicalimagingStyle}
      >
        {howFarMedicalimagingInnovation}
      </div>
      <div
        className="self-stretch flex flex-row items-end justify-start gap-[2.506rem] mq450:gap-[1.25rem] mq450:flex-wrap"
        style={frameDiv10Style}
      >
        <div
          className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]"
          style={frameDiv11Style}
        >
          <div
            className="self-stretch flex flex-row items-start justify-start gap-[0.387rem]"
            style={tweetStyle}
          >
            <div
              className="relative leading-[1.5rem] whitespace-nowrap"
              style={castingAWiderStyle}
            >
              {castingAWiderNetInProactive}
            </div>
            <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0">
              
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[0.937rem] text-[0.569rem] text-black">
          <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
            
          </div>
          <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
            
          </div>
          <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetPost;
