import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Heart } from "lucide-react";
import { Button } from "@mui/material";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Fracture Detection", href: "/products" },
      { name: "Metal Detection", href: "/products" },
      { name: "How It Works", href: "/products" },
      { name: "Start Analyzing", href: "/start" },
    ],
    resources: [
      { name: "Impact", href: "/impact" },
      { name: "Evidence", href: "/evidence" },
      { name: "Research", href: "/evidence" },
    ],
    company: [
      { name: "About Us", href: "/impact" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer
      className={`w-full bg-[#0a1628] border-t border-slate-800 ${className}`}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                Wrist Fracture and Metal Detection System
              </span>
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              AI-powered wrist X-ray analysis for accurate fracture detection and metal implant identification. 
              Helping healthcare providers make faster, more confident diagnoses.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/muhammad-rayyan-s-16ba86276"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@wristfracture.ai"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-1">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Button
                    onClick={() => navigate(link.href)}
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.875rem",
                      textTransform: "none",
                      padding: "4px 0",
                      minWidth: "auto",
                      justifyContent: "flex-start",
                      "&:hover": {
                        color: "#2dd4bf",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-1">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Button
                    onClick={() => navigate(link.href)}
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.875rem",
                      textTransform: "none",
                      padding: "4px 0",
                      minWidth: "auto",
                      justifyContent: "flex-start",
                      "&:hover": {
                        color: "#2dd4bf",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Button
                    onClick={() => navigate(link.href)}
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.875rem",
                      textTransform: "none",
                      padding: "4px 0",
                      minWidth: "auto",
                      justifyContent: "flex-start",
                      "&:hover": {
                        color: "#2dd4bf",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <span>© {currentYear} Wrist Fracture and Metal Detection System.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Final Year Project - Hamdard University</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>for better healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
