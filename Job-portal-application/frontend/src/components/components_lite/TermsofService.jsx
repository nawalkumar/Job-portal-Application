import React from "react";
import Navbar from "./Navbar";
import { Scale, CheckCircle, AlertTriangle, Copyright, Gavel, Mail } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Scale className="text-emerald-600 w-6 h-6" />
            </div>
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Legal Agreement</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
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
              <p className="text-gray-600 leading-relaxed font-medium">
                Welcome to our Job Portal. These Terms and Conditions govern your
                use of our website and services. By accessing our platform, you agree
                to be bound by these rules.
              </p>
            </section>

            {/* 2. Acceptance */}
            <section className="bg-emerald-50/50 -mx-8 p-8 border-y border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">2.</span> Acceptance of Terms
              </h2>
              <div className="flex gap-4 items-start">
                <CheckCircle className="text-emerald-600 w-6 h-6 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  By using our website, you confirm that you accept these Terms and
                  Conditions. If you do not agree with any part of these terms,
                  you must immediately cease all use of our platform.
                </p>
              </div>
            </section>

            {/* 3. User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">3.</span> User Responsibilities
              </h2>
              <p className="text-gray-600 mb-6">As a user of this portal, you agree to:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Provide accurate and truthful profile data",
                  "Use the platform for lawful purposes only",
                  "Maintain the confidentiality of your account",
                  "Respect the intellectual property of others"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4.</span> Intellectual Property
              </h2>
              <div className="p-5 border-l-4 border-emerald-500 bg-gray-50 rounded-r-xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
                  <Copyright className="w-4 h-4" />
                  <span>Ownership Notice</span>
                </div>
                <p className="text-gray-600 text-sm">
                  All content, trademarks, and branding on this website are owned by
                  or licensed to us. You may not reproduce, distribute, or create
                  derivative works without our express written permission.
                </p>
              </div>
            </section>

            {/* 5. Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">5.</span> Limitation of Liability
              </h2>
              <div className="flex gap-4 items-start bg-red-50 p-6 rounded-2xl border border-red-100">
                <AlertTriangle className="text-red-500 w-6 h-6 mt-1 flex-shrink-0" />
                <p className="text-red-800 text-sm leading-relaxed">
                  To the fullest extent permitted by law, our portal shall not be
                  liable for any indirect, incidental, or consequential damages
                  arising from your use of the website or any job applications
                  facilitated through it.
                </p>
              </div>
            </section>

            {/* 6. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">6.</span> Governing Law
              </h2>
              <div className="flex items-center gap-3 text-gray-600">
                <Gavel className="text-emerald-600 w-5 h-5" />
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of your jurisdiction.
                </p>
              </div>
            </section>

            {/* 7. Contact Section */}
            <section className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Need clarification?</h2>
                <p className="text-gray-600 text-sm">Reach out to our compliance team for any queries.</p>
              </div>
              <a
                href="mailto:nawalkumar4810167@gmail.com"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Contact Legal
              </a>
            </section>

          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8 tracking-widest uppercase">
          Safe & Secure Recruitment Platform
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;