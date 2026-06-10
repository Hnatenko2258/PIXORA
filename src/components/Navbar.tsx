/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Cpu, Video, Sliders, Cloud, Activity, Mail, Globe, ChevronDown, Check } from "lucide-react";
import { translations, Language } from "../translations.ts";

interface NavbarProps {
  activeSection: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navbar({ activeSection, currentLang, onLanguageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[currentLang];

  const navItems = [
    { id: "hero", label: t.nav.hero, icon: Cpu },
    { id: "color-mastering", label: t.nav.mastering, icon: Sliders },
    { id: "ai-processing", label: t.nav.ai, icon: Video },
    { id: "cloud-automation", label: t.nav.tts, icon: Cloud },
    { id: "contacts-qa", label: t.nav.contacts, icon: Mail },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand/Logo Logo resembles broadcast metadata tracker */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-accent-blue/10 border border-accent-blue/50 flex items-center justify-center text-accent-blue font-mono font-bold text-xs tracking-widest animate-pulse">
              PX
            </div>
            <div>
              <span className="font-display font-semibold text-white text-base tracking-tight block">
                PIXORA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight font-sans transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-800 text-white border border-slate-700/80 shadow-[0_0_12px_rgba(214,90,42,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-accent-blue" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right menu tools: Contact Block & Language dropdown */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Contact Line */}
            <button
              onClick={() => handleScrollTo("contacts-qa")}
              className="flex items-center space-x-1.5 border border-slate-800/80 hover:border-accent-blue bg-slate-900/30 hover:bg-slate-900/80 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 transition-all cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-green animate-pulse"></span>
              </span>
              <span>INFO@PIXORA.MEDIA</span>
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="flex items-center space-x-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-sans text-slate-300 transition-all cursor-pointer"
              >
                <Globe className="h-3 w-3 text-accent-cyan" />
                <span className="uppercase font-semibold text-[10px]">{currentLang}</span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg bg-slate-900 border border-slate-800 shadow-xl z-50 overflow-hidden">
                  {(["en", "ru", "uk"] as Language[]).map((ln) => (
                    <button
                      key={ln}
                      onMouseDown={(e) => {
                        // Use onMouseDown to prevent onBlur from closing menu before link triggers change
                        e.preventDefault();
                        onLanguageChange(ln);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="font-medium">
                        {ln === "ru" ? "Русский" : ln === "en" ? "English" : "Українська"}
                      </span>
                      {currentLang === ln && <Check className="h-3.5 w-3.5 text-accent-green" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="flex items-center space-x-1 bg-slate-905 border border-slate-850 px-2 py-1 rounded text-xs text-slate-300 cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-accent-cyan" />
                <span className="uppercase font-semibold text-[9px]">{currentLang}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 rounded bg-slate-900 border border-slate-800 shadow-xl z-50">
                  {(["en", "ru", "uk"] as Language[]).map((ln) => (
                    <button
                      key={ln}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onLanguageChange(ln);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{ln === "ru" ? "Русский" : ln === "en" ? "English" : "Українська"}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-accent-blue"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 transition-all">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-mobile-${item.id}`}
                  onClick={() => handleScrollTo(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium tracking-tight transition-all text-left ${
                    isActive
                      ? "bg-slate-800 text-white border-l-2 border-accent-blue"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-accent-blue" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-900 px-4 flex items-center justify-between text-slate-500 text-[10px] font-mono">
              <span className="flex items-center space-x-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                </span>
                <span>INFO@PIXORA.MEDIA</span>
              </span>
              <span>ACTIVE PIPELINES: 4 / 4</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
