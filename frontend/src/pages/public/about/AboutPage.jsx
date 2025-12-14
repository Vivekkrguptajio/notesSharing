import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Zap, BookOpen, Share2, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
    const features = [
        {
            icon: Share2,
            title: "Easy Sharing",
            description: "Upload and share your notes, books, and PYQs with fellow students effortlessly."
        },
        {
            icon: BookOpen,
            title: "Vast Library",
            description: "Access thousands of study materials across all subjects and semesters."
        },
        {
            icon: Award,
            title: "Verified Content",
            description: "All materials are verified by our community to ensure quality and accuracy."
        },
        {
            icon: TrendingUp,
            title: "Always Growing",
            description: "Our library is constantly expanding with new contributions from students."
        }
    ];

    const stats = [
        { value: "10K+", label: "Students" },
        { value: "5K+", label: "Notes Shared" },
        { value: "2K+", label: "Books Available" },
        { value: "1K+", label: "PYQs" }
    ];

    const values = [
        {
            icon: Users,
            title: "Community First",
            description: "We believe in the power of collaborative learning and knowledge sharing among students."
        },
        {
            icon: Target,
            title: "Quality Education",
            description: "Our mission is to make quality study materials accessible to every student."
        },
        {
            icon: Heart,
            title: "Student Welfare",
            description: "We're dedicated to helping students succeed in their academic journey."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                            About CampusNotes
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
                            Your one-stop platform for sharing and accessing quality study materials.
                            Built by students, for students.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg text-sm sm:text-base"
                        >
                            Join Our Community
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        To create a collaborative learning environment where students can easily share
                        and access quality study materials, helping each other succeed academically.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-xl mb-4 sm:mb-5">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Features */}
                <div className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
                        Why Choose CampusNotes?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                                >
                                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg mb-3 sm:mb-4">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Our Story
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                            CampusNotes was born from a simple idea: students helping students. We noticed
                            that many students struggle to find quality study materials, while others have
                            excellent notes gathering dust on their shelves.
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                            We created this platform to bridge that gap, making it easy for students to
                            share their knowledge and access materials that can help them excel in their
                            studies. Today, we're proud to serve thousands of students across various
                            institutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already benefiting from our platform.
                        Start sharing and accessing quality study materials today!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg text-sm sm:text-base"
                        >
                            Create Account
                            <span>→</span>
                        </Link>
                        <Link
                            to="/notes"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-indigo-300 transition-all text-sm sm:text-base"
                        >
                            Browse Notes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
