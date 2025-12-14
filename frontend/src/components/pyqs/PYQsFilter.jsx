import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { categories, subjects, semesters, examTypes, years } from "./pyqsdata";

export default function PYQsFilter({ onFilterChange, totalPYQs }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
    const [selectedSemester, setSelectedSemester] = useState("All Semesters");
    const [selectedExamType, setSelectedExamType] = useState("All Types");
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
    const [showExamTypeDropdown, setShowExamTypeDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange({
            search: value,
            category: selectedCategory,
            subject: selectedSubject,
            semester: selectedSemester,
            examType: selectedExamType,
            year: selectedYear,
        });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setShowCategoryDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: category,
            subject: selectedSubject,
            semester: selectedSemester,
            examType: selectedExamType,
            year: selectedYear,
        });
    };

    const handleSubjectChange = (subject) => {
        setSelectedSubject(subject);
        setShowSubjectDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            subject: subject,
            semester: selectedSemester,
            examType: selectedExamType,
            year: selectedYear,
        });
    };

    const handleSemesterChange = (semester) => {
        setSelectedSemester(semester);
        setShowSemesterDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            subject: selectedSubject,
            semester: semester,
            examType: selectedExamType,
            year: selectedYear,
        });
    };

    const handleExamTypeChange = (examType) => {
        setSelectedExamType(examType);
        setShowExamTypeDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            subject: selectedSubject,
            semester: selectedSemester,
            examType: examType,
            year: selectedYear,
        });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setShowYearDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            subject: selectedSubject,
            semester: selectedSemester,
            examType: selectedExamType,
            year: year,
        });
    };

    const closeAllDropdowns = () => {
        setShowCategoryDropdown(false);
        setShowSubjectDropdown(false);
        setShowSemesterDropdown(false);
        setShowExamTypeDropdown(false);
        setShowYearDropdown(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-6">
            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search previous year questions..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
            </div>

            {/* Filters - 5 filters in responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Category Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowCategoryDropdown(!showCategoryDropdown);
                            setShowSubjectDropdown(false);
                            setShowSemesterDropdown(false);
                            setShowExamTypeDropdown(false);
                            setShowYearDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedCategory}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showCategoryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedCategory === category
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subject Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSubjectDropdown(!showSubjectDropdown);
                            setShowCategoryDropdown(false);
                            setShowSemesterDropdown(false);
                            setShowExamTypeDropdown(false);
                            setShowYearDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedSubject}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showSubjectDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {subjects.map((subject) => (
                                <button
                                    key={subject}
                                    onClick={() => handleSubjectChange(subject)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedSubject === subject
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Semester Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSemesterDropdown(!showSemesterDropdown);
                            setShowCategoryDropdown(false);
                            setShowSubjectDropdown(false);
                            setShowExamTypeDropdown(false);
                            setShowYearDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedSemester}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showSemesterDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {semesters.map((semester) => (
                                <button
                                    key={semester}
                                    onClick={() => handleSemesterChange(semester)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedSemester === semester
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {semester}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Exam Type Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowExamTypeDropdown(!showExamTypeDropdown);
                            setShowCategoryDropdown(false);
                            setShowSubjectDropdown(false);
                            setShowSemesterDropdown(false);
                            setShowYearDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedExamType}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showExamTypeDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {examTypes.map((examType) => (
                                <button
                                    key={examType}
                                    onClick={() => handleExamTypeChange(examType)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedExamType === examType
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {examType}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Year Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowYearDropdown(!showYearDropdown);
                            setShowCategoryDropdown(false);
                            setShowSubjectDropdown(false);
                            setShowSemesterDropdown(false);
                            setShowExamTypeDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedYear}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showYearDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearChange(year)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedYear === year
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{totalPYQs}</span> previous year questions
            </div>
        </div>
    );
}
