import React from 'react';
import Navbar from '../components_lite/Navbar';
import { CheckCircle2, Rocket, Users, Briefcase, Bell, LayoutDashboard } from 'lucide-react';
import Footer from '../components_lite/Footer';

const Creator = () => {
    const instructions = [
        { id: 1, text: "Sign up/Login to the application.", icon: <Users className="text-emerald-600" /> },
        { id: 2, text: "Create your profile by adding your skills, bio, and profile picture.", icon: <LayoutDashboard className="text-emerald-600" /> },
        { id: 3, text: "Browse through job listings and apply to the ones that match your interests.", icon: <Briefcase className="text-emerald-600" /> },
        { id: 4, text: "Track your applications and get notified when recruiters contact you.", icon: <Bell className="text-emerald-600" /> },
        { id: 5, text: "Companies can post job listings and manage potential candidates.", icon: <Rocket className="text-emerald-600" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        How it <span className="text-emerald-600">Works</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Follow these simple steps to start your journey on our personalized job portal.
                        Whether you are a job seeker or a recruiter, we've got you covered.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Instructions Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
                            <CheckCircle2 /> Instructions to use
                        </h2>
                        <div className="space-y-6">
                            {instructions.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors group">
                                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                        {item.icon}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1">
                                        <span className="font-bold text-emerald-900 mr-1">{item.id}.</span> {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Future Work Section */}
                    <div className="space-y-6">
                        <div className="bg-emerald-900 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100">
                            <h2 className="text-2xl font-bold mb-4">Future Roadmap</h2>
                            <p className="text-emerald-100 mb-8">
                                We are constantly evolving to provide a more personalized experience.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-emerald-300">Community Building</h3>
                                        <p className="text-sm text-emerald-100/80 mt-1">
                                            Creating personalized spaces where recruiters can build talent communities and share exclusive posts.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-emerald-300">Career Growth Tools</h3>
                                        <p className="text-sm text-emerald-100/80 mt-1">
                                            Integrated resume builders, interview prep modules, and AI-driven career advice.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Tip Box */}
                        <div className="p-6 border border-emerald-200 bg-emerald-50 rounded-2xl italic text-emerald-800 text-sm">
                            "Our goal is to bridge the gap between talent and opportunity through a seamless, personalized interface."
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Creator;