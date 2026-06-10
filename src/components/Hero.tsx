/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { translations, Language } from "../translations.ts";

interface HeroProps {
  currentLang: Language;
}

interface Slide {
  title: string;
  sub: string;
  desc: string;
  img: string;
  badge: string;
  tags: string[];
}

const slidesData: Record<Language, Slide[]> = {
  ru: [
    {
      title: "Стриминг сверхнизкой задержки",
      sub: "ПАКЕТ LIVE-ВЕЩАНИЯ",
      desc: "Стабильный захват и раздача видео без задержек и пропусков кадров по всему миру.",
      img: "/src/assets/images/pixora_live_streaming_1780667136661.png",
      badge: "ULTRA-LOW LATENCY",
      tags: ["SRT / RTMP", "Active-Standby", "Failover"]
    },
    {
      title: "Умная цветокоррекция & AI",
      sub: "ИНТЕЛЛЕКТУАЛЬНЫЙ МАСТЕРИНГ",
      desc: "Высокоточное автоматическое преобразование цветовых пространств и супер-разрешение кадра.",
      img: "/src/assets/images/pixora_ai_grading_1780667152558.png",
      badge: "COLOR GRADE & UP-SCALE",
      tags: ["HDR / Dolby Vision", "TensorRT", "4K Dynamic"]
    },
    {
      title: "Хмарная нейро-озвучка",
      sub: "ОБЛАЧНЫЕ ДИКТОРЫ",
      desc: "Создание качественного аудиоконтента и речевого сопровождения из текста за считанные секунды.",
      img: "/src/assets/images/pixora_cloud_voice_1780667166658.png",
      badge: "NEURAL VOICE",
      tags: ["Azure / OpenAI", "50+ голосов", "Мгновенно"]
    }
  ],
  en: [
    {
      title: "Ultra-Low Latency Streaming",
      sub: "LIVE BROADCAST PACK",
      desc: "Drop-proof video delivery and low latency capture for global audiences with zero frame loss.",
      img: "/src/assets/images/pixora_live_streaming_1780667136661.png",
      badge: "ULTRA-LOW LATENCY",
      tags: ["SRT / RTMP", "Active-Standby", "Failover"]
    },
    {
      title: "Smart Color Grading & AI",
      sub: "INTELLIGENT WEBSPACE",
      desc: "Highly-calibrated automated color space transformation and frame super-resolution filters.",
      img: "/src/assets/images/pixora_ai_grading_1780667152558.png",
      badge: "COLOR GRADE & UP-SCALE",
      tags: ["HDR / Dolby Vision", "TensorRT", "4K Dynamic"]
    },
    {
      title: "Cloud Voice Synthesis",
      sub: "AI AUDIO PRODUCTION",
      desc: "Generate broadcast-ready voiceovers and voice accompaniments from text files in seconds.",
      img: "/src/assets/images/pixora_cloud_voice_1780667166658.png",
      badge: "NEURAL VOICE",
      tags: ["Azure / OpenAI", "50+ Voices", "Instant API"]
    }
  ],
  uk: [
    {
      title: "Стрімінг наднизької затримки",
      sub: "ЖИВЕ МОВЛЕННЯ БЕЗ ЗБОЇВ",
      desc: "Стабільна доставка та захоплення потоків без втрати кадрів для будь-якої аудиторії по всьому світу.",
      img: "/src/assets/images/pixora_live_streaming_1780667136661.png",
      badge: "ULTRA-LOW LATENCY",
      tags: ["SRT / RTMP", "Active-Standby", "Failover"]
    },
    {
      title: "Розумна кольорокорекція & AI",
      sub: "КОЛЬОРОВИЙ МАСТЕРІНГ",
      desc: "Високоточна автоматизація перетворень колірних спектрів та нейронне масштабування кадрів.",
      img: "/src/assets/images/pixora_ai_grading_1780667152558.png",
      badge: "COLOR GRADE & UP-SCALE",
      tags: ["HDR / Dolby Vision", "TensorRT", "4K Dynamic"]
    },
    {
      title: "Хмарна нейро-озвучка",
      sub: "АВТОМАТИЗАЦІЯ ДИКТОРІВ",
      desc: "Створення якісного озвучення та голосового супроводу з друкованого тексту за лічені секунди.",
      img: "/src/assets/images/pixora_cloud_voice_1780667166658.png",
      badge: "NEURAL VOICE",
      tags: ["Azure / OpenAI", "50+ голосів", "Миттєво"]
    }
  ]
};

export default function Hero({ currentLang }: HeroProps) {
  const t = translations[currentLang];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = slidesData[currentLang] || slidesData.ru;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 pt-20 pb-16 overflow-hidden">
      {/* Background ambient mesh grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#12141c_1px,transparent_1px),linear-gradient(to_bottom,#12141c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Texts side - 7 cols */}
        <div className="lg:col-span-7 space-y-6">

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.1]">
            {t.hero.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-green">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-slate-400 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={() => handleScrollToSection("color-mastering")}
              className="px-6 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-lg font-sans font-medium text-sm flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(214,90,42,0.3)] hover:shadow-[0_4px_25px_rgba(214,90,42,0.45)] cursor-pointer"
            >
              <span>{t.hero.btnSpecs}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Beautiful Dynamic Presentation Carousel - 5 cols */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-2xl flex flex-col h-[480px] shadow-2xl relative overflow-hidden group">
          
          {/* Header Panel */}
          <div className="flex items-center justify-between border-b border-slate-800 py-3.5 px-4 bg-slate-950/40">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
              <span className="font-mono text-[10px] font-semibold text-slate-300 tracking-wider uppercase">
                {t.hero.pipelineSteps}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono text-[9px] text-slate-500 uppercase">SYS_ACTIVE</span>
            </div>
          </div>

          {/* Active Image and presentation copy */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${
                    isActive ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-8 scale-95 z-0 pointer-events-none"
                  }`}
                >
                  {/* High Quality Styled Image */}
                  <div className="h-56 relative overflow-hidden border-b border-slate-800 bg-slate-950">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono font-bold text-accent-cyan tracking-wider">
                      {slide.badge}
                    </div>
                  </div>

                  {/* Pitch description detail */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] text-accent-blue tracking-widest font-bold uppercase block">
                        {slide.sub}
                      </span>
                      <h4 className="font-display font-bold text-lg text-white leading-tight">
                        {slide.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                        {slide.desc}
                      </p>
                    </div>

                    {/* Tag bubbles */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {slide.tags.map((tg, i) => (
                        <span key={i} className="font-mono text-[9px] bg-slate-950 text-slate-400 px-2.5 py-1 rounded border border-slate-850">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider controls footer */}
          <div className="p-3.5 bg-slate-950/60 border-t border-slate-850 flex items-center justify-between">
            <div className="flex space-x-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? "w-6 bg-accent-blue" : "w-2 bg-slate-800"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
