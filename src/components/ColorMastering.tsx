/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sliders, RefreshCw, Layers, Sun, Sparkles } from "lucide-react";
import { Language } from "../translations.ts";

interface ColorMasteringProps {
  currentLang: Language;
}

const contentLocal: Record<Language, {
  title: string;
  desc: string;
  cards: { title: string; desc: string; icon: any }[];
  previewLabel: string;
  resetBtn: string;
  exposureLabel: string;
  contrastLabel: string;
  lutLabel: string;
  gamutLabel: string;
  lutLog: string;
  lutBypass: string;
  appliedMsg: string;
  logMsg: string;
}> = {
  en: {
    title: "Color Grading & Mastering",
    desc: "Professional calibration and color space conversion. We deliver pixel-perfect media setups with optimized dynamic range ready for web, cinema, and broadcast platforms.",
    cards: [
      { title: "HDR10 & HDR10+ Signal Conversion", desc: "Coordinating video streams into vibrant High Dynamic Range profiles with perfect highlight and shadow details.", icon: Sun },
      { title: "Smart Dolby Vision Integration", desc: "Automating metadata alignment to provide flawless adaptive rendering on state-of-the-art HDR consumer displays.", icon: Layers },
      { title: "System Calibration & 3D LUTs", desc: "Creating and calibrating custom lookup tables (LUTs) for standardized broadcast monitoring workflows.", icon: Sliders }
    ],
    previewLabel: "Active Grading Workspace",
    resetBtn: "RESET CONTROLS",
    exposureLabel: "Exposure",
    contrastLabel: "Contrast",
    lutLabel: "Calibration LUT Profile",
    gamutLabel: "Target Color Gamut",
    lutLog: "LOG (Raw No-Color)",
    lutBypass: "No Calibration (LOG)",
    appliedMsg: "LUT Applied: Tone mapping coordinates successfully optimized.",
    logMsg: "LOG profile active: Raw un-graded source with low-contrast profile.",
  },
  ru: {
    title: "Цветокоррекция и мастеринг",
    desc: "Профессиональная калибровка и преобразование цветовых профилей. Мы обеспечиваем безупречное качество картинки и подготовку медиафайлов под любые стандарты вещания.",
    cards: [
      { title: "Конвертация в HDR10 / HDR10+", desc: "Преобразование видеосигнала в широкий динамический диапазон с сохранением деталей в тенях и на ярких участках.", icon: Sun },
      { title: "Интеграция Dolby Vision", desc: "Автоматическое создание динамических метаданных для идеального показа на современных экранах.", icon: Layers },
      { title: "Прецизионные 3D LUT-таблицы", desc: "Настройка и калибровка файлов лутов (LUT) для обеспечения единого стандарта цвета на всех этапах вещания.", icon: Sliders }
    ],
    previewLabel: "Активный видеомонитор",
    resetBtn: "СБРОСИТЬ",
    exposureLabel: "Экспозиция",
    contrastLabel: "Контрастность",
    lutLabel: "Калибровочный профиль LUT",
    gamutLabel: "Целевой цветовой охват",
    lutLog: "LOG (Исходный серый)",
    lutBypass: "Без калибровки (LOG)",
    appliedMsg: "LUT применен: параметры Tone Mapping успешно оптимизированы.",
    logMsg: "Активен профиль LOG: Исходный блеклый кадр, требуется наложение LUT.",
  },
  uk: {
    title: "Кольорокорекція та мастеринг",
    desc: "Професійне калібрування та перетворення колірних просторів. Ми забезпечуємо бездоганну якість зображення та адаптацію медіафайлів під сучасні стандарти ТБ і мереж.",
    cards: [
      { title: "Конвертація в HDR10 / HDR10+", desc: "Перетворення відеопотоків у розширений динамічний діапазон із повним збереженням деталей у тінях та світлі.", icon: Sun },
      { title: "Інтеграція Dolby Vision", desc: "Автоматична генерація динамічних метаданих для максимально адаптивного показу на HDR дисплеях.", icon: Layers },
      { title: "Прецизійні 3D LUT-таблиці", desc: "Розробка та калібрування таблиць лутів (LUT) для збереження єдності кольору на всіх пристроях.", icon: Sliders }
    ],
    previewLabel: "Активний відеомонітор",
    resetBtn: "СКИДАННЯ",
    exposureLabel: "Експозиція",
    contrastLabel: "Контрастність",
    lutLabel: "Калібрувальний профіль LUT",
    gamutLabel: "Цільове колірне охоплення",
    lutLog: "LOG (Початковий сірий)",
    lutBypass: "Без калібрування (LOG)",
    appliedMsg: "LUT застосовано: параметри Tone Mapping повністю оптимізовано.",
    logMsg: "Активний профіль LOG: Вихідний бляклий кадр, потрібне накладання LUT.",
  }
};

