import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type HeroSectionType = {
  className?: string;
};

const HeroSection: FunctionComponent<HeroSectionType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const handleDemo = () => navigate("/contact");

  const handleAnalyze = () => {
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

  // Animation variants for fading in from below
  const fadeInFromBelow = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div
      className={`relative overflow-hidden self-stretch bg-gradient-to-br from-[#0a1628] via-[#0d2036] to-[#0a1628] flex flex-col lg:flex-row items-center justify-center lg:justify-start py-[7vw] lg:py-[3vw] px-4 sm:px-8 md:px-12 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] box-border mix-blend-normal shrink-0 gap-8 lg:gap-12 max-w-full min-h-[60vh] lg:min-h-[68vh] text-left text-[clamp(1.75rem,3.6vw,3.5rem)] text-white font-dm-sans ${className}`}
    >
      {/* Decorative background glows (match site theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[20rem] h-[20rem] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center lg:items-start justify-center px-0 box-border w-full lg:w-1/2 min-w-0">
        <motion.div
          className="self-stretch flex flex-col items-center lg:items-start justify-start gap-6 sm:gap-8 max-w-full"
          {...fadeInFromBelow}
        >
          <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-medium text-teal-300 bg-teal-400/10 rounded-full border border-teal-400/20">
            AI-Powered Wrist X-Ray Analysis
          </span>
          <div className="w-full max-w-full flex flex-col items-center lg:items-start justify-start break-words">
            <motion.h2
              className="m-0 leading-[1.1] font-semibold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left"
              {...fadeInFromBelow}
              transition={{ ...fadeInFromBelow.transition, delay: 0.2 }}
            >
              World's Most Adopted
            </motion.h2>
            <motion.h1
              className="m-0 mt-2 leading-[1.05] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 text-5xl sm:text-6xl lg:text-7xl lg:whitespace-nowrap text-center lg:text-left"
              {...fadeInFromBelow}
              transition={{ ...fadeInFromBelow.transition, delay: 0.5 }}
            >
              Healthcare AI
            </motion.h1>
          </div>

          <motion.p
            className="m-0 max-w-[30rem] text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed text-center lg:text-left"
            {...fadeInFromBelow}
            transition={{ ...fadeInFromBelow.transition, delay: 0.8 }}
          >
            Detect wrist fractures and metal implants from X-ray images in
            seconds — with confidence scores and a readable report, built to
            support radiologists and hospitals.
          </motion.p>

          <div className="self-stretch flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <Button
              onClick={handleAnalyze}
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: { xs: 14, sm: 16 },
                background: "linear-gradient(to right, #14b8a6, #06b6d4)",
                borderRadius: "9999px",
                "&:hover": { background: "linear-gradient(to right, #0d9488, #0891b2)" },
                padding: { xs: "12px 24px", sm: "16px 32px" },
                minWidth: { xs: "180px", sm: "200px" },
                height: { xs: 52, sm: 60 },
              }}
            >
              Analyze an X-Ray
            </Button>
            <Button
              onClick={handleDemo}
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: { xs: 14, sm: 16 },
                borderColor: "rgba(255,255,255,0.3)",
                borderRadius: "9999px",
                "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.06)" },
                padding: { xs: "12px 24px", sm: "16px 32px" },
                minWidth: { xs: "180px", sm: "200px" },
                height: { xs: 52, sm: 60 },
              }}
            >
              Set up a Private Demo
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full lg:w-1/2 flex items-center justify-center isolate"
        {...fadeInFromBelow}
        transition={{ ...fadeInFromBelow.transition, delay: 1 }}
      >
        <video
          className="w-full h-auto max-w-full max-h-[68vh] object-contain mix-blend-lighten [mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,#000_55%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,#000_55%,transparent_100%)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Video@2compressed.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};

export default HeroSection;
