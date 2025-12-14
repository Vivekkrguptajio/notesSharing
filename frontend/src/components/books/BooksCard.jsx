import React from "react";
import { BookOpen, Download, Star, User, CheckCircle, Eye } from "lucide-react";

export default function BooksCard({ book }) {
    const getFileTypeColor = (type) => {
        switch (type) {
            case "PDF":
                return "bg-red-100 text-red-700";
            case "EPUB":
                return "bg-blue-100 text-blue-700";
            case "MOBI":
                return "bg-orange-100 text-orange-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200">
            {/* Header with Icon and Title */}
            <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{book.author}</p>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {book.category}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium">
                    {book.semester}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getFileTypeColor(book.fileType)}`}>
                    {book.fileType}
                </span>
                {book.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                    </span>
                )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[100px] sm:max-w-none">{book.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{book.downloads}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                </button>
                <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                </button>
            </div>
        </div>
    );
}