export default function ColorMastering({ currentLang }: ColorMasteringProps) {
  const content = contentLocal[currentLang] || contentLocal.en;

  const [gamut, setGamut] = useState<"rec709" | "dcip3" | "rec2020">("rec2020");
  const [exposure, setExposure] = useState<number>(0); // -100 to 100
  const [contrast, setContrast] = useState<number>(20); // -100 to 100
  const [lutType, setLutType] = useState<"none" | "rec709" | "hdr10" | "dolby">("dolby");

  const resetGrading = () => {
    setGamut("rec2020");
    setExposure(0);
    setContrast(20);
    setLutType("dolby");
  };

  // Convert settings into CSS Filters for interactive master image simulation
  const getFilterStyle = () => {
    if (lutType === "none") {
      // Washed out Log look: low contrast, extremely low saturation, raised exposure slightly
      return {
        filter: "contrast(55%) saturate(30%) brightness(115%)",
        colorSpaceStyle: "border-slate-800"
      };
    }

    // Graded masters
    let sat = 100;
    let expModifier = 100 + exposure * 0.4;
    let cntModifier = 100 + contrast * 0.5;

    if (gamut === "rec709") {
      sat = 100; // standard sRGB color
    } else if (gamut === "dcip3") {
      sat = 125; // wide cinematic color
    } else if (gamut === "rec2020") {
      sat = 145; // ultra-wide vivid HDR color
    }

    return {
      filter: `contrast(${cntModifier}%) saturate(${sat}%) brightness(${expModifier}%)`,
      colorSpaceStyle: gamut === "rec2020" ? "border-accent-amber" : "border-accent-blue"
    };
  };

  const imageFilter = getFilterStyle();

  return (
    <section id="color-mastering" className="py-20 bg-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e2230,transparent_55%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-10 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-slate-400 mt-3 font-sans text-sm sm:text-base leading-relaxed">
            {content.desc}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Technical Info Column - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {content.cards.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800/60 hover:border-accent-amber/40 transition-all">
                    <div className="flex items-start space-x-3.5">
                      <div className="h-8.5 w-8.5 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber shrink-0">
                        <CardIcon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h3 className="font-sans font-medium text-white text-sm">
                          {card.title}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1.5 font-sans leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro Live Signal State */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/40 font-mono text-[10px] space-y-2">
              <div className="pb-1.5 border-b border-slate-900 text-slate-400 flex justify-between items-center">
                <span className="uppercase text-[9px] tracking-wider text-slate-500 font-semibold">SIGNAL SPECS // AUTO</span>
                <span className="text-accent-amber font-semibold">REC.2020 MASTER</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-400">
                <div>Gamuts: <span className="text-slate-200">{gamut.toUpperCase()}</span></div>
                <div>Luminance peak: <span className="text-slate-200">{gamut === "rec2020" ? "1000 Nits" : gamut === "dcip3" ? "400 Nits" : "100 Nits"}</span></div>
              </div>
            </div>
          </div>

          {/* Clean Interactive Workspace Monitor - 7 cols */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl">
            
            {/* Monitor Header */}
            <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center">
              <span className="font-mono text-[9px] text-slate-300 font-bold tracking-widest uppercase">
                {content.previewLabel}
              </span>
              <button
                onClick={resetGrading}
                className="font-mono text-[9px] text-slate-500 hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
                aria-label="Reset grading controls to default"
              >
                <RefreshCw className="h-2.5 w-2.5" />
                <span>{content.resetBtn}</span>
              </button>
            </div>

            {/* Video Preview and info panel */}
            <div className="p-4 flex-1 flex flex-col space-y-3">
              
              {/* Media Preview viewport */}
              <div className="relative aspect-video rounded-xl border border-slate-800 bg-slate-900 overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                  style={{
                    backgroundImage: "url('/images/pixora_ai_grading_1780667152558.png')",
                    ...imageFilter
                  }}
                />
                
                {/* Subtle dark overlay at top/bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid details */}
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 border border-slate-800">
                  LUT: {lutType.toUpperCase()}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 border border-slate-800">
                  {gamut === "rec2020" ? "Rec.2020 Ultra HDR" : gamut === "dcip3" ? "DCI-P3 Cinema" : "Rec.709 Standard"}
                </div>
              </div>

              {/* Status info bar */}
              <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40 flex items-center space-x-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-accent-amber animate-pulse shrink-0"></span>
                <span className="font-mono text-[9px] text-slate-400">
                  {lutType === "none" ? content.logMsg : content.appliedMsg}
                </span>
              </div>
            </div>

            {/* Slider Interfaces & Selectors */}
            <div className="p-4 bg-slate-900/40 border-t border-slate-800/70 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* LUT Type Profiles */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-400 block uppercase font-bold tracking-wider">{content.lutLabel}</label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: "none", label: "LOG" },
                      { id: "rec709", label: "BT.709" },
                      { id: "hdr10", label: "HDR10" },
                      { id: "dolby", label: "DolbyV" }
                    ].map((lut) => (
                      <button
                        key={lut.id}
                        onClick={() => {
                          setLutType(lut.id as any);
                          if (lut.id === "none") {
                            // Leave gamut
                          } else if (lut.id === "rec709") {
                            setGamut("rec709");
                          } else if (lut.id === "hdr10" || lut.id === "dolby") {
                            setGamut("rec2020");
                          }
                        }}
                        className={`py-1 text-[9px] font-mono font-bold rounded cursor-pointer transition-all border ${
                          lutType === lut.id
                            ? "bg-accent-amber/15 border-accent-amber/60 text-accent-amber"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {lut.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Gamut Profiles */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-slate-400 block uppercase font-bold tracking-wider">{content.gamutLabel}</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: "rec709", label: "Rec.709" },
                      { id: "dcip3", label: "DCI-P3" },
                      { id: "rec2020", label: "Rec.2020" }
                    ].map((g) => (
                      <button
                        key={g.id}
                        disabled={lutType === "none"}
                        onClick={() => setGamut(g.id as any)}
                        className={`py-1 text-[9px] font-mono font-bold rounded transition-all border ${
                          lutType === "none"
                            ? "bg-slate-950 border-slate-900/60 text-slate-700 cursor-not-allowed"
                            : gamut === g.id
                            ? "bg-accent-blue/15 border-accent-blue/60 text-accent-blue"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Adjustive sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                
                {/* Exposure control */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-slate-400 uppercase">{content.exposureLabel}</span>
                    <span className="font-bold text-white">{exposure > 0 ? `+${exposure}` : exposure}</span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    value={exposure}
                    onChange={(e) => setExposure(parseInt(e.target.value))}
                    className="w-full accent-accent-amber bg-slate-950 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Contrast control */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-slate-400 uppercase">{content.contrastLabel}</span>
                    <span className="font-bold text-white">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="60"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-accent-blue bg-slate-950 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
