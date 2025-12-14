import React, { useState } from "react";
import BooksCard from "./BooksCard";
import BooksFilter from "./BooksFilter";
import { booksData } from "./booksdata";

export default function BooksList() {
    const [filteredBooks, setFilteredBooks] = useState(booksData);

    const handleFilterChange = (filters) => {
        let filtered = [...booksData];

        // Filter by search term
        if (filters.search) {
            filtered = filtered.filter(
                (book) =>
                    book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    book.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
                    book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
                    book.category.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Filter by category
        if (filters.category && filters.category !== "All") {
            filtered = filtered.filter((book) => book.category === filters.category);
        }

        // Filter by subject
        if (filters.subject && filters.subject !== "All Subjects") {
            filtered = filtered.filter((book) => book.subject === filters.subject);
        }

        // Filter by semester
        if (filters.semester && filters.semester !== "All Semesters") {
            filtered = filtered.filter((book) => book.semester === filters.semester);
        }

        // Filter by file type
        if (filters.fileType && filters.fileType !== "All") {
            filtered = filtered.filter((book) => book.fileType === filters.fileType);
        }

        setFilteredBooks(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Enhanced Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span className="text-3xl sm:text-4xl">📖</span>
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                Browse Books
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-blue-100">
                                Discover and download textbooks from your peers
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-2xl sm:text-3xl font-bold">{filteredBooks.length}</span>
                            <span className="text-xs sm:text-sm text-blue-100">Available</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-2xl sm:text-3xl">✓</span>
                            <span className="text-xs sm:text-sm text-blue-100">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 -mt-8 sm:-mt-12">
                {/* Filter Section */}
                <BooksFilter
                    onFilterChange={handleFilterChange}
                    totalBooks={filteredBooks.length}
                />

                {/* Books Grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredBooks.map((book) => (
                            <BooksCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 sm:py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
                            <span className="text-4xl sm:text-5xl">📖</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            No books found
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
