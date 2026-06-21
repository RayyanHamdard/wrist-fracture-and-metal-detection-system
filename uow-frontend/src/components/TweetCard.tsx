import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TweetCardType = {
  className?: string;
  hoursAgo?: string;
  aIinhealthcareIsntJustAbout?: string;

  /** Style props */
  DiagnosticsHubaiTextDecoration?: CSSProperties["textDecoration"];
  frameDivWidth?: CSSProperties["width"];
  divTbWtUsernameFlex?: CSSProperties["flex"];
  divTbWtTimeFlex?: CSSProperties["flex"];
  hoursAgoMinWidth?: CSSProperties["minWidth"];
};

const TweetCard: FunctionComponent<TweetCardType> = ({
  className = "",
  DiagnosticsHubaiTextDecoration,
  frameDivWidth,
  divTbWtUsernameFlex,
  divTbWtTimeFlex,
  hoursAgo,
  hoursAgoMinWidth,
  aIinhealthcareIsntJustAbout,
}) => {
  const DiagnosticsHubaiStyle: CSSProperties = useMemo(() => {
    return {
      textDecoration: DiagnosticsHubaiTextDecoration,
    };
  }, [DiagnosticsHubaiTextDecoration]);

  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      width: frameDivWidth,
    };
  }, [frameDivWidth]);

  const divTbWtUsernameStyle: CSSProperties = useMemo(() => {
    return {
      flex: divTbWtUsernameFlex,
    };
  }, [divTbWtUsernameFlex]);

  const divTbWtTimeStyle: CSSProperties = useMemo(() => {
    return {
      flex: divTbWtTimeFlex,
    };
  }, [divTbWtTimeFlex]);

  const hoursAgoStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: hoursAgoMinWidth,
    };
  }, [hoursAgoMinWidth]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[1.218rem] text-left text-[0.85rem] text-gray-500 font-inter ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] mq450:flex-wrap">
        <img
          className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
          alt=""
          src="/div-tb-wt-author-profile@2x.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem] box-border min-w-[12.875rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start mix-blend-normal">
              <div
                className="relative leading-[1.05rem] font-semibold inline-block min-w-[3.063rem]"
                style={DiagnosticsHubaiStyle}
              >
                Wrist Fracture and Metal Detection System
              </div>
            </div>
            <div
              className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]"
              style={frameDivStyle}
            >
              <div
                className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal"
                style={divTbWtUsernameStyle}
              >
                <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                  @WristFracture_ai
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
              </div>
              <div
                className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal"
                style={divTbWtTimeStyle}
              >
                <div
                  className="relative leading-[0.75rem] font-medium inline-block min-w-[3.75rem] shrink-0"
                  style={hoursAgoStyle}
                >
                  {hoursAgo}
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
      <div className="flex flex-row items-start justify-start gap-[0.112rem] text-[0.944rem] text-gray-600">
        <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[3]">
          
        </div>
        <div className="relative leading-[1.5rem] shrink-0 z-[3]">
          {aIinhealthcareIsntJustAbout}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
