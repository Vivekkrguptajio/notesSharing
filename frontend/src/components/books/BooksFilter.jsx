import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { categories, subjects, semesters, fileTypes } from "./booksdata";

export default function BooksFilter({ onFilterChange, totalBooks }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
    const [selectedSemester, setSelectedSemester] = useState("All Semesters");
    const [selectedFileType, setSelectedFileType] = useState("All");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
    const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange({
            search: value,
            category: selectedCategory,
            subject: selectedSubject,
            semester: selectedSemester,
            fileType: selectedFileType,
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
            fileType: selectedFileType,
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
            fileType: selectedFileType,
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
            fileType: selectedFileType,
        });
    };

    const handleFileTypeChange = (fileType) => {
        setSelectedFileType(fileType);
        setShowFileTypeDropdown(false);
        onFilterChange({
            search: searchTerm,
            category: selectedCategory,
            subject: selectedSubject,
            semester: selectedSemester,
            fileType: fileType,
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-6">
            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Category Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowCategoryDropdown(!showCategoryDropdown);
                            setShowSubjectDropdown(false);
                            setShowSemesterDropdown(false);
                            setShowFileTypeDropdown(false);
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
                            setShowFileTypeDropdown(false);
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
                            setShowFileTypeDropdown(false);
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

                {/* File Type Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowFileTypeDropdown(!showFileTypeDropdown);
                            setShowCategoryDropdown(false);
                            setShowSubjectDropdown(false);
                            setShowSemesterDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg hover:border-indigo-300 transition-colors text-sm bg-white"
                    >
                        <span className="text-gray-700 truncate">{selectedFileType}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                    {showFileTypeDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {fileTypes.map((fileType) => (
                                <button
                                    key={fileType}
                                    onClick={() => handleFileTypeChange(fileType)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedFileType === fileType
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {fileType}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{totalBooks}</span> books
            </div>
        </div>
    );
}
