import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">© 2025 Job Portal. All rights reserved.</p>
        <p className="text-sm mt-2">
          Powered by{" "}
          <a
            href="https://github.com/nawalkumar/Job-portal-Application/blob/main/Job-portal-application/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Naval Kumar
          </a>
        </p>
        <p className="text-sm mt-2">
          <Link to="/PrivacyPolicy" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/TermsofService" className="hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;