import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";

export type DevelopmentsContentType = {
  className?: string;
};

const DevelopmentsContent: FunctionComponent<DevelopmentsContentType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const handleStartAnalyzing = () => {
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

  const cards = [
    {
      icon: Building2,
      tag: "Now Available",
      title: "Hospital Management System",
      desc: "Onboard hospitals, assign clients to staff, and keep every analysis organised in one place.",
      action: { label: "Get Started", onClick: () => navigate("/select-role") },
    },
    {
      icon: ShieldCheck,
      tag: "New Feature",
      title: "Role-Based Access Control",
      desc: "Separate dashboards and permissions for admins, hospital staff, and clients — with full analysis-history tracking.",
      action: { label: "Explore Roles", onClick: () => navigate("/select-role") },
    },
    {
      icon: BarChart3,
      tag: "Validated",
      title: "Proven Model Performance",
      desc: "0.88 mAP@0.5 overall (0.91 AP on fractures), evaluated on a held-out test set with full metric charts.",
      action: { label: "View Evidence", onClick: () => navigate("/evidence") },
    },
  ];

  const chips = [
    "Real-time analysis",
    "Multi-fracture detection",
    "Confidence scoring",
    "Detailed reports",
  ];

  return (
    <div
      className={`self-stretch flex flex-col gap-6 max-w-full text-white font-dm-sans ${className}`}
    >
      {/* Feature card — full width, balanced two-column */}
      <div className="rounded-3xl overflow-hidden border border-teal-500/20 bg-gradient-to-br from-teal-700/90 to-cyan-800/90 grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 self-start bg-white/15 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-teal-200 rounded-full animate-pulse" />
              <span className="text-teal-100 text-xs sm:text-sm font-medium">Latest Development</span>
            </span>
            <h3 className="m-0 text-xl sm:text-2xl lg:text-[1.9rem] leading-tight font-semibold">
              AI-Powered Bone Fracture Detection
            </h3>
            <p className="m-0 text-sm sm:text-base leading-relaxed text-teal-50/90">
              Our deep-learning model detects fractures and metal implants in
              X-ray images within seconds — achieving{" "}
              <span className="font-semibold text-white">0.88 mAP@0.5</span>{" "}
              (0.91 AP on fractures) and returning a readable report to help
              radiologists decide faster.
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 text-teal-50 border border-white/10"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Button
              disableElevation
              variant="contained"
              onClick={handleStartAnalyzing}
              sx={{
                textTransform: "none",
                color: "#0f172a",
                backgroundColor: "#5eead4",
                fontSize: { xs: 14, sm: 16 },
                borderRadius: "9999px",
                "&:hover": { backgroundColor: "#2dd4bf" },
                padding: { xs: "10px 22px", sm: "14px 30px" },
                fontWeight: 600,
              }}
            >
              Try It Now
            </Button>
          </div>
        </div>

        <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[26rem]">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            alt="AI X-ray analysis"
            src="/xrayai.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-teal-300 rounded-lg w-24 h-32 sm:w-32 sm:h-40 animate-pulse opacity-70" />
          </div>
        </div>
      </div>

      {/* Balanced three-card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-teal-500/15 flex items-center justify-center">
                <card.icon className="w-5 h-5 text-teal-300" />
              </div>
              <span className="text-[0.7rem] uppercase tracking-wide text-teal-300/80 font-medium">
                {card.tag}
              </span>
            </div>
            <h4 className="m-0 text-lg font-semibold text-white">{card.title}</h4>
            <p className="m-0 text-sm text-slate-400 leading-relaxed flex-1">
              {card.desc}
            </p>
            <button
              onClick={card.action.onClick}
              className="self-start inline-flex items-center gap-1.5 bg-transparent border-0 p-0 m-0 appearance-none cursor-pointer text-sm font-medium text-teal-300 hover:gap-2.5 hover:text-teal-200 transition-all"
            >
              {card.action.label}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentsContent;
