import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Shield, Hospital, ArrowRight } from "lucide-react";
import { Button } from "@mui/material";

type UserRole = "client" | "admin" | "hospital";

interface RoleCardProps {
  role: UserRole;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  onClick: () => void;
  delay: number;
}

const SelectRole: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: UserRole) => {
    localStorage.setItem("selectedRole", role);
    navigate("/signin");
  };

  const roles: Omit<RoleCardProps, 'onClick' | 'delay'>[] = [
    {
      role: "client",
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Client",
      description: "Access learning resources and educational tools for medical imaging",
      features: ["Upload & analyze images", "View detailed reports", "Educational resources"]
    },
    {
      role: "admin",
      icon: <Shield className="w-8 h-8" />,
      title: "Admin",
      description: "Manage platform settings and monitor user activities",
      features: ["User management", "Analytics dashboard", "System configuration"]
    },
    {
      role: "hospital",
      icon: <Hospital className="w-8 h-8" />,
      title: "Hospital Staff",
      description: "Professional tools for clinical diagnosis and patient care",
      features: ["Clinical analysis", "Patient records", "Priority support"]
    }
  ];

  return (
    <div className="min-h-screen gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-teal-500/20 px-4 py-2 rounded-full mb-4"
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-teal-300 text-sm font-medium">Welcome to Wrist Fracture and Metal Detection System</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Role
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Choose how you'd like to use our AI-powered medical imaging platform
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full">
            {roles.map((role, index) => (
              <RoleCard
                key={role.role}
                {...role}
                onClick={() => handleRoleSelection(role.role)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-slate-400">
            Already have an account?{' '}
            <Button
              onClick={() => navigate("/signin")}
              variant="contained"
              color="primary"
              size="small"
              className="text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-medium transition-colors underline-offset-2 hover:underline"
            >
              Sign In
            </Button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  title,
  description,
  features,
  onClick,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative h-full">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
        
        {/* Card */}
        <div className="relative h-full bg-[#0f1f35]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 group-hover:bg-[#0f1f35]">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/30 to-cyan-500/30 flex items-center justify-center text-teal-300 mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          {/* Content */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-slate-400 mb-6 flex-grow">{description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/25 border border-white/10 group-hover:border-transparent">
            <span>Continue as {title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectRole;
