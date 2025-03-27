"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from '../../../public/logo.png'
import SearchBar from "./SearchBar";
import { NavItem } from "@/types/navigation";

interface NavbarProps {
  navigation: NavItem[];
}

function NestedNavigation({
  items,
  level = 1,
}: {
  items: NavItem[];
  level?: number;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (level === 1) {
    return (
      <div className="flex gap-4">
        {items.map((item) => (
          <div key={item.slug} className="relative group">
            <Link
              href={`/${item.slug}`}
              className="px-3 py-2 text-gray-800 hover:text-blue-700 rounded-md text-sm font-bold transition-colors duration-200"
            >
              {item.title}
            </Link>
            {item.children.length > 0 && (
              <div className="absolute left-0 mt-2 w-[520px] h-auto invisible group-hover:visible bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <div className="flex h-full">
                  {/* Level 2 - Left column */}
                  <div className="w-[200px] border-r border-gray-100 p-3 max-h-[400px] overflow-y-auto">
                    {item.children.map((child) => (
                      <div key={child.slug} className="mb-1">
                        <Link
                          href={`/${child.slug}`}
                          className={`block px-3 py-2 text-gray-800 hover:bg-primary-50 hover:text-blue-700 rounded-md transition-colors duration-200 font-bold ${
                            openDropdown === child.slug ? 'bg-gray-50 text-blue-700' : ''
                          }`}
                          onMouseEnter={() => setOpenDropdown(child.slug)}
                        >
                          {child.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                  
                  {/* Level 3 and 4 - Right column */}
                  <div className="flex-1 p-3 max-h-[400px] overflow-y-auto">
                    {openDropdown &&
                      items.map((item) =>
                        item.children.map(
                          (child) =>
                            child.slug === openDropdown && (
                              <div key={child.slug} className="space-y-1">
                                {child.children.map((grandChild) => (
                                  <div key={grandChild.slug} className="mb-3">
                                    <Link
                                      href={`/${grandChild.slug}`}
                                      className="block px-3 py-2 text-gray-800 hover:bg-primary-50 hover:text-blue-700 rounded-md transition-colors duration-200 font-bold"
                                    >
                                      {grandChild.title}
                                    </Link>
                                    {grandChild.children.length > 0 && (
                                      <div className="pl-3 mt-1 border-l-2 border-gray-100">
                                        {grandChild.children.map(
                                          (greatGrandChild) => (
                                            <Link
                                              key={greatGrandChild.slug}
                                              href={`/${greatGrandChild.slug}`}
                                              className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-blue-700 rounded-md transition-colors duration-200"
                                            >
                                              {greatGrandChild.title}
                                            </Link>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )
                        )
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function Navbar({ navigation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (slug: string) => {
    setMobileMenuOpen(mobileMenuOpen === slug ? null : slug);
  };

  return (
    <>
      {/* Spacer div to prevent content overlap */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? "h-[60px]" : "h-[72px]"
        }`}
      />

      <nav className="fixed w-full top-0 z-50">
        {/* Top Bar - Hidden when scrolled */}
        <div
          className={`bg-[#E67E22] w-full border-b border-[#e69b12] transition-all duration-300 ${
            isScrolled ? "h-0 overflow-hidden" : "h-12"
          }`}
        >
          <div className="container mx-auto px-6 flex justify-between items-center h-10">
            {/* Shop Now Button - Left Side */}
            <div className="mt-1.75">
              <Link href="/shop" passHref>
                <span className="text-[13px] font-bold tracking-wide text-white hover:text-white/90 transition-colors bg-[#d35400] px-4 py-1.5 rounded">
                  Shop Now
                </span>
              </Link>
            </div>

            {/* Login Text with Icon - Right Side */}
            <div className="ml-30">
              <Link href="/users/login" passHref>
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <span className="text-[13px] font-bold tracking-wide text-white ">
                    Login
                  </span>
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={` w-full transition-all duration-300 ${
            isScrolled
              ? "bg-gradient-to-r from-[#f4d03f] via-[#f5ab35] to-[#f39c12] shadow-lg"
              : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-center h-[60px]">
              {/* Logo */}
              <div className="flex-shrink-0 min-w-[40px]">
                <Link href="/" passHref>
                  <Image
                    src={logo}
                    alt="99Notes"
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>
              <div className="hidden lg:flex flex-1 justify-center items-center gap-1 ml-4 xl:ml-8">
                <div className="flex items-center space-x-1 xl:space-x-2"></div>
                <NestedNavigation items={navigation} />
                <Link href="/about" passHref>
                  <span
                    className={`text-[14px] whitespace-nowrap font-bold tracking-wide py-6 px-2 xl:px-3 transition-colors duration-300 ${
                      isScrolled
                        ? "text-black hover:text-gray-800"
                        : "text-gray-800 hover:text-blue-700"
                    }`}
                  >
                    About 99Notes
                  </span>
                </Link>
                <Link href="/blogs" passHref>
                  <span
                    className={`text-[14px] whitespace-nowrap font-bold tracking-wide py-6 px-2 xl:px-3 transition-colors duration-300 ${
                      isScrolled
                        ? "text-black hover:text-gray-800"
                        : "text-gray-800 hover:text-blue-700"
                    }`}
                  >
                    Blogs
                  </span>
                </Link>

                {/* Search Bar */}
                <div className="ml-2 xl:ml-4">
                  <SearchBar />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-700 hover:bg-gray-100 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`lg:hidden ${
            isOpen ? "block" : "hidden"
          } bg-white shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.slug} className="py-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/${item.slug}`}
                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    {item.title}
                  </Link>
                  {item.children.length > 0 && (
                    <button
                      onClick={() => toggleMobileSubmenu(item.slug)}
                      className="px-2 py-1 text-gray-500"
                    >
                      {mobileMenuOpen === item.slug ? (
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                {mobileMenuOpen === item.slug && item.children.length > 0 && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/${child.slug}`}
                        className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
