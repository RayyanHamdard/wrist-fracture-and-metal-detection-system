import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Globe2, Target, CheckCircle2, ArrowRight } from "lucide-react";

export type DivWFull1Type = {
  className?: string;
};

const ctaSx = {
  textTransform: "none" as const,
  color: "#fff",
  fontSize: { xs: 14, sm: 16 },
  background: "linear-gradient(to right, #14b8a6, #06b6d4)",
  borderRadius: "9999px",
  "&:hover": { background: "linear-gradient(to right, #0d9488, #0891b2)" },
  padding: { xs: "10px 22px", sm: "13px 28px" },
};

const DivWFull1: FunctionComponent<DivWFull1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: Globe2,
      eyebrow: "Global Impact",
      heading: "The Global Impact of AI",
      desc: "AI-assisted radiology is widening access to fast, consistent fracture screening — especially where radiologist time is scarce.",
      points: ["Faster triage decisions", "Consistent, repeatable screening", "Wider access to expertise"],
      cta: "Explore Our Impact",
      onClick: () => navigate("/impact"),
    },
    {
      icon: Target,
      eyebrow: "Clinical & Business Value",
      heading: "From Aims to Achievements",
      desc: "We turn detection accuracy into clinical value — streamlining wrist X-ray workflows for hospitals and clients with measurable outcomes.",
      points: ["Seamless workflow integration", "Role-based dashboards", "Audit-ready analysis reports"],
      cta: "Explore Our Client Services",
      onClick: () => navigate("/products"),
    },
  ];

  return (
    <section
      className={`self-stretch bg-[#0a1628] py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-16 box-border max-w-full font-dm-sans ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {cards.map((card) => (
          <div
            key={card.heading}
            className="relative overflow-hidden flex flex-col gap-5 p-7 sm:p-9 lg:p-10 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            {/* subtle decorative glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/20 flex items-center justify-center">
              <card.icon className="w-7 h-7 text-teal-300" />
            </div>

            <div className="relative z-10">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wide text-teal-300/80">
                {card.eyebrow}
              </span>
              <h3 className="m-0 mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {card.heading}
              </h3>
            </div>

            <p className="relative z-10 m-0 text-sm sm:text-base text-slate-400 leading-relaxed">
              {card.desc}
            </p>

            <ul className="relative z-10 m-0 p-0 list-none flex flex-col gap-2.5">
              {card.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* mt-auto keeps both buttons aligned at the bottom regardless of text length */}
            <div className="relative z-10 mt-auto pt-2">
              <Button
                onClick={card.onClick}
                disableElevation
                variant="contained"
                endIcon={<ArrowRight className="w-4 h-4" />}
                sx={ctaSx}
              >
                {card.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DivWFull1;
