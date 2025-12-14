import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { isAuthenticated } from '../../api/auth.api';

export default function Footer() {
  const navigate = useNavigate();

  const handleQuickLinkClick = (e, href) => {
    e.preventDefault();
    if (href === '/notes' || isAuthenticated()) {
      navigate(href);
    } else {
      navigate('/login');
    }
  };

  const footerLinks = {
    quickLinks: [
      { name: "Browse Notes", href: "/notes" },
      { name: "Upload Notes", href: "/student/upload" },
      { name: "Dashboard", href: "/student/dashboard" }
    ],
    resources: [
      { name: "About Us", href: "/about" },
      { name: "Help Center", href: "#" },
      { name: "Guidelines", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ]
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/Vivekkr_gupta",
      icon: <Twitter className="w-5 h-5" />
    },
    {
      name: "GitHub",
      href: "https://github.com/Vivekkrguptajio",
      icon: <Github className="w-5 h-5" />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vivek369",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: "Instagram",
      href: "https://instagram.com/kumarvivek.ai",
      icon: <Instagram className="w-5 h-5" />
    }
  ];

  return (
    <>
      <footer className="w-full bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white text-xl">
                  📘
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  CampusNotes
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-5 max-w-xs">
                Share Knowledge. Learn Better. Grow Together.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-colors p-1"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={(e) => handleQuickLinkClick(e, link.href)}
                      className="text-gray-600 hover:text-indigo-600 text-sm transition-colors inline-block text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-indigo-600 text-sm transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-indigo-600 text-sm transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-center text-xs sm:text-sm text-gray-600">
              © {new Date().getFullYear()} CampusNotes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}