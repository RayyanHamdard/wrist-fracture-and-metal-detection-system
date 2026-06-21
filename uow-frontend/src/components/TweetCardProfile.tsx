import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TweetCardProfileType = {
  className?: string;
  exploreTheLatestInsightsFrom?: string;
  medicalOfficerAtDiagnosticsHubAiInAT?: string;

  /** Style props */
  frameDivGap?: CSSProperties["gap"];
  frameDivMinWidth?: CSSProperties["minWidth"];
  frameDivWidth?: CSSProperties["width"];
  frameDivAlignSelf?: CSSProperties["alignSelf"];
  frameDivAlignSelf1?: CSSProperties["alignSelf"];
  frameDivAlignSelf2?: CSSProperties["alignSelf"];
  medicalOfficerAtDisplay?: CSSProperties["display"];
};

const TweetCardProfile: FunctionComponent<TweetCardProfileType> = ({
  className = "",
  frameDivGap,
  frameDivMinWidth,
  frameDivWidth,
  frameDivAlignSelf,
  frameDivAlignSelf1,
  frameDivAlignSelf2,
  exploreTheLatestInsightsFrom,
  medicalOfficerAtDiagnosticsHubAiInAT,
  medicalOfficerAtDisplay,
}) => {
  const frameDiv5Style: CSSProperties = useMemo(() => {
    return {
      gap: frameDivGap,
    };
  }, [frameDivGap]);

  const frameDiv6Style: CSSProperties = useMemo(() => {
    return {
      minWidth: frameDivMinWidth,
    };
  }, [frameDivMinWidth]);

  const frameDiv7Style: CSSProperties = useMemo(() => {
    return {
      width: frameDivWidth,
      alignSelf: frameDivAlignSelf,
    };
  }, [frameDivWidth, frameDivAlignSelf]);

  const frameDiv8Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: frameDivAlignSelf1,
    };
  }, [frameDivAlignSelf1]);

  const frameDiv9Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: frameDivAlignSelf2,
    };
  }, [frameDivAlignSelf2]);

  const medicalOfficerAtStyle: CSSProperties = useMemo(() => {
    return {
      display: medicalOfficerAtDisplay,
    };
  }, [medicalOfficerAtDisplay]);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start gap-[0.15rem] max-w-full text-left text-[0.85rem] text-gray-500 font-inter mq450:flex-wrap ${className}`}
      style={frameDiv5Style}
    >
      <div
        className="flex-1 flex flex-col items-start justify-start gap-[1.218rem] max-w-full"
        style={frameDiv6Style}
      >
        <div
          className="w-[23.2rem] flex flex-row items-start justify-start gap-[0.625rem] max-w-full mq450:flex-wrap"
          style={frameDiv7Style}
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
                  <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.25rem]">
                    1 week ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600"
          style={frameDiv8Style}
        >
          <div
            className="self-stretch flex flex-row items-start justify-start gap-[0.112rem]"
            style={frameDiv9Style}
          >
            <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[4]">
              
            </div>
            <div className="relative leading-[1.5rem] shrink-0 whitespace-nowrap z-[4]">
              {exploreTheLatestInsightsFrom}
            </div>
          </div>
          <div
            className="relative leading-[1.5rem] inline-block max-w-full z-[3]"
            style={medicalOfficerAtStyle}
          >
            {medicalOfficerAtDiagnosticsHubAiInAT}
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

export default TweetCardProfile;
