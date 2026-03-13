import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Globe, Mail } from "lucide-react"; // Optional: Icons for a pro look

const Footer = () => {
  return (
    <footer className="bg-[#F3F4F6] text-[#1F2937] py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Column 1: Brand/About */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-[#059669]">Job<span className="text-[#84CC16]">Portal</span></h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Connecting talented professionals with their dream careers through a seamless job search experience.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">Company</h3>
            <div className="flex gap-6 text-sm">
              <Link to="/PrivacyPolicy" className="hover:text-[#10B981] transition-colors">Privacy Policy</Link>
              <Link to="/TermsofService" className="hover:text-[#10B981] transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Column 3: Social/Credits */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex gap-4">
              <a href="https://github.com/nawalkumar" className="p-2 bg-white rounded-full shadow-sm hover:text-[#84CC16] transition-all"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/naval-kumar-70b48a2a6/" className="p-2 bg-white rounded-full shadow-sm hover:text-[#10B981] transition-all"><Linkedin size={18} /></a>
              <a
                href="mailto:nawalkumar4810167@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-sm hover:text-[#059669] transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-400 italic">
              Developed by <span className="text-[#059669] font-semibold">Naval Kumar</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-[#059669]">
            <div className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></div>
            System Status: Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;