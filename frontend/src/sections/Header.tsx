"use client";
import Logo from "~/assets/tt.png";
import Image from "next/image";
import MenuIcon from "~/assets/menu.svg";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm">
      {/* Navbar */}
      <div className="py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src={Logo}
                alt="logo"
                height={40}
                width={40}
                className="rounded-lg"
              />
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
              <a
                href="#"
                className="font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
              >
                Research Paper
              </a>
              <a
                href="#"
                className="font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
              >
                Github
              </a>
              <a
                href="#"
                className="font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
              >
                Features
              </a>
              <a
                href="#"
                className="font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
              >
                About
              </a>
            </nav>

            {/* Desktop CTA Button - Right Aligned */}
            <div className="hidden md:flex">
              <button className="btn btn-primary group relative overflow-hidden">
                <span className="inline-flex items-center">
                  Analyze
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image src={MenuIcon} alt="menu" className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="mt-4 border-t border-gray-200 pb-4 md:hidden">
              <nav className="flex flex-col gap-4 pt-4">
                <a
                  href="#"
                  className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Research Paper
                </a>
                <a
                  href="#"
                  className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Github
                </a>
                <a
                  href="#"
                  className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                >
                  About
                </a>
                <button className="btn btn-primary group relative overflow-hidden">
                  <span className="inline-flex items-center">
                    Analyze
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
