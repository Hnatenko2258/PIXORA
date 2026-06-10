/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import ColorMastering from "./components/ColorMastering.tsx";
import AIVideoProcessing from "./components/AIVideoProcessing.tsx";
import CloudAutomation from "./components/CloudAutomation.tsx";
import BackgroundEffects from "./components/BackgroundEffects.tsx";
import { Mail, Github, Compass, Monitor, Send, HelpCircle, Code, Shield, CheckCircle, RefreshCw } from "lucide-react";
import { translations, Language } from "./translations.ts";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("pixora_lang");
    return (saved === "ru" || saved === "en" || saved === "uk") ? (saved as Language) : "en";
  });

  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMsg, setContactMsg] = useState<string>("");
  const [msgStatus, setMsgStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("pixora_lang", newLang);
  };

  // IntersectionObserver Scrollspy to highlight active navbar section
  useEffect(() => {
    const sections = ["hero", "color-mastering", "ai-processing", "cloud-automation", "contacts-qa"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px", // Trigger when dominant section is centered
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMsg) return;

    setMsgStatus("sending");
    
    // Simulate API webhook submission
    setTimeout(() => {
      setMsgStatus("sent");
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 1500);
  };

  const t = translations[lang];

  return (
    <div id="portfolio-container" className="bg-slate-950 text-slate-300 font-sans min-h-screen selection:bg-accent-blue/30 selection:text-white relative">
      
      {/* Dynamic Ambient Background Particles */}
      <BackgroundEffects />

      {/* Sticky Scrollspy Navbar */}
      <Navbar activeSection={activeSection} currentLang={lang} onLanguageChange={handleLanguageChange} />

      {/* Main Single Page Layout Content */}
      <main id="main-content">
        
        {/* Section 0: Hero Title & Pipeline Flow Simulator */}
        <Hero currentLang={lang} />

        {/* Section 1: Color Space, Gamut tone mapper and RGB Parade Scopes */}
        <ColorMastering currentLang={lang} />

        {/* Section 3: AI Neural Upscaler & Frame Interpolation overlay */}
        <AIVideoProcessing currentLang={lang} />

        {/* Section 4: Azure TTS Cognitive Cloud Flow and Python APIs */}
        <CloudAutomation currentLang={lang} />

        {/* Contact Node & QA FAQ Section */}
        <section id="contacts-qa" className="py-24 bg-slate-950 relative border-t border-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e2230,transparent_60%)] opacity-25"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
            
            {/* Direct Contact Form - Centered */}
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-accent-blue font-semibold tracking-widest uppercase block mb-1">
                    {t.contactFaq.contactBadge}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {t.contactFaq.contactTitle}
                  </h3>
                  <p className="text-slate-400 font-sans text-xs sm:text-sm mt-1.5">
                    {t.contactFaq.contactDesc}
                  </p>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-slate-500 uppercase">{t.contactFaq.labelName}</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={t.contactFaq.placeholderName}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-accent-blue rounded-lg p-3 text-xs focus:ring-1 focus:ring-accent-blue focus:outline-none text-slate-200 animate-fade-in"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-slate-500 uppercase">{t.contactFaq.labelEmail}</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={t.contactFaq.placeholderEmail}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-accent-blue rounded-lg p-3 text-xs focus:ring-1 focus:ring-accent-blue focus:outline-none text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 uppercase">{t.contactFaq.labelTask}</label>
                    <textarea
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      rows={5}
                      placeholder={t.contactFaq.placeholderTask}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-accent-blue rounded-lg p-3 text-xs focus:ring-1 focus:ring-accent-blue focus:outline-none text-slate-200 font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-mono text-[10px]">info@pixora.media</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={msgStatus !== "idle"}
                      className={`px-5 py-3 rounded-lg text-xs font-sans font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                        msgStatus === "sent"
                          ? "bg-accent-green text-slate-950 font-bold"
                          : msgStatus === "sending"
                          ? "bg-slate-850 text-slate-500 border border-slate-800 cursor-wait"
                          : "bg-accent-blue hover:bg-accent-blue/90 text-white shadow-[0_0_15px_rgba(214,90,42,0.25)]"
                      }`}
                    >
                      {msgStatus === "sent" ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>{t.contactFaq.btnSent}</span>
                        </>
                      ) : msgStatus === "sending" ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>{t.contactFaq.btnSending}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          <span>{t.contactFaq.btnSend}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>

              {/* Secure notification badge */}
              <div className="pt-6 mt-6 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center space-x-1.5">
                  <Monitor className="h-3.5 w-3.5 text-slate-600" />
                  <span>{t.contactFaq.secureTunnel}</span>
                </span>
                <span>{t.contactFaq.secureSigned}</span>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Humble & Beautiful Footer */}
      <footer id="main-footer" className="bg-slate-950 border-t border-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-slate-500 font-mono text-[11px] space-y-4 md:space-y-0">
          
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-accent-blue"></span>
            <span>© 2026 PIXORA // {t.footer.protected}</span>
          </div>

          <div className="flex space-x-6 items-center">
            <span className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-accent-green" />
              <span>{t.footer.sla}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Code className="h-3 w-3 text-accent-cyan" />
              <span>{t.footer.ffmpeg}</span>
            </span>
          </div>

          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
