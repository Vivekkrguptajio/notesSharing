import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';

const DropZone = ({ onFileUploaded, initialUrl = "" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(initialUrl);
    const [error, setError] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setError("");
        setUploading(true);

        // Create local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/file`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                onFileUploaded(data.fileUrl);
            } else {
                setError(data.message || "Upload failed");
                setPreview(""); // Clear preview on failure
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("Failed to upload file");
            setPreview("");
        } finally {
            setUploading(false);
        }
    }, [onFileUploaded]);

    const removeFile = (e) => {
        e.stopPropagation();
        setPreview("");
        onFileUploaded("");
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'application/pdf': ['.pdf']
        },
        multiple: false
    });

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`
                    relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
                    ${error ? 'border-red-300 bg-red-50' : ''}
                `}
            >
                <input {...getInputProps()} />

                {uploading ? (
                    <div className="flex flex-col items-center justify-center py-4 text-blue-600">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p className="text-sm font-medium">Uploading...</p>
                    </div>
                ) : preview ? (
                    <div className="relative group flex flex-col items-center justify-center w-full h-full min-h-[160px]">
                        {/* Success Badge */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                            <CheckCircle size={14} />
                            Document Selected
                        </div>

                        {/* File Preview */}
                        <div className="mt-6 flex flex-col items-center">
                            {(preview.match(/\.(jpeg|jpg|png|gif)$/i) || preview.startsWith('blob:')) ? (
                                <img
                                    src={preview}
                                    alt="Uploaded file"
                                    className="max-h-32 rounded-lg shadow-sm object-contain border border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex'; // Show fallback
                                    }}
                                />
                            ) : null}

                            {/* Fallback for non-image or error */}
                            <div className="hidden flex-col items-center text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-100" style={{ display: (preview.match(/\.(jpeg|jpg|png|gif)$/i) || preview.startsWith('blob:')) ? 'none' : 'flex' }}>
                                <FileText size={40} className="text-blue-500 mb-2" />
                                <span className="text-xs text-gray-400 break-all max-w-[200px] text-center">
                                    {preview.split('/').pop()}
                                </span>
                            </div>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={removeFile}
                            className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50 border border-gray-200 transition-all z-20"
                            title="Remove file"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 py-4">
                        <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
                            <Upload size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                            {isDragActive ? "Drop the file here" : "Click or drag to upload ID Card"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            SVG, PNG, JPG or GIF (max. 5MB)
                        </p>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <X size={14} /> {error}
                </p>
            )}
        </div>
    );
};

export default DropZone;
