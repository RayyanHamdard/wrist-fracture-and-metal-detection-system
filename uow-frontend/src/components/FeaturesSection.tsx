import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type FeaturesSectionType = {
  className?: string;
};

const FeaturesSection: FunctionComponent<FeaturesSectionType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("userRole");
      if (role === "admin") navigate("/admin");
      else if (role === "hospital") navigate("/hospital");
      else navigate("/start");
    } else {
      navigate("/select-role");
    }
  };

  return (
    <div
      className={`self-stretch bg-[#0a1628] flex flex-col items-start justify-start pt-12 sm:pt-16 lg:pt-24 px-4 sm:px-8 lg:px-16 pb-10 sm:pb-16 lg:pb-20 box-border gap-6 sm:gap-8 lg:gap-12 mix-blend-normal shrink-0 max-w-full text-left text-xl sm:text-2xl text-white font-dm-sans ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-center py-0">
        <h3 className="m-0 relative text-lg sm:text-xl lg:text-2xl leading-relaxed font-bold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0),_rgba(0,_0,_0,_0)),_linear-gradient(90deg,_#01dcbe,_#98aed9)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center">
          AI-Powered Medical Imaging for Better Diagnoses
        </h3>
      </div>
      <div className="self-stretch flex flex-col lg:flex-row items-stretch justify-start gap-4 max-w-full text-xl sm:text-2xl lg:text-4xl">
        {/* Main large card */}
        <div className="w-full lg:flex-1 rounded-xl overflow-hidden">
          <div className="w-full h-full [background:linear-gradient(90deg,_#0f2332,_#98aed9)] flex flex-col items-start justify-start mix-blend-normal">
            <div className="w-full overflow-hidden flex flex-col items-start justify-start p-4 sm:p-6 lg:p-8 box-border relative gap-8 sm:gap-16 lg:gap-48 mix-blend-normal min-h-[20rem] sm:min-h-[28rem] lg:min-h-[40rem]">
              <img
                className="w-full h-full absolute !m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover mix-blend-normal"
                alt=""
                src="/image-textsm-1@2x.png"
              />
              <div className="w-full max-w-md flex flex-col items-start justify-start gap-4 relative z-10">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <h1 className="m-0 self-stretch relative text-xl sm:text-2xl lg:text-4xl leading-tight lg:leading-10 font-normal font-[inherit] z-[1]">
                    Advanced X-Ray Analysis with YOLOv7 Deep Learning Technology
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start text-sm sm:text-base">
                  <p className="relative leading-relaxed z-[1] m-0">
                    Our state-of-the-art AI model detects bone fractures and metal implants in X-ray images, achieving a mean average precision (mAP@0.5) of 0.88 — with 0.91 AP on fractures. Get instant analysis results with confidence scores and detailed detection reports for faster clinical decision-making.
                  </p>
                </div>
              </div>
              <Button
                className="mix-blend-normal z-[1] relative"
                disableElevation
                variant="outlined"
                onClick={handleGetStarted}
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: { xs: 14, sm: 16 },
                  borderColor: "#fff",
                  borderRadius: "9999px",
                  "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
                  padding: { xs: "10px 20px", sm: "14px 28px" },
                }}
              >
                Start Analyzing
              </Button>
            </div>
          </div>
        </div>
        {/* Two smaller cards */}
        <div className="w-full lg:flex-1 flex flex-col md:flex-row gap-4 text-lg sm:text-xl lg:text-3xl">
          {/* Hospital Management card */}
          <div className="w-full md:flex-1 h-[20rem] sm:h-[24rem] md:h-auto md:min-h-[20rem] lg:min-h-[40.625rem] rounded-xl overflow-hidden">
            <div className="h-full w-full bg-teal flex flex-row items-start justify-start mix-blend-normal">
              <div className="h-full w-full overflow-hidden flex flex-row items-start justify-start relative mix-blend-normal">
                <img
                  className="h-full w-full absolute !m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="/image-textsm-2@2x.png"
                />
                <div className="w-full h-full overflow-hidden flex flex-col items-start justify-start p-4 sm:p-6 lg:p-8 mix-blend-normal z-[1]">
                  <h2 className="m-0 relative text-lg sm:text-xl lg:text-3xl leading-tight lg:leading-9 font-normal font-[inherit] z-[2]">
                    Seamless Hospital & Client Management System
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* Role-Based Access card */}
          <div className="w-full md:flex-1 h-[20rem] sm:h-[24rem] md:h-auto md:min-h-[20rem] lg:min-h-[40.625rem] rounded-xl overflow-hidden">
            <div className="h-full w-full bg-teal flex flex-row items-end justify-start box-border mix-blend-normal">
              <div className="h-full w-full overflow-hidden flex flex-row items-start justify-start relative mix-blend-normal">
                <img
                  className="h-full w-full absolute !m-0 top-0 right-0 bottom-0 left-0 max-w-full overflow-hidden max-h-full object-cover mix-blend-normal"
                  alt=""
                  src="/image-textsm-3@2x.png"
                />
                <div className="w-full h-full overflow-hidden flex flex-col items-start justify-start p-4 sm:p-6 lg:p-8 mix-blend-normal z-[1]">
                  <h2 className="m-0 relative text-lg sm:text-xl lg:text-3xl leading-tight lg:leading-9 font-normal font-[inherit] z-[2]">
                    Secure Role-Based Access for Clients, Hospitals & Admins
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
