/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Layers, Sliders, Zap } from "lucide-react";
import { Language } from "../translations.ts";

interface AIVideoProcessingProps {
  currentLang: Language;
}

const localizedContent: Record<Language, {
  title: string;
  desc: string;
  comparisonLabel: string;
  beforeLabel: string;
  afterLabel: string;
  sliderTip: string;
  activeModelLabel: string;
  srTitle: string;
  srDesc: string;
  denoiseTitle: string;
  denoiseDesc: string;
  interpTitle: string;
  interpDesc: string;
  statsHeading: string;
  statsLabel: string;
}> = {
  en: {
    title: "Intelligent Video Upscaling & AI Enhancements",
    desc: "AI-driven image restoration. We implement deep learning engines to upscale historical video archives, clear sensor grain, and interpolate frames for liquid-smooth 60/120 FPS playbacks in real-time.",
    comparisonLabel: "INTERACTIVE SPLIT-SCREEN COMPARISON",
    beforeLabel: "RAW FILE // LOW ASPECT // 24 FPS",
    afterLabel: "PIXORA AI ENHANCED // ULTRA HD 4K // 60 FPS",
    sliderTip: "* Move the divider to compare raw details against neural restoration side by side",
    activeModelLabel: "Neural Core",
    srTitle: "Intelligent 4K Super-Resolution",
    srDesc: "Deep learning models reconstruct missing pixels, transforming old SD and Full HD films into razor-sharp 4K masterpieces with zero blocky compression artifacts.",
    denoiseTitle: "Aesthetic Deep Denoising",
    denoiseDesc: "Intelligently wipes high-frequency digital noise and camera artifacts without softening the skin, textures, or microstructural details.",
    interpTitle: "Optical Fluid Motion (DCI)",
    interpDesc: "Real-time vector interpolation inserts synthesized in-between frames, converting standard cinema 24fps into spectacular fluid 60fps broadcasts.",
    statsHeading: "AI MODEL SPECIFICATION OVERVIEW",
    statsLabel: "PROCESS ULTRA ACCELERATED"
  },
  ru: {
    title: "Интеллектуальное улучшение и ИИ-обработка видео",
    desc: "Передовые нейросетевые технологии восстановления контента. Масштабирование архивных записей до разрешения Ultra HD, очистка кадра от шумов и добавление плавности до 60/120 кадров в секунду в реальном времени.",
    comparisonLabel: "ИНТЕРАКТИВНОЕ СРАВНЕНИЕ (ДО И ПОСЛЕ ИИ)",
    beforeLabel: "ИСХОДНЫЙ КАДР // НИЗКОЕ РАЗРЕШЕНИЕ // 24 FPS",
    afterLabel: "ОБРАБОТКА PIXORA AI // ULTRA HD 4K // 60 FPS",
    sliderTip: "* Двигайте разделитель для сравнения исходного качества с нейросетевой обработкой",
    activeModelLabel: "ИИ Ядро",
    srTitle: "Масштабирование Ultra HD",
    srDesc: "Глубокое обучение встраивает новые детали ландшафтов и контуров, преобразуя старые архивы в полноценные UHD-материалы без потери естественности.",
    denoiseTitle: "Кристальное шумоподавление",
    denoiseDesc: "Интеллектуальное удаление цифрового шума и вечерней зернистости матриц без размытия текстуры кожи или тонких деталей одежды.",
    interpTitle: "Плавность движения (Fluid Motion)",
    interpDesc: "Расчет траекторий движения в реальном времени для генерации дополнительных кадров. Превращает стандартные кинокадры в плавный поток.",
    statsHeading: "ТЕХНИЧЕСКИЙ СТЭК НЕЙРОСЕТЕВЫХ МОДЕЛЕЙ",
    statsLabel: "ИИ-УСКОРЕНИЕ АКТИВИРОВАНО"
  },
  uk: {
    title: "Інтелектуальне покращення та ШІ-обробка відео",
    desc: "Сучасні нейромережеві технології відновлення медіа. Автоматичне масштабування архівних записів до Ultra HD, очищення кадру від шумів та збільшення плавності руху до 60/120 кадрів в секунду у реальному часі.",
    comparisonLabel: "ІНТЕРАКТИВНЕ ПОРІВНЯННЯ (ДО ТА ПІСЛЯ ШІ)",
    beforeLabel: "ПОЧАТКОВИЙ КАДР // НИЗЬКА ЯКІСТЬ // 24 FPS",
    afterLabel: "ОБРОБКА PIXORA AI // ULTRA HD 4K // 60 FPS",
    sliderTip: "* Переміщуйте роздільник для порівняння вихідного кадру та нейромережевої обробки",
    activeModelLabel: "ШІ Ядро",
    srTitle: "Масштабування Ultra HD",
    srDesc: "Глибоке навчання детально відтворює контури деталей без розмиття, перетворюючи старі файли на сучасні UHD матеріали.",
    denoiseTitle: "Кристальне шумоподавлення",
    denoiseDesc: "Інтелектуальне видалення високих шумів камери та вечірнього приглушення матриць без пошкодження текстур.",
    interpTitle: "Плавність руху (Fluid Motion)",
    interpDesc: "Розрахунок траєкторій колізій об'єктів для додавання проміжних кадрів та створення бездоганно плавного відеопотоку 60 кадрів/сек.",
    statsHeading: "ТЕХНІЧНИЙ СТЕК НЕЙРОМЕРЕЖЕВИХ МОДЕЛЕЙ",
    statsLabel: "ШІ-ПРИСКОРЕННЯ АКТИВОВАНО"
  }
};

