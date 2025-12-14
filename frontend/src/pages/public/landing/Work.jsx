import React from 'react'

export default function Work() {
  const steps = [
    {
      number: "01",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      title: "Create Account",
      description: "Sign up with your college email and set up your profile in seconds."
    },
    {
      number: "02",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      ),
      title: "Upload Notes",
      description: "Share your study materials with fellow students. Support for PDF, PPT, DOC."
    },
    {
      number: "03",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
        />
      ),
      title: "Download & Learn",
      description: "Browse, download, and study from thousands of verified notes."
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* How it Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            How it works
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative inline-block mb-5 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-9 h-9 sm:w-10 sm:h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {step.icon}
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}