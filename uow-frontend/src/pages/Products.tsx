import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Bone, 
  Zap, 
  Target,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Eye,
  FileCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const coreFeatures = [
  {
    icon: Bone,
    title: "Fracture Detection",
    description: "Advanced AI algorithms trained on thousands of wrist X-rays to accurately identify fractures, including subtle hairline fractures that may be missed by the human eye.",
    features: [
      "Detects multiple fracture types",
      "Identifies hairline fractures",
      "Highlights fracture locations",
      "Confidence scoring"
    ],
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Metal Detection",
    description: "Automatically identifies and localizes metal implants, screws, plates, and foreign objects in wrist radiographs for post-surgical assessment and follow-up care.",
    features: [
      "Implant identification",
      "Screw & plate detection",
      "Foreign object localization",
      "Post-surgery monitoring"
    ],
    color: "from-violet-500 to-purple-500"
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Rapid Analysis",
    description: "Get results in seconds, not hours. Our AI processes X-ray images instantly, enabling faster clinical decisions."
  },
  {
    icon: Eye,
    title: "Enhanced Accuracy",
    description: "AI-assisted detection reduces missed diagnoses and helps radiologists catch subtle abnormalities."
  },
  {
    icon: Cpu,
    title: "Deep Learning Powered",
    description: "Built on state-of-the-art convolutional neural networks trained on diverse, annotated datasets."
  },
  {
    icon: Shield,
    title: "Clinical Support Tool",
    description: "Designed to assist healthcare professionals, not replace them. Always review AI findings clinically."
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Upload X-Ray",
    description: "Simply upload a wrist X-ray image in standard formats (DICOM, PNG, JPG)."
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our deep learning model analyzes the image for fractures and metal objects."
  },
  {
    step: "03",
    title: "View Results",
    description: "Receive detailed findings with highlighted regions and confidence scores."
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Products: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0a1628] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-teal-400 bg-teal-400/10 rounded-full border border-teal-400/20">
              AI-Powered Diagnostics
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Wrist X-Ray Analysis with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-violet-500">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Accurate fracture detection and metal implant identification powered by deep learning. 
              Helping healthcare professionals make faster, more confident diagnoses.
            </p>
          </motion.div>

          {/* Core Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="h-full p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Simple, fast, and effective. Get AI-powered insights in three easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-slate-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Use AI for X-Ray Analysis?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Enhance your diagnostic workflow with AI-powered assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-all"
              >
                <benefit.icon className="w-10 h-10 mb-4 text-teal-400" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-700/50">
            <FileCheck className="w-16 h-16 mx-auto mb-6 text-teal-400" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Try It?
            </h2>
            <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
              Upload a wrist X-ray and experience AI-powered fracture and metal detection in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/start")}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/evidence")}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                View Research
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
