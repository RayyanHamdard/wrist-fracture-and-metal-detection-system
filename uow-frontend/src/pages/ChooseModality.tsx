import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, MouseEvent } from "react";
import { FiArrowRight, FiActivity, FiShield, FiCpu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChooseModality: React.FC = () => {
  const navigate = useNavigate();

  const handleXRayClick = () => {
    navigate("/xray-upload");
  };

  return (
    <div className="min-h-screen gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Analysis
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Select the type of medical image you want to analyze with our AI-powered diagnostic tools
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <HoverCard onClick={handleXRayClick} />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl w-full"
        >
          <FeatureCard
            icon={<FiCpu className="w-6 h-6" />}
            title="AI Powered"
            description="Advanced YOLOv7 model for accurate detection"
          />
          <FeatureCard
            icon={<FiActivity className="w-6 h-6" />}
            title="Real-time Results"
            description="Get instant analysis of your medical images"
          />
          <FeatureCard
            icon={<FiShield className="w-6 h-6" />}
            title="Secure & Private"
            description="Your data is encrypted and never stored"
          />
        </motion.div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-[#0f1f35]/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6 text-center hover-lift">
    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

interface HoverCardProps {
  onClick: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient" />
      
      {/* Card */}
      <div className="relative bg-[#0f1f35]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden group">
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Icon/Image */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 p-1">
              <img
                src="xrayai.png"
                alt="X-Ray Analysis"
                className="w-full h-full object-cover rounded-xl"
                style={{ transform: "translateZ(50px)" }}
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
            >
              AI
            </motion.div>
          </div>

          {/* Text content */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              X-RAY ANALYSIS
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-6 max-w-md">
              Analyze X-ray images for AI-powered detection of fractures, bone anomalies, and other abnormalities
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300"
            >
              <span className="text-base sm:text-lg">Start Analysis</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-tr-full" />
      </div>
    </motion.div>
  );
};

export default ChooseModality;
