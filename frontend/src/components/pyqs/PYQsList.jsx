import React, { useState } from "react";
import PYQsCard from "./PYQsCard";
import PYQsFilter from "./PYQsFilter";
import { pyqsData } from "./pyqsdata";

export default function PYQsList() {
    const [filteredPYQs, setFilteredPYQs] = useState(pyqsData);

    const handleFilterChange = (filters) => {
        let filtered = [...pyqsData];

        // Filter by search term
        if (filters.search) {
            filtered = filtered.filter(
                (pyq) =>
                    pyq.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    pyq.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
                    pyq.category.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Filter by category
        if (filters.category && filters.category !== "All") {
            filtered = filtered.filter((pyq) => pyq.category === filters.category);
        }

        // Filter by subject
        if (filters.subject && filters.subject !== "All Subjects") {
            filtered = filtered.filter((pyq) => pyq.subject === filters.subject);
        }

        // Filter by semester
        if (filters.semester && filters.semester !== "All Semesters") {
            filtered = filtered.filter((pyq) => pyq.semester === filters.semester);
        }

        // Filter by exam type
        if (filters.examType && filters.examType !== "All Types") {
            filtered = filtered.filter((pyq) => pyq.examType === filters.examType);
        }

        // Filter by year
        if (filters.year && filters.year !== "All Years") {
            filtered = filtered.filter((pyq) => pyq.year === filters.year);
        }

        setFilteredPYQs(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
            {/* Enhanced Header with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span className="text-3xl sm:text-4xl">📝</span>
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                Browse PYQs
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-purple-100">
                                Previous year question papers with solutions
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-2xl sm:text-3xl font-bold">{filteredPYQs.length}</span>
                            <span className="text-xs sm:text-sm text-purple-100">Available</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-2xl sm:text-3xl">✓</span>
                            <span className="text-xs sm:text-sm text-purple-100">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 -mt-8 sm:-mt-12">
                {/* Filter Section */}
                <PYQsFilter
                    onFilterChange={handleFilterChange}
                    totalPYQs={filteredPYQs.length}
                />

                {/* PYQs Grid */}
                {filteredPYQs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredPYQs.map((pyq) => (
                            <PYQsCard key={pyq.id} pyq={pyq} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 sm:py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                            <span className="text-4xl sm:text-5xl">📝</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            No PYQs found
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
