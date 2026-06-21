import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  TrendingUp, 
  Users,
  Shield,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Activity,
  Heart,
  Bone
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const medicalBenefits = [
  {
    icon: Clock,
    title: "Faster Diagnosis",
    stat: "90%",
    statLabel: "Faster than manual review",
    description: "AI analysis provides instant results, reducing the time patients wait for diagnosis from hours to seconds."
  },
  {
    icon: AlertTriangle,
    title: "Reduced Missed Fractures",
    stat: "15-26%",
    statLabel: "Fractures initially missed",
    description: "Studies show that 15-26% of fractures are missed on initial X-ray review. AI assistance helps catch these subtle injuries."
  },
  {
    icon: TrendingUp,
    title: "Improved Accuracy",
    stat: "95%+",
    statLabel: "Detection accuracy",
    description: "Deep learning models trained on large datasets achieve high sensitivity and specificity in fracture detection."
  },
  {
    icon: Users,
    title: "Radiologist Support",
    stat: "24/7",
    statLabel: "Available assistance",
    description: "Provides consistent, tireless assistance to radiologists, especially valuable during high-volume periods or overnight shifts."
  }
];

const clinicalImpacts = [
  {
    title: "Emergency Department Efficiency",
    description: "In emergency settings, rapid fracture detection is critical. AI-assisted triage can prioritize urgent cases and reduce ED wait times.",
    points: [
      "Faster patient throughput in busy EDs",
      "Priority flagging for severe fractures",
      "Reduced radiologist callback rates"
    ]
  },
  {
    title: "Orthopedic Treatment Planning",
    description: "Accurate identification of fracture patterns and metal implants aids in surgical planning and post-operative monitoring.",
    points: [
      "Better surgical planning with detailed analysis",
      "Track healing progress over time",
      "Monitor implant positioning"
    ]
  },
  {
    title: "Rural & Underserved Areas",
    description: "AI diagnostics can extend specialist-level analysis to facilities without on-site radiologists, improving healthcare access.",
    points: [
      "Specialist-level analysis anywhere",
      "Reduced need for patient transfers",
      "Support for telemedicine workflows"
    ]
  }
];

const problemStats = [
  {
    stat: "1.5M+",
    label: "Wrist fractures annually in the US alone",
    icon: Bone
  },
  {
    stat: "~20%",
    label: "Of fractures missed on first X-ray reading",
    icon: AlertTriangle
  },
  {
    stat: "$2.3B",
    label: "Annual cost of missed fracture litigation",
    icon: Shield
  }
];

const Impact: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0a1628] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-rose-400 bg-rose-400/10 rounded-full border border-rose-400/20">
              Clinical Impact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-orange-500">
                Orthopedic Diagnostics
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              AI-powered X-ray analysis addresses critical challenges in fracture diagnosis, 
              improving patient outcomes and supporting healthcare professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Challenge</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Wrist fractures are among the most common orthopedic injuries, yet accurate diagnosis remains challenging.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-rose-500/20 text-center"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-rose-400" />
                <div className="text-4xl font-bold text-rose-400 mb-2">{item.stat}</div>
                <p className="text-slate-400 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Benefits */}
      <section className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How AI Helps</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AI-assisted diagnosis provides measurable benefits across the healthcare workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {medicalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-bold text-teal-400">{benefit.stat}</span>
                      <span className="text-slate-500 text-sm">{benefit.statLabel}</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Applications */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Clinical Applications</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real-world impact across different healthcare settings.
            </p>
          </motion.div>

          <div className="space-y-8">
            {clinicalImpacts.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/50"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-white">{impact.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">{impact.description}</p>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <ul className="space-y-3">
                      {impact.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4 sm:px-8 lg:px-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-16 h-16 mx-auto mb-8 text-rose-400" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            "We believe AI should augment human expertise, not replace it. Our goal is to provide 
            healthcare professionals with tools that enhance their capabilities, reduce errors, 
            and ultimately improve patient care."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/products")}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all"
            >
              Explore Our Technology
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
