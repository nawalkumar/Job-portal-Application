import React from "react";
import Navbar from "./Navbar"; // Assuming you want the navbar here
import { ShieldCheck, Lock, Eye, FileText, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShieldCheck className="text-emerald-600 w-6 h-6" />
            </div>
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Legal Documentation</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-8 space-y-12">

            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">1.</span> Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to our Job Portal. We value your privacy and are committed to protecting your personal data.
                This Privacy Policy outlines how we collect, use, and safeguard your information when you utilize our platform
                to advance your career or find talent.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="bg-gray-50 -mx-8 p-8 border-y border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">2.</span> Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Personal Information
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Full Name</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Professional Email Address</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Contact Number</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Resume/CV and Portfolio Data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Usage Data
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> IP Address & Browser Type</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Search Preferences</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Page Interaction Time</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Usage */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">3.</span> How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">We process your data to provide a seamless recruitment experience, including:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Maintaining your user profile",
                  "Notifying you of relevant job matches",
                  "Facilitating the application process",
                  "Providing dedicated customer support",
                  "Improving platform algorithms",
                  "Preventing fraudulent activities"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Security */}
            <section className="bg-emerald-900 rounded-2xl p-8 text-emerald-50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" /> Data Security
              </h2>
              <p className="leading-relaxed opacity-90">
                We implement industry-standard AES-256 encryption and secure socket layer (SSL) technology.
                Your personal information is contained behind secured networks and is only accessible by a limited
                number of persons who have special access rights to such systems.
              </p>
            </section>

            {/* 5. Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4.</span> Information Sharing
              </h2>
              <p className="text-gray-600">
                We do not sell, trade, or otherwise transfer your Personal Information to outside parties
                except for trusted third parties who assist us in operating our website, so long as those parties
                agree to keep this information confidential.
              </p>
            </section>

            {/* 6. Contact */}
            <section className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions?</h2>
                <p className="text-gray-600">Our legal team is here to help you understand your rights.</p>
              </div>
              <a
                href="mailto:nawalkumar4810167@gmail.com"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-emerald-200"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </a>
            </section>

          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;