export default function AIVideoProcessing({ currentLang }: AIVideoProcessingProps) {
  const content = localizedContent[currentLang] || localizedContent.en;

  const [activeMode, setActiveMode] = useState<"resolution" | "denoise" | "interpolation">("resolution");
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100% split screen position
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Motion vectors preview for Interpolation
  const [motionVectors, setMotionVectors] = useState<{ x: number; y: number; u: number; v: number }[]>([]);

  useEffect(() => {
    const vectors = [];
    for (let x = 10; x < 95; x += 15) {
      for (let y = 15; y < 90; y += 20) {
        const u = (x - 50) * 0.15 + Math.sin(y) * 2;
        const v = (y - 50) * 0.15 + Math.cos(x) * 2;
        vectors.push({ x, y, u, v });
      }
    }
    setMotionVectors(vectors);
  }, []);

  const handleStartDrag = () => {
    isDragging.current = true;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    
    if ("touches" in e) {
      if (e.touches[0]) {
        clientX = e.touches[0].clientX;
      }
    } else {
      clientX = e.clientX;
    }

    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <section id="ai-processing" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#1e2230,transparent_55%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simplified Header Section */}
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-slate-400 mt-3 font-sans text-sm sm:text-base leading-relaxed">
            {content.desc}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Slider Comparison Playground - 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                {content.comparisonLabel}
              </span>
              
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 space-x-1 self-start sm:self-auto">
                {[
                  { id: "resolution", label: "Super-Res 4K" },
                  { id: "denoise", label: "Denoising" },
                  { id: "interpolation", label: "Interpolation" }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as any)}
                    className={`px-3 py-1 text-[9px] font-mono font-medium rounded transition-all cursor-pointer ${
                      activeMode === mode.id
                        ? "bg-accent-green/10 text-accent-green border border-accent-green/30"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Component Container */}
            <div
              ref={containerRef}
              onMouseMove={handleDragMove}
              onTouchMove={handleDragMove}
              className="relative aspect-video w-full rounded-2xl border border-slate-800 select-none overflow-hidden bg-slate-950 cursor-ew-resize group shadow-lg"
            >
              
              {/* BEFORE SIDE (Noisy, Low-Res, Raw) */}
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none filter blur-[1px] brightness-[88%] contrast-90"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=720&auto=format&fit=crop')",
                }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                {activeMode === "denoise" && (
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[size:4px_4px] opacity-75" />
                )}
              </div>

              {/* AFTER SIDE (Enhanced overlayed clipped div) */}
              <div
                className="absolute inset-y-0 left-0 right-0 bg-cover bg-center pointer-events-none transition-all duration-75 overflow-hidden filter saturate-[110%] brightness-[100%] contrast-100"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=720&auto=format&fit=crop')",
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                {/* Resolution boundary overlay inside target */}
                {activeMode === "resolution" && sliderPos > 15 && (
                  <div
                    className="absolute border border-accent-green/45 bg-accent-green/5 flex flex-col justify-between p-2 pointer-events-none rounded"
                    style={{
                      left: "15%",
                      top: "20%",
                      width: "120px",
                      height: "90px"
                    }}
                  >
                    <span className="font-mono text-[7px] text-accent-green font-bold bg-slate-950/80 px-1 py-0.5 rounded border border-accent-green/30 self-start">
                      4K RECONSTRUCTED
                    </span>
                    <span className="font-mono text-[6px] text-slate-400 self-end">LATENCY: 4.8ms</span>
                  </div>
                )}

                {/* Interpolation flow arrows overlay */}
                {activeMode === "interpolation" && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    {motionVectors.map((v, idx) => {
                      if (v.x > sliderPos) return null;
                      return (
                        <g key={idx} opacity="0.65">
                          <circle cx={`${v.x}%`} cy={`${v.y}%`} r="1" fill="#00e5ff" />
                          <line
                            x1={`${v.x}%`}
                            y1={`${v.y}%`}
                            x2={`${v.x + v.u}%`}
                            y2={`${v.y + v.v}%`}
                            stroke="#00e5ff"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>

              {/* Absolute Overlay badges */}
              <div className="absolute top-4 left-4 bg-slate-950/85 px-2 py-1 rounded font-mono text-[8px] text-slate-400 border border-slate-800">
                {content.beforeLabel}
              </div>
              <div className="absolute top-4 right-4 bg-slate-950/85 px-2 py-1 rounded font-mono text-[8px] text-accent-green border border-accent-green/30">
                {content.afterLabel}
              </div>

              {/* Handle splitter line */}
              <div
                onMouseDown={handleStartDrag}
                onTouchStart={handleStartDrag}
                className="absolute inset-y-0 w-1 bg-accent-green flex items-center justify-center hover:bg-accent-green/80 cursor-ew-resize transition-colors"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="h-8 w-8 bg-slate-950 border border-accent-green rounded-full flex items-center justify-center shadow-lg transform -translate-x-[48%] relative z-20 hover:scale-110 transition-all">
                  <Sliders className="h-3 w-3 text-accent-green" />
                </div>
              </div>

            </div>

            {/* Slider Instructions */}
            <div className="bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">
              <span className="font-mono text-[9px] text-slate-500 uppercase leading-none">
                {content.sliderTip}
              </span>
            </div>

          </div>

          {/* Practical Specifications & Content Cards - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Tech point 1 */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800/80 hover:border-accent-green/45 transition-all">
                <div className="flex items-start space-x-3.5">
                  <div className="h-8.5 w-8.5 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green shrink-0">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-white text-sm">{content.srTitle}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 font-sans leading-relaxed">
                      {content.srDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech point 2 */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800/80 hover:border-accent-green/45 transition-all">
                <div className="flex items-start space-x-3.5">
                  <div className="h-8.5 w-8.5 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue shrink-0">
                    <Layers className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-white text-sm">{content.denoiseTitle}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 font-sans leading-relaxed">
                      {content.denoiseDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech point 3 */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800/80 hover:border-accent-green/45 transition-all">
                <div className="flex items-start space-x-3.5">
                  <div className="h-8.5 w-8.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan shrink-0">
                    <Zap className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-white text-sm">{content.interpTitle}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 font-sans leading-relaxed">
                      {content.interpDesc}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
