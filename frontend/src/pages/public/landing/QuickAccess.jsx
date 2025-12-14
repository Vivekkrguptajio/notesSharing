import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, BookOpen, ArrowRight } from "lucide-react";

export default function QuickAccess() {
    const quickLinks = [
        {
            title: "Browse PYQs",
            description: "Access previous year question papers with solutions",
            icon: FileQuestion,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            to: "/pyqs",
            emoji: "📝"
        },
        {
            title: "Browse Books",
            description: "Discover and download textbooks from your peers",
            icon: BookOpen,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            to: "/books",
            emoji: "📖"
        }
    ];

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Quick Access
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our comprehensive collection of study materials
                    </p>
                </div>

                {/* Quick Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${link.iconBg} mb-4 sm:mb-5 group-hover:scale-110 transition-transform`}>
                                    <span className="text-2xl sm:text-3xl">{link.emoji}</span>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {link.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {link.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center text-indigo-600 font-medium text-sm sm:text-base">
                                    <span className="mr-2">Explore now</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity -z-10"></div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
