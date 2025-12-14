import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [stats, setStats] = useState({
    users: 0,
    resources: 0,
    subjects: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/public-stats`);
        const data = await response.json();
        if (data.success) {
          setStats({
            users: data.stats.totalUsers,
            resources: data.stats.resourcesCount,
            subjects: data.stats.subjectsCount
          });
        }
      } catch (error) {
        console.error("Error fetching hero stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
          {/* Trust Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-indigo-200 px-4 py-2 shadow-sm">
              <span className="text-indigo-600 text-lg">✨</span>
              <span className="text-xs sm:text-sm font-medium text-indigo-600">
                Trusted by {stats.users}+ students
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Share Knowledge.{" "}
            <span className="text-indigo-600">Learn Better.</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline"> Grow Together.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Your one-stop platform to upload, share, and download verified study
            notes. Join thousands of students making learning easier.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 px-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 sm:px-8 py-3.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <span>→</span>
            </Link>
            <Link
              to="/notes"
              className="w-full sm:w-auto rounded-xl bg-white border-2 border-gray-200 px-6 sm:px-8 py-3.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              Browse Notes
            </Link>
          </div>

          {/* Stats - Always Horizontal */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-4xl mx-4 sm:mx-auto">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {stats.resources}+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                  Resources<br className="sm:hidden" /> Shared
                </div>
              </div>
              <div className="border-r border-gray-200 last:border-r-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {stats.users}+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                  Active<br className="sm:hidden" /> Users
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {stats.subjects}+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Subjects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}