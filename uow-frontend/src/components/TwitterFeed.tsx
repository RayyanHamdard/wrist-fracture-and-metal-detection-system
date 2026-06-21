import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import TweetCard from "./TweetCard";
import TweetCardThread from "./TweetCardThread";
import TweetCardProfile from "./TweetCardProfile";
import TweetPost from "./TweetPost";

export type TwitterFeedType = {
  className?: string;
};

const TwitterFeed: FunctionComponent<TwitterFeedType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch grid grid-cols-1 gap-4 xl:grid-cols-2 max-w-full text-left text-[0.944rem] text-gray-600 font-inter ${className}`}
    >
      <div className="h-[30.544rem] w-full rounded-lg overflow-y-auto shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[0.937rem] box-border mix-blend-normal max-w-full lg:flex-1 lg:pr-[0rem] lg:box-border mq750:min-w-full mq450:h-auto">
        <div className="flex-1 bg-white flex flex-col items-start justify-start gap-[0.937rem] mix-blend-normal max-w-full">
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.325rem] max-w-full mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[1.218rem] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] text-[0.85rem] text-gray-500 mq450:flex-wrap">
                  <img
                    className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
                    loading="lazy"
                    alt=""
                    src="/div-tb-wt-author-profile@2x.png"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem] box-border min-w-[12.875rem]">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start mix-blend-normal">
                        <div className="relative leading-[1.05rem] font-semibold inline-block min-w-[3.063rem]">
                          Wrist Fracture and Metal Detection System
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                            @WristFracture_ai
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                          <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                        </div>
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium shrink-0">
                            14 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.281rem] box-border max-w-full">
                  <div className="relative leading-[1.5rem] z-[1]">{`How far are we willing to go to ensure #healthcare `}</div>
                  <div className="relative leading-[1.5rem]">
                    reaches everyone?
                  </div>
                </div>
                <div className="relative leading-[1.5rem] whitespace-nowrap z-[1]">{`Check out our exclusive teaser and watch this space `}</div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
                <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                  
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-end justify-start gap-[0.968rem] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-end py-[0rem] pl-[0rem] pr-[0.812rem] box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start max-w-full">
                  <div className="relative leading-[1.5rem] whitespace-nowrap">{`for the full story, premiering soon at #UnionConf2024. `}</div>
                  <div className="relative text-[0.9rem] leading-[1.5rem] font-medium text-mediumblue">
                    https://t.co/vumVzzcF2u
                  </div>
                </div>
              </div>
              <div className="w-[3.75rem] flex flex-row items-start justify-start gap-[0.937rem] text-[0.569rem] text-black">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.5rem] box-border max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.218rem] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] mq450:flex-wrap">
                  <img
                    className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
                    alt=""
                    src="/div-tb-wt-author-profile@2x.png"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem] box-border min-w-[12.875rem]">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start mix-blend-normal">
                        <div className="relative leading-[1.05rem] font-semibold inline-block min-w-[3.063rem]">
                          Wrist Fracture and Metal Detection System
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                            @WristFracture_ai
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                          <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                        </div>
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.75rem] shrink-0">
                            18 hours ago
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
                <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.112rem]">
                    <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[2]">
                      
                    </div>
                    <div className="relative leading-[1.5rem] shrink-0 z-[2]">
                      On this #InternationalDayOfRadiology, we celebrate
                    </div>
                  </div>
                  <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`the vital role of #radiologists and the impact of #AI in `}</div>
                </div>
              </div>
              <div className="relative text-[0.944rem] leading-[1.5rem] text-gray-600">
                supporting their work.
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="relative leading-[1.5rem] z-[2]">{`Our multi-center study in the UAE reveals how AI can `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`streamline visa screening, aiding radiologists in `}</div>
            </div>
            <div className="self-stretch flex flex-row items-end justify-start gap-[0.537rem] text-[0.569rem] text-black mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem] text-[0.944rem] text-gray-600">
                <div className="relative leading-[1.5rem] whitespace-nowrap">
                  classifying Wrist X-rays (CXRs) with high
                </div>
              </div>
              <div className="flex flex-col items-start justify-end pt-[0rem] pb-[2.093rem] pl-[0rem] pr-[0.75rem] text-[0.944rem] text-gray-600">
                <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center">
                  
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.312rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.312rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
              <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                
              </div>
            </div>
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.5rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <TweetCard
                hoursAgo="21 hours ago"
                aIinhealthcareIsntJustAbout="#AIinhealthcare isn’t just about advancing"
              />
              <div className="relative leading-[1.5rem] z-[2]">{`#technology; it’s about real lives, real families, and the `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`precious time it gives them with each other. Diane `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full">
                McCallum’s story is a testament to this impact.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`After a persistent cough led to an X-ray at Stobhill `}</div>
              <div className="self-stretch flex flex-row items-end justify-start gap-[9.9rem] mq450:gap-[4.938rem] mq450:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.681rem]">
                    <div className="relative leading-[1.5rem] whitespace-nowrap">
                      Hospital, #AI assisted
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
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-[0.625rem] px-[0.312rem] pb-[0.5rem] gap-[0.937rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start gap-[0.512rem] max-w-full text-[0.85rem] text-gray-500 mq450:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-[1.25rem] min-w-[15.125rem] max-w-full">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] mq450:flex-wrap">
                    <img
                      className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
                      alt=""
                      src="/div-tb-wt-author-profile@2x.png"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem] box-border min-w-[12.875rem]">
                      <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                        <div className="self-stretch overflow-hidden flex flex-row items-start justify-start mix-blend-normal">
                          <div className="relative leading-[1.05rem] font-semibold inline-block min-w-[3.063rem]">
                            Wrist Fracture and Metal Detection System
                          </div>
                        </div>
                        <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                          <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                            <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                              @WristFracture_ai
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                            <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                          </div>
                          <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                            <div className="relative leading-[0.75rem] font-medium shrink-0">
                              22 hours ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-[0.944rem] text-gray-600">
                    <div className="self-stretch relative leading-[1.5rem]">{`#WorldRadiographyDay has arrived, marking nearly `}</div>
                    <div className="relative leading-[1.5rem]">
                      130 years since Wilhelm Roentgen's revolutionary X-
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
                  <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                    
                  </div>
                </div>
              </div>
              <div className="relative leading-[1.5rem] z-[1]">
                ray discovery. From fixed units to portable solutions, X-
              </div>
              <div className="relative leading-[1.5rem] z-[2]">{`ray has transformed the world of #MedicalImaging and `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`patient care. Today, #AI-powered X-ray has huge `}</div>
              <div className="relative leading-[1.5rem] z-[4]">
                <span>{`potential for `}</span>
                <span className="text-[0.9rem] font-medium text-mediumblue">
                  https://t.co/tj13ub1uXz
                </span>
              </div>
            </div>
            <div className="mr-[-0.382rem] w-[3.75rem] flex flex-row items-start justify-start gap-[0.937rem] text-[0.569rem] text-black">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[1.625rem] pl-[0.75rem] pr-[0.312rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.387rem] max-w-full mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[1.218rem] min-w-[15.25rem] max-w-full">
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
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                            @WristFracture_ai
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                          <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                        </div>
                        <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                          <div className="relative leading-[0.75rem] font-medium shrink-0">
                            23 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
                  <div className="w-[5.25rem] relative leading-[1.5rem] flex items-center z-[5]">
                    Bonjour! 🖐
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                    <div className="relative leading-[1.5rem] inline-block max-w-full z-[4]">{`Team @WristFracture_ai is gearing up for @TheUnion_TBLH `}</div>
                    <div className="relative leading-[1.5rem] z-[3]">{`@TheUnion_TBLH #UnionConf2024 on #LungHealth `}</div>
                    <div className="relative leading-[1.5rem] z-[2]">{`in Bali, Indonesia, from 12-16 November 2024! We're `}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
                <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                  
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-end justify-start gap-[0.968rem] max-w-full text-[0.944rem] text-gray-600">
              <div className="self-stretch flex flex-row items-start justify-end py-[0rem] pl-[0rem] pr-[1rem] box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start max-w-full">
                  <div className="relative leading-[1.5rem] whitespace-nowrap z-[1]">{`excited to connect with #global partners dedicated to `}</div>
                  <div className="relative leading-[1.5rem] inline-block max-w-full">{`advancing lung health and addressing diseases like `}</div>
                  <div className="relative leading-[1.5rem]">
                    <span>{`#TB, #pediatricTB, `}</span>
                    <span className="text-[0.9rem] font-medium text-mediumblue">
                      https://t.co/BiQqhxsK7A
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[3.75rem] h-[0.006rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] box-border gap-[0.937rem] text-[0.569rem] text-black">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-start pt-[0.625rem] px-[0.75rem] pb-[0.5rem] gap-[0.2rem] mix-blend-normal max-w-full">
            <div className="flex flex-col items-start justify-start gap-[0.968rem] max-w-[calc(100%_-_22px)]">
              <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.25rem] gap-[0.625rem] text-[0.85rem] text-gray-500 mq450:flex-wrap">
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
                      <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                        <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                          @WristFracture_ai
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                        <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                      </div>
                      <div className="overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                        <div className="relative leading-[0.75rem] font-medium shrink-0">
                          23 hours ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.531rem] box-border max-w-full">
                <div className="relative leading-[1.5rem] z-[4]">{`We’re here at the 2024 SPECTRUM Pakistan Conference `}</div>
                <div className="relative leading-[1.5rem] z-[3]">{`in Mumbai! Excited to join global experts in `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">{`interventional #oncology to explore the latest `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`advancements and share insights at this premier `}</div>
                <div className="relative leading-[1.5rem]">event.</div>
              </div>
              <div className="flex flex-col items-start justify-start max-w-full">
                <div className="relative leading-[1.5rem] z-[1]">{`If you’re attending, visit us at Grand Hyatt Mumbai `}</div>
                <div className="relative leading-[1.5rem]">{`from November 8–10—we’d love to `}</div>
                <div className="relative text-[0.9rem] leading-[1.5rem] font-medium text-mediumblue">
                  https://t.co/q0SsWWxBvk
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0.187rem] text-[0.569rem] text-black">
                <div className="w-[2.188rem] flex flex-row items-start justify-start gap-[0.937rem]">
                  <div className="flex-1 relative leading-[1.125rem]"></div>
                  <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[16.312rem] text-[0.763rem] text-black">
              <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                
              </div>
              <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.562rem] pr-[0rem] text-[0.569rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.218rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] text-[0.85rem] text-gray-500 mq450:flex-wrap">
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
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.813rem] shrink-0">
                        1 day ago
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
            <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.281rem] box-border max-w-full">
              <div className="flex flex-row items-start justify-start gap-[0.112rem]">
                <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[5]">
                  
                </div>
                <div className="relative leading-[1.5rem] shrink-0 z-[5]">
                  Meet Joby, a 39-year-old truck driver from #Kerala.
                </div>
              </div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[4]">{`With no history of smoking or family #cancer, his `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`persistent cough seemed minor, until @WristFracture_ai’s `}</div>
              <div className="relative leading-[1.5rem] z-[2]">{`#qXR flagged a suspicious nodule on his Wrist X-ray. `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`This finding led to a life-changing diagnosis: Stage 4 `}</div>
              <div className="relative leading-[1.5rem] inline-block min-w-[5.875rem]">
                #lungcancer.
              </div>
            </div>
            <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] mq450:flex-wrap">
              <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                <div className="flex flex-row items-start justify-start gap-[0.768rem]">
                  <div className="relative leading-[1.5rem]">In</div>
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-[0.625rem] px-[0.312rem] pb-[0.5rem] gap-[0.937rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start gap-[0.262rem] max-w-full text-[0.85rem] text-gray-500 mq450:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-[1.25rem] min-w-[15.313rem] max-w-full">
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
                            <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.813rem] shrink-0">
                              1 day ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start text-[0.944rem] text-gray-600">
                    <div className="relative leading-[1.5rem]">{`@WristFracture_ai sera de la fête à Bali pour la Conférence de `}</div>
                    <div className="relative leading-[1.5rem]">{`l'Union sur la Santé Pulmonaire, du 12 au 16 `}</div>
                    <div className="self-stretch relative leading-[1.5rem] z-[1]">{`novembre 2024 ! Prêts à partager et collaborer avec `}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] text-[0.763rem] text-black">
                  <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                    
                  </div>
                </div>
              </div>
              <div className="self-stretch relative leading-[1.5rem] z-[2]">{`tous les passionnés qui s’engagent dans la lutte contre `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`des maladies pulmonaires mondiales comme la `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[4]">
                <span>{`tuberculose, la tuberculose `}</span>
                <span className="text-[0.9rem] font-medium text-mediumblue">
                  https://t.co/5JjG6cBoui
                </span>
              </div>
            </div>
            <div className="mr-[-0.382rem] flex flex-row items-start justify-start gap-[0.937rem] text-[0.569rem] text-black">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.125rem] gap-[1.093rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
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
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                        2 days ago
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
            <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                <div className="self-stretch relative leading-[1.5rem] z-[4]">{`With @RSNA #RSNA2024 just over 4 weeks away, we `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`invite our peers, partners and prospects to connect `}</div>
                <div className="relative leading-[1.5rem] z-[2]">{`with us in advance to plan a meeting or demo. If you're `}</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.5rem]">
                <div className="relative leading-[1.5rem] z-[1]">{`keeping flexible, pop us on your 'drop-by' list for coffee `}</div>
                <div className="relative leading-[1.5rem] inline-block min-w-[6.813rem]">
                  on booth 4941.
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="relative leading-[1.5rem]">{`Activating #AI to power patient pathways for `}</div>
                <div className="relative text-[0.9rem] leading-[1.5rem] font-medium text-mediumblue">
                  https://t.co/I102F09chz
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.25rem] gap-[0.937rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.312rem] gap-[0.625rem] mq450:flex-wrap">
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
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                        2 days ago
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
            <div className="flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="relative leading-[1.5rem]">{`At #UnionConf2024, hear the remarkable story of how `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full">{`portable X-ray #technology equipped with #AI was `}</div>
              <div className="flex flex-col items-start justify-start max-w-full">
                <div className="relative leading-[1.5rem] z-[1]">{`carried to Mount Everest Base Camp and Kala Patthar `}</div>
                <div className="relative leading-[1.5rem] z-[2]">{`to raise awareness about healthcare access in remote `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`regions. Led by representatives from the @StopTB, `}</div>
              </div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[4]">
                <span>{`@MinXray_Inc, @WristFracture_ai, `}</span>
                <span className="text-[0.9rem] font-medium text-mediumblue">
                  https://t.co/80b8PtJZX0
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0.062rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.125rem] gap-[1.093rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
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
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                        2 days ago
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
            <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.5rem] box-border max-w-full">
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`Scientific discoveries and inventions have shaped the `}</div>
                <div className="self-stretch relative leading-[1.5rem] z-[2]">{`field of #respiratory medicine and #pulmonology. This `}</div>
                <div className="relative leading-[1.5rem] z-[1]">{`#LungCancerAwarenessMonth #LCAM2024 we reflect `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full">
                  on the past, present and future of #lunghealth.
                </div>
              </div>
              <div className="relative leading-[1.5rem] whitespace-nowrap">{`The developmental trajectory, from ancient times to the `}</div>
              <div className="relative leading-[1.5rem]">
                <span>{`#AI-driven present, `}</span>
                <span className="text-[0.9rem] font-medium text-mediumblue">
                  https://t.co/HN6E7p73Gy
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.25rem] gap-[1.093rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
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
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.188rem] shrink-0">
                        3 days ago
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
            <div className="flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.5rem] box-border max-w-full">
                <div className="relative leading-[1.5rem] z-[3]">{`At #UnionConf2024, many experts along with Andrew `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">{`Codlin will present findings from a feasibility pilot for `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`integrated #TB and #lungcancer screening in `}</div>
                <div className="relative leading-[1.5rem] inline-block min-w-[4.625rem]">
                  #Vietnam.
                </div>
              </div>
              <div className="flex flex-col items-start justify-start max-w-full">
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`The pilot, conducted from October 2022 to March `}</div>
                <div className="relative leading-[1.5rem]">{`2024, used #AI-powered Wrist X-rays (CXR) to detect `}</div>
              </div>
              <div className="relative leading-[1.5rem]">
                <span>{`potentially `}</span>
                <span className="text-[0.9rem] font-medium text-mediumblue">
                  https://t.co/AIRCD0BHPJ
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0.062rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.5rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <TweetCardThread
              daysAgo="3 days ago"
              scientificDiscoveriesAndInventio="Scientific discoveries and inventions have shaped"
              theFieldOfRespiratoryMedicine="the field of #respiratory medicine and #pulmonology. "
              thisLungCancerAwarenessMonth="This #LungCancerAwarenessMonth we reflect on the "
              pastPresentAndFutureOfLunghe="past, present and future of #lunghealth."
            />
            <div className="self-stretch flex flex-col items-start justify-start text-[0.944rem] text-gray-600">
              <div className="relative leading-[1.5rem] whitespace-nowrap z-[1]">{`The developmental trajectory, from ancient times to the `}</div>
              <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] mq450:flex-wrap">
                <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.593rem]">
                    <div className="relative leading-[1.5rem]">
                      #AI-driven present, is a
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
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-start pt-[0.625rem] px-[0.75rem] pb-[0.5rem] gap-[0.368rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <div className="flex flex-col items-start justify-start gap-[1.218rem] max-w-full">
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
                    <div className="w-[6.775rem] flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                      <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                        <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                          @WristFracture_ai
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                        <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                      </div>
                      <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                        <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.25rem] shrink-0">
                          4 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
                <div className="flex flex-row items-start justify-start gap-[0.112rem] max-w-full">
                  <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[5]">
                    
                  </div>
                  <div className="relative leading-[1.5rem] shrink-0 z-[5]">
                    At #UnionConf2024, George Talama, EUNICE
                  </div>
                </div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[4]">{`NAHACHE, PETER MWAMLIMA, Davy Nkosi, Dr. `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`James Mpunga, Tisungane mwenyekulu, Dennis `}</div>
                <div className="relative leading-[1.5rem] z-[2]">{`Robert, MBBS, MMST., Joseph Njala, Hitler Sigauke, `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`Mackenzie Chivwara, Sam Phiri, and Joep J van `}</div>
                <div className="flex flex-row items-start justify-start gap-[0.206rem] max-w-full mq450:flex-wrap">
                  <div className="relative leading-[1.5rem] inline-block whitespace-nowrap max-w-full">
                    Oosterhout will present their experiences using
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[0.968rem]">
                    <div className="w-[1.519rem] flex flex-row items-start justify-start py-[0rem] pl-[0.25rem] pr-[0.187rem] box-border">
                      <div className="flex-1 relative leading-[1.5rem]"></div>
                    </div>
                    <div className="flex flex-row items-start justify-start gap-[0.937rem] text-[0.569rem] text-black">
                      <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                        
                      </div>
                      <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[11.812rem] text-[0.763rem] text-black">
              <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                
              </div>
              <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.562rem] pr-[0rem] text-[0.569rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.25rem] gap-[0.968rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.25rem] gap-[0.625rem] text-[0.85rem] text-gray-500 mq450:flex-wrap">
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
                  <div className="w-[6.775rem] flex flex-row items-start justify-start gap-[0.375rem] text-[0.594rem]">
                    <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[2.75rem]">
                        @WristFracture_ai
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
                      <div className="w-[0.25rem] h-[0.25rem] relative rounded-31xl bg-gray-900 mix-blend-normal" />
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-row items-start justify-start opacity-[0.8] mix-blend-normal">
                      <div className="relative leading-[0.75rem] font-medium inline-block min-w-[3.25rem] shrink-0">
                        4 days ago
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
            <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.531rem] box-border max-w-full">
              <div className="relative leading-[1.5rem] z-[2]">{`@WristFracture_ai’s #AI-powered #TB detection solution is now `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`included in the @StopTB Partnership’s Global Drug `}</div>
              <div className="relative leading-[1.5rem]">
                Facility (GDF) catalogue.
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-full">
              <div className="relative leading-[1.5rem] z-[2]">{`This empanelment strengthens our ability to support `}</div>
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`#healthcare workers and reinforce #health system `}</div>
              <div className="relative leading-[1.5rem]">{`resilience, advancing equitable access to `}</div>
              <div className="relative text-[0.9rem] leading-[1.5rem] font-medium text-mediumblue">
                https://t.co/x5GEWiRh6P
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0.062rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.125rem] mix-blend-normal max-w-full">
            <TweetCard
              DiagnosticsHubaiTextDecoration="none"
              frameDivWidth="6.775rem"
              divTbWtUsernameFlex="1"
              divTbWtTimeFlex="1"
              hoursAgo="4 days ago"
              hoursAgoMinWidth="3.25rem"
              aIinhealthcareIsntJustAbout="At #UnionConf2024, hear the remarkable story of"
            />
            <div className="relative leading-[1.5rem] whitespace-nowrap z-[4]">{`how portable X-ray #technology equipped with #AI was `}</div>
            <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`carried to Mount Everest Base Camp and Kala Patthar `}</div>
            <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">{`to raise awareness about #healthcare access in `}</div>
            <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`remote regions. Led by representatives from the `}</div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[1.475rem] mq450:flex-wrap">
              <div className="relative leading-[1.5rem] whitespace-nowrap">
                @StopTB, @MinXray_Inc, @WristFracture_ai,
              </div>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1.25rem]">
                <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center">
                  
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[2.468rem] px-[0rem] pb-[0rem] text-[0.569rem] text-black">
                <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.5rem] mix-blend-normal max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <TweetCardProfile
                exploreTheLatestInsightsFrom="Explore the latest insights from Dr @shibuvij, Chief"
                medicalOfficerAtDiagnosticsHubAiInAT="Medical Officer at @WristFracture_ai, in a thought-provoking "
              />
              <div className="relative leading-[1.5rem] z-[2]">{`article titled ‘Breathing New Life into Lung Health: The `}</div>
              <div className="relative leading-[1.5rem] z-[1]">{`Role of Technology in Overcoming Chronic Respiratory `}</div>
              <div className="relative leading-[1.5rem] inline-block min-w-[4.563rem]">
                Diseases’.
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] max-w-full mq450:flex-wrap">
              <div className="relative leading-[1.5rem] inline-block whitespace-nowrap max-w-full">
                In this article, Dr. Vijayan discusses the urgent
              </div>
              <div className="flex flex-col items-start justify-start gap-[0.968rem]">
                <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center">
                  
                </div>
                <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.062rem] pr-[0rem] text-[0.569rem] text-black">
                  <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
            </div>
          </div>
          <TweetPost
            lungcancerRemainsOneOfTheMost="#Lungcancer remains one of the most challenging"
            globalhealthConcernsYetEarlyd="#globalhealth concerns. Yet #earlydetection holds the "
            keyToSavingLivesThis="key to saving lives. This "
            lungCancerAwarenessMonthWe="#LungCancerAwarenessMonth, we plan to reflect on "
            howFarMedicalimagingInnovation="how far #medicalimaging innovation has come with #AI "
            castingAWiderNetInProactive="casting a wider net in proactive patient"
          />
          <TweetPost
            lungcancerRemainsOneOfTheMost="#PediatricTB continues to present significant"
            globalhealthConcernsYetEarlyd="challenges, especially in low-resource settings, where "
            globalhealthConcernsYetDisplay="unset"
            keyToSavingLivesThis="infrastructure gaps and non-specific symptoms hinder "
            lungCancerAwarenessMonthWe="#earlydetection. In a recent webinar moderated by Dr. "
            howFarMedicalimagingInnovation="@shibuvij from @WristFracture_ai, global experts discussed "
            howFarMedicalimagingDisplay="inline-block"
            frameDivJustifyContent="space-between"
            frameDivGap="1.25rem"
            frameDivFlex="unset"
            tweetAlignSelf="unset"
            tweetGap="0.575rem"
            castingAWiderNetInProactive="the role of"
            castingAWiderDisplay="inline-block"
            castingAWiderMinWidth="4.688rem"
          />
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.187rem] mix-blend-normal max-w-full">
            <TweetCardProfile
              frameDivGap="0.025rem"
              frameDivMinWidth="unset"
              frameDivWidth="23.2rem"
              frameDivAlignSelf="unset"
              frameDivAlignSelf1="stretch"
              frameDivAlignSelf2="stretch"
              exploreTheLatestInsightsFrom="Lesotho is a kingdom defined by its mountains. So,"
              medicalOfficerAtDiagnosticsHubAiInAT="it is fitting that Lesotho is where a collaborative "
              medicalOfficerAtDisplay="inline-block"
            />
            <div className="relative leading-[1.5rem] whitespace-nowrap z-[3]">{`#healthcarerevolution for #health system strengthening `}</div>
            <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">{`is climbing new peaks. Partners In Health (@PIH), the `}</div>
            <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`Ministry of Health of Lesotho, and @WristFracture_ai are `}</div>
            <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] mq450:flex-wrap">
              <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                <div className="flex flex-row items-start justify-start gap-[0.443rem]">
                  <div className="relative leading-[1.5rem]">
                    working together to
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.5rem] mix-blend-normal max-w-full text-[0.9rem] text-mediumblue">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <TweetCardProfile
                frameDivGap="0.625rem"
                frameDivMinWidth="15.063rem"
                frameDivWidth="unset"
                frameDivAlignSelf="stretch"
                frameDivAlignSelf1="unset"
                frameDivAlignSelf2="unset"
                exploreTheLatestInsightsFrom="@WristFracture_ai is honored to join the Joseph Aluoch"
                medicalOfficerAtDiagnosticsHubAiInAT="Lung Health Conference 2024 - "
                medicalOfficerAtDisplay="unset"
              />
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">
                <span className="font-medium">https://t.co/Kec06eiZWm,</span>
                <span className="text-[0.944rem] text-gray-600">
                  {" "}
                  a pivotal event organized by
                </span>
              </div>
              <div className="relative text-[0.944rem] leading-[1.5rem] text-gray-600 inline-block max-w-full">
                the Respiratory Society of Kenya - @ReSoKenya.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
              <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">{`@RonikaSG will be presenting on Day 1, i.e today, `}</div>
              <div className="relative leading-[1.5rem] z-[1]">{`October 30th, from 10:30 am to 12:30 pm in `}</div>
              <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] mq450:flex-wrap">
                <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.725rem]">
                    <div className="relative leading-[1.5rem] inline-block min-w-[5.313rem]">
                      Symposium
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
          </div>
          <div className="self-stretch h-[25.438rem] bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.687rem] pr-[0.25rem] gap-[1.093rem] mix-blend-normal text-[0.85rem] text-gray-500">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.625rem] mq450:flex-wrap">
              <img
                className="h-[2.75rem] w-[2.75rem] relative rounded-31xl overflow-hidden shrink-0 object-cover mix-blend-normal"
                alt=""
                src="/div-tb-wt-author-profile@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-[0.406rem] px-[0rem] pb-[0rem]">
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
            <div className="self-stretch flex flex-col items-start justify-start text-[0.944rem] text-gray-600">
              <div className="self-stretch relative leading-[1.5rem] z-[6]">
                As we mark #WorldStrokeDay2024, it is critical to raise
                awareness about how alarming the #stroke burden is.
              </div>
              <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.5rem]">
                <div className="relative leading-[1.5rem] z-[5]">
                  Common stroke risk factors include:
                </div>
                <div className="relative leading-[1.5rem] z-[4]">
                  ➡ High blood pressure
                </div>
                <div className="relative leading-[1.5rem] inline-block min-w-[5.125rem] z-[3]">
                  ➡ Smoking
                </div>
                <a className="[text-decoration:none] relative leading-[1.5rem] text-[inherit] inline-block min-w-[5.25rem] z-[2]">
                  ➡ Diabetes
                </a>
                <div className="relative leading-[1.5rem] z-[1]">
                  ➡ High cholesterol
                </div>
                <div className="relative leading-[1.5rem]">
                  ➡ Physical inactivity
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="relative leading-[1.5rem]">{`At @WristFracture_ai, we’re committed to making a `}</div>
                <div className="relative text-[0.9rem] leading-[1.5rem] font-medium text-mediumblue">
                  https://t.co/j89sklq1LH
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-[0rem] px-[0.062rem] text-[0.569rem] text-black">
              <div className="flex flex-row items-start justify-start gap-[0.937rem]">
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
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] gap-[1.218rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
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
            <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem] max-w-full text-[0.944rem] text-gray-600">
              <div className="flex flex-col items-start justify-start max-w-full">
                <div className="flex flex-row items-start justify-start gap-[0.112rem]">
                  <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center shrink-0 z-[3]">
                    
                  </div>
                  <div className="relative leading-[1.5rem] shrink-0 z-[3]">
                    #Lungcancer is on the rise in US Asian women that
                  </div>
                </div>
                <div className="relative leading-[1.5rem] z-[2]">{`don't smoke. This cohort 'non-smoker' does not have `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`access to pre-emptive screening. Could AI-powered `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full">
                  incidental #lungnoduledetection be the answer?
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`Serendipitous screening, opportunistic detection or `}</div>
                <div className="self-stretch flex flex-row items-end justify-between gap-[1.25rem] mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem]">
                    <div className="flex flex-row items-start justify-start gap-[0.4rem]">
                      <div className="relative leading-[1.5rem]">
                        incidental identification,
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
            </div>
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[0.625rem] pb-[0.5rem] pl-[0.75rem] pr-[0.312rem] mix-blend-normal max-w-full">
            <TweetCardThread
              frameDivGap="0.325rem"
              frameDivMinWidth="15.25rem"
              frameDivWidth="unset"
              frameDivAlignSelf="stretch"
              daysAgo="1 week ago"
              daysAgoMinWidth="3.25rem"
              frameDivAlignSelf1="unset"
              scientificDiscoveriesAndInventio="At #UnionConf2024, Chidimma Okoye,"
              theFieldOfRespiratoryMedicine="@JIlozumba, Obioma Akaniro MD FAPH, Emperor "
              theFieldOfDisplay="inline-block"
              thisLungCancerAwarenessMonth="Ubochioma, @Jacob_Creswell, @ossyugwu, etc, will "
              pastPresentAndFutureOfLunghe="present their abstract on the role of #AI-enabled "
              pastPresentAndDisplay="inline-block"
            />
            <div className="relative leading-[1.5rem] z-[1]">{`mobile X-ray screening in delivering integrated care for `}</div>
            <div className="self-stretch flex flex-row items-end justify-start gap-[0.675rem] text-[0.569rem] text-black mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem] text-[0.944rem] text-gray-600">
                <div className="relative leading-[1.5rem] whitespace-nowrap">
                  #TB, cardiovascular diseases (CVDs), and
                </div>
              </div>
              <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[2.093rem] text-[0.944rem] text-gray-600">
                <div className="w-[1.063rem] relative leading-[1.5rem] flex items-center">
                  
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.187rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.187rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
              <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                
              </div>
            </div>
          </div>
          <div className="self-stretch bg-gray-100 border-gray-1000 border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-start pt-[0.625rem] px-[0.75rem] pb-[0.5rem] gap-[0.012rem] mix-blend-normal max-w-full text-[0.85rem] text-gray-500">
            <div className="flex flex-col items-start justify-start gap-[0.937rem] max-w-full">
              <div className="w-[23.2rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.312rem] box-border gap-[0.625rem] max-w-full mq450:flex-wrap">
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
              <div className="flex flex-col items-start justify-start max-w-full text-[0.944rem] text-gray-600">
                <div className="relative leading-[1.5rem] inline-block max-w-full">{`Discover how #qTrack from @WristFracture_ai is making a `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full">{`difference in #TBdiagnosis and treatment at Jiwan `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[1]">{`Jyoti Christian Hospital, Robertsganj. In a powerful `}</div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[2]">
                  testimonial, Dr @dawnkuruvilla04 shares how #AI-
                </div>
                <div className="relative leading-[1.5rem] inline-block max-w-full z-[3]">{`powered solutions have transformed patient care by `}</div>
                <div className="relative leading-[1.5rem] z-[4]">
                  <span>{`helping doctors identify and `}</span>
                  <span className="text-[0.9rem] font-medium text-mediumblue">
                    https://t.co/T9yQD2hD69
                  </span>
                </div>
              </div>
              <div className="w-[23.813rem] flex flex-row items-start justify-end py-[0rem] px-[0.375rem] box-border max-w-full text-[0.569rem] text-black">
                <div className="flex flex-row items-start justify-start gap-[0.937rem]">
                  <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                    
                  </div>
                  <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[11.812rem] text-[0.763rem] text-black">
              <div className="relative leading-[1.5rem] inline-block min-w-[0.875rem]">
                
              </div>
              <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.562rem] pr-[0rem] text-[0.569rem]">
                <div className="relative leading-[1.125rem] inline-block min-w-[0.688rem]">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.437rem] box-border mix-blend-normal min-w-[34.625rem] max-w-full mq750:min-w-full">
        <div className="flex-1 overflow-hidden flex flex-row items-start justify-start relative mix-blend-normal max-w-full">
          <img
            className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-obtain mix-blend-normal"
            alt=""
            src="/image-textsm-8@2x.png"
          />
          <div className="flex-1 overflow-hidden flex flex-row items-start justify-start pt-[24.425rem] px-[2.5rem] pb-[2.056rem] box-border mix-blend-normal max-w-full z-[1] mq750:pt-[15.875rem] mq750:pb-[1.313rem] mq750:box-border">
            <Button
              className="h-[3.625rem] w-[12.419rem] mix-blend-normal z-[2]"
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                borderColor: "#fff",
                borderRadius: "9999px",
                "&:hover": { borderColor: "#fff" },
                width: 198.7,
                height: 58,
              }}
            >
              Read The Full Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterFeed;
