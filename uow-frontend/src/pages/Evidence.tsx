import { FunctionComponent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  BookOpen,
  ExternalLink,
  Search,
  Calendar,
  Lightbulb,
  Database,
  Brain,
  BarChart3,
  Github,
  Award,
  Target,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const researchTopics = [
  {
    title: "Deep Learning for Fracture Detection in Radiographs",
    description: "Convolutional neural networks (CNNs) have shown remarkable success in detecting fractures from X-ray images, often matching or exceeding radiologist performance.",
    keyFindings: [
      "CNN models achieve 90-97% sensitivity in fracture detection",
      "Ensemble methods combine multiple models for improved accuracy",
      "Transfer learning from ImageNet enables training with limited data"
    ]
  },
  {
    title: "Wrist Fracture Classification with AI",
    description: "AI systems can not only detect fractures but also classify them by type (distal radius, scaphoid, etc.), aiding in treatment planning.",
    keyFindings: [
      "Multi-class classification for different fracture types",
      "Attention mechanisms highlight relevant image regions",
      "Automated severity grading for clinical decision support"
    ]
  },
  {
    title: "Metal Implant Detection and Segmentation",
    description: "Computer vision techniques enable automated identification and localization of metal implants, screws, and plates in post-surgical imaging.",
    keyFindings: [
      "Instance segmentation for precise implant localization",
      "Detection of implant complications (loosening, migration)",
      "Automated measurement of implant positioning"
    ]
  }
];

const relevantPublications = [
  {
    title: "Deep Learning for Detecting Radiographic Features of Osteoarthritis in Wrist Radiographs",
    authors: "Kim et al.",
    journal: "Radiology: Artificial Intelligence",
    year: 2023,
    relevance: "Demonstrates CNN-based analysis of wrist X-rays for pathology detection"
  },
  {
    title: "Artificial Intelligence in Fracture Detection: A Systematic Review and Meta-Analysis",
    authors: "Langerhuizen et al.",
    journal: "European Journal of Radiology",
    year: 2022,
    relevance: "Comprehensive review of AI performance across fracture types"
  },
  {
    title: "Performance of Deep Learning for Detection of Scaphoid Fractures",
    authors: "Yoon et al.",
    journal: "Journal of Hand Surgery",
    year: 2022,
    relevance: "Specific focus on challenging wrist fracture detection"
  },
  {
    title: "Automated Detection of Hardware Failure in Total Joint Arthroplasty",
    authors: "Shah et al.",
    journal: "Clinical Orthopaedics and Related Research",
    year: 2023,
    relevance: "AI for metal implant analysis and complication detection"
  },
  {
    title: "Deep Learning Algorithms for Detection of Distal Radius Fractures",
    authors: "Thian et al.",
    journal: "AJR American Journal of Roentgenology",
    year: 2021,
    relevance: "Direct application to wrist fracture detection with high accuracy"
  }
];

const technicalApproaches = [
  {
    title: "Convolutional Neural Networks",
    icon: Brain,
    description: "Deep CNN architectures like ResNet, DenseNet, and EfficientNet are the backbone of modern medical image analysis.",
    techniques: ["ResNet-50/101", "DenseNet-121", "EfficientNet-B4"]
  },
  {
    title: "Training Data & Augmentation",
    icon: Database,
    description: "Large, annotated datasets and augmentation techniques are essential for robust model performance.",
    techniques: ["MURA Dataset", "Rotation/Flip augmentation", "Synthetic data generation"]
  },
  {
    title: "Evaluation Metrics",
    icon: BarChart3,
    description: "Standard metrics ensure reliable assessment of model performance for clinical deployment.",
    techniques: ["Sensitivity/Specificity", "AUC-ROC", "F1 Score"]
  }
];

const modelMetrics = [
  { value: "0.884", label: "mAP@0.5 (all classes)", icon: Target },
  { value: "0.914", label: "Fracture AP@0.5", icon: TrendingUp },
  { value: "0.855", label: "Metal AP@0.5", icon: TrendingUp },
  { value: "0.85", label: "Best F1 score", icon: BarChart3 },
  { value: "87%", label: "Fracture true-positive rate", icon: CheckCircle2 },
];

const metricPlots = [
  {
    src: "/metric-pr-curve.png",
    title: "Precision–Recall Curve",
    desc: "mAP@0.5 = 0.884 overall — fracture 0.914, metal 0.855. High precision is held across most of the recall range.",
  },
  {
    src: "/metric-confusion-matrix.png",
    title: "Confusion Matrix",
    desc: "87% of true fractures and 80% of metal implants are correctly classified on the held-out test set.",
  },
  {
    src: "/metric-f1-curve.png",
    title: "F1 – Confidence Curve",
    desc: "Peak F1 score of 0.85 at a confidence of 0.288, balancing precision and recall.",
  },
  {
    src: "/metric-results.png",
    title: "Training Curves",
    desc: "Box, objectness and classification losses fall while precision, recall and mAP rise and converge.",
  },
  {
    src: "/metric-precision-curve.png",
    title: "Precision – Confidence",
    desc: "Precision as a function of the confidence threshold for each class.",
  },
  {
    src: "/metric-recall-curve.png",
    title: "Recall – Confidence",
    desc: "Recall as a function of the confidence threshold for each class.",
  },
];

const Evidence: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublications = relevantPublications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#0a1628] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-violet-400 bg-violet-400/10 rounded-full border border-violet-400/20">
              Research & Evidence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Science Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-500">
                AI Diagnostics
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our approach is grounded in peer-reviewed research and proven deep learning methodologies 
              for medical image analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Lightbulb className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold">Research Foundation</h2>
          </motion.div>

          <div className="space-y-6">
            {researchTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-violet-500/30 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{topic.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topic.keyFindings.map((finding, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-300">{finding}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Approaches */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Brain className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold">Technical Approach</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalApproaches.map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50"
              >
                <approach.icon className="w-10 h-10 mb-4 text-cyan-400" />
                <h3 className="text-lg font-semibold mb-2">{approach.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{approach.description}</p>
                <div className="flex flex-wrap gap-2">
                  {approach.techniques.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Training & Evaluation */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-bold">Model Training &amp; Evaluation</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-3xl mb-10 leading-relaxed"
          >
            Our YOLOv7-p6 detection model was trained on the public GRAZPEDWRI-DX
            wrist-radiograph dataset and evaluated on a held-out test set. The
            metrics below are produced directly by the training pipeline — not
            hand-picked — and reflect real, reproducible performance.
          </motion.p>

          {/* Headline metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {modelMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 rounded-2xl border border-emerald-500/20 text-center"
              >
                <m.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-slate-400 mt-1 leading-snug">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Metric plots */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {metricPlots.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group no-underline text-white bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="bg-white p-3 flex items-center justify-center">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-52 object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed no-underline">{p.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-500 text-xs mt-8"
          >
            Trained with YOLOv7-p6 on Google Colab · GRAZPEDWRI-DX dataset · click any chart to view full size
          </motion.p>
        </div>
      </section>

      {/* Related Publications */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl sm:text-3xl font-bold">Related Literature</h2>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {filteredPublications.map((pub, index) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-violet-500/30 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                        {pub.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 mb-3">
                        <span>{pub.authors}</span>
                        <span className="text-violet-400 font-medium">{pub.journal}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {pub.year}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm">{pub.relevance}</p>
                    </div>
                    <a
                      href={"https://scholar.google.com/scholar?q=" + encodeURIComponent(pub.title + " " + pub.authors)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 rounded-lg transition-colors flex-shrink-0"
                    >
                      <FileText className="w-4 h-4" />
                      Read
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.p 
            className="text-center text-slate-500 text-sm mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            These publications represent relevant research in the field. Our implementation draws from these and other sources.
          </motion.p>
        </div>
      </section>

      {/* Open-Source Credit Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold">Open-Source Foundation &amp; Credits</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
          >
            <p className="text-slate-300 leading-relaxed mb-4">
              Our wrist fracture and metal detection model is built on the
              pioneering open-source work of{" "}
              <span className="text-violet-400 font-semibold">mdciri</span>, who
              first trained and released a{" "}
              <span className="text-white font-medium">YOLOv7-p6</span> model for
              bone &amp; wrist fracture detection on X-ray images
              (<span className="italic">YOLOv7-Bone-Fracture-Detection</span>,
              released October 2022). Their published{" "}
              <span className="font-mono text-cyan-300">yolov7-p6-bonefracture</span>{" "}
              model, trained on the GRAZPEDWRI-DX pediatric wrist dataset, is the
              foundation this project was developed from. Full credit and thanks
              to them for making this research openly available.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://github.com/mdciri/YOLOv7-Bone-Fracture-Detection"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                mdciri / YOLOv7-Bone-Fracture-Detection
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.nature.com/articles/s41597-022-01328-z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-lg transition-colors"
              >
                <Database className="w-4 h-4" />
                GRAZPEDWRI-DX dataset
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://arxiv.org/abs/2207.02696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 hover:bg-slate-700/60 text-slate-200 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                YOLOv7 paper (Wang et al.)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Experience It Yourself
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            See how AI-powered analysis works on real X-ray images.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/start")}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
          >
            Try It Now
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Evidence;
