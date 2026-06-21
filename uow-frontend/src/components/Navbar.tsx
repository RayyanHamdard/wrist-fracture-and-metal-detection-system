import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleStartAnalyzing } from "./AuthComponents";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@mui/material";

export type NavbarType = {
  className?: string;
};

const Navbar: FunctionComponent<NavbarType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("selectedRole");
    setIsAuthenticated(false);
    const authChangeEvent = new Event('authChange');
    window.dispatchEvent(authChangeEvent);
    navigate("/");
    setShowUserMenu(false);
  };

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Impact", href: "/impact" },
    { name: "Evidence", href: "/evidence" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-[#0a1628] shadow-lg shadow-black/20' 
            : 'bg-[#0a1628]/95 backdrop-blur-sm'}
          ${className}
        `}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/")}
              className="flex items-center text-left shrink-0 mr-2 text-[0.7rem] leading-[1.12] sm:text-sm md:text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 max-w-[9.5rem] sm:max-w-[16rem] md:max-w-[22rem] lg:max-w-none"
            >
              Wrist Fracture and Metal Detection System
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors relative group bg-transparent border-none cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
            </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#0f1f35] rounded-xl shadow-xl shadow-black/30 border border-slate-700/50 overflow-hidden"
                      >
                        <button
                          onClick={() => { handleStartAnalyzing(navigate); setShowUserMenu(false); }}
                          className="w-full px-4 py-3 text-left text-slate-300 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
            </div>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/signin")}
                    variant="contained"
                    color="primary"
                    size="small"
                    className="text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-medium transition-colors underline-offset-2 hover:underline"
                  >
                    Sign In
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
              onClick={() => handleStartAnalyzing(navigate)}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all border border-teal-400/20"
            >
              Start Analyzing
                  </motion.button>
                </>
              )}
          </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
              </div>
            </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0a1628] border-t border-slate-700/50"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => { navigate(link.href); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-slate-700/50 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => { handleStartAnalyzing(navigate); setIsMobileMenuOpen(false); }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl"
                      >
                        Go to Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-red-400 font-medium flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { navigate("/signin"); setIsMobileMenuOpen(false); }}
                        className="w-full px-4 py-3 text-slate-300 font-medium border border-slate-600 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { handleStartAnalyzing(navigate); setIsMobileMenuOpen(false); }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl"
                      >
                        Start Analyzing
                      </button>
                    </>
                  )}
          </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
