/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CloudLightning } from "lucide-react";
import { Language } from "../translations.ts";

interface CloudAutomationProps {
  currentLang: Language;
}

const localizedContent: Record<Language, {
  title: string;
  desc: string;
  
  // High-density technical copy
  featureHeading: string;
  featureDesc1: string;
  featureDesc2: string;
  useCasesHeading: string;
  useCase1Title: string;
  useCase1Desc: string;
  useCase2Title: string;
  useCase2Desc: string;
  useCase3Title: string;
  useCase3Desc: string;
}> = {
  en: {
    title: "Key-Ready Cloud Video Automation & Neural Voiceovers",
    desc: "Scale global broadcasting with zero production bottlenecks. We design ultra-realistic neural TTS (Text-to-Speech) pipelines and containerized media stitching microservices to render localized voices instantly.",
    featureHeading: "Enterprise-Grade Speech Orchestration",
    featureDesc1: "PIXORA replaces expensive manually recorded studio voiceovers with cognitive neural synthesis assets. Designed for heavy television networks and high-frequency streaming portals, our cloud engines offer exceptional phonetic correctness in 30+ regional dialects.",
    featureDesc2: "By integrating automated speech with custom containerized microservices, voice outputs are blended on-the-fly directly into HLS or SRT transmission containers without re-rendering videostreams. This gives a massive decrease in hardware costs and delivery latency.",
    useCasesHeading: "High-Immersive Production Use-Cases",
    useCase1Title: "Automated Broadcast Breaking News",
    useCase1Desc: "Instantly translate, synthesize, and air breaking news stories across multi-national audio streams with natural, lifelike breathing patterns.",
    useCase2Title: "Real-Time Telemetry & Sports Commentary",
    useCase2Desc: "Convert live data streams, sports scores, and telemetry feeds into clear localized voice tracks on-the-fly inside active SRT feeds.",
    useCase3Title: "Accessibility (AD/DV Integration)",
    useCase3Desc: "Automatically generate spoken descriptive audio tracks for blind and visually impaired audiences, enhancing reach and structural regulatory compliance."
  },
  ru: {
    title: "Нейро-озвучка и облачные решения",
    desc: "Масштабируемая автоматизация мирового вещания. Наш движок когнитивного звукового синтеза (Text-to-Speech) и готовые микросервисы позволяют моментально запускать многоязычные эфирные ленты.",
    featureHeading: "Синтез речи для профессиональных сетей",
    featureDesc1: "Система PIXORA заменяет традиционную дорогую запись голоса профессиональными нейросетевыми технологиями. Облачные алгоритмы настроены на высокую лингвистическую достоверность со всеми тонкостями интонации, ударений и акцентов.",
    featureDesc2: "Поток звука формируется асинхронно и вживляется в видеопоток HLS или SRT в реальном времени. Мы полностью избегаем дорогостоящего перекодирования исходного видеоряда, что в десятки раз ускоряет публикацию и минимизирует общие серверные затраты.",
    useCasesHeading: "Направления практического внедрения",
    useCase1Title: "Срочный эфирный новостной выпуск",
    useCase1Desc: "Моментальное автопрочтение текстовой ленты новостей и мгновенный перевод событий в звуковую дорожку вещательного плера.",
    useCase2Title: "Трансляция статистики и спорта",
    useCase2Desc: "Озвучивание спортивных событий, результатов матчей и телеметрии на лету. Создание индивидуального опыта под каждого зрителя.",
    useCase3Title: "Тифлокомментирование (AD/DV доступность)",
    useCase3Desc: "Генерация детального голосового описания происходящего на экране для слабовидящих людей с полным соответствием стандартам доступности."
  },
  uk: {
    title: "Нейро-озвучка та хмарні рішення",
    desc: "Сучасна автоматизація вашого мовлення. Когнітивний синтез мовлення (Text-to-Speech) та розумні медіа-мікросервіси для миттєвого створення багатомовного едіаконтенту.",
    featureHeading: "Синтез мовлення для телевізійних мереж",
    featureDesc1: "Система PIXORA пропонує відмову від класичних тривалих студійних записів на користь передового нейромережевого синтезу. Наш хмарний рушій забезпечує бездоганну фонетичну точність і зберігає природні паузи у диханні диктора.",
    featureDesc2: "Звук синтезується в хмарі та впроваджується у вихідні контейнери потоку (HLS/SRT) повністю асинхронно без повторного перекодування відео. Це кардинально знижує витрати на графічні сервери та усуває візуальні затримки передачі.",
    useCasesHeading: "Напрямки практичного впровадження",
    useCase1Title: "Авто-Озвучення Термінових Новин",
    useCase1Desc: "Миттєве перетворення текстових телетайпів та стрічок новин на звуковий супровід гарячих новин у прямому ефірі.",
    useCase2Title: "Трансляція Спортивної Статистики",
    useCase2Desc: "Озвучення спортивних результатів, прогнозів та телеметрії під час активних спортивних трансляцій у реальному часі.",
    useCase3Title: "Аудіодескрипція (AD/DV доступність)",
    useCase3Desc: "Генерація звукового супроводу з описом подій на екрані для людей з порушеннями зору відповідно до стандартів мовлення."
  }
};

export default function CloudAutomation({ currentLang }: CloudAutomationProps) {
  const content = localizedContent[currentLang] || localizedContent.en;

  return (
    <section id="cloud-automation" className="py-24 bg-slate-900 relative border-t border-slate-950 overflow-hidden">
      {/* Background glowing particles and vector lines */}
      <div className="absolute top-[15%] right-[-5%] h-96 w-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] h-96 w-96 bg-accent-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="mb-16 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-slate-400 mt-4 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
            {content.desc}
          </p>
        </div>

        {/* Content Layout - Split 50/50 for premium details and the cinematic images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Extensive Technology description formatted as a stair/ladder (лесенка) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Step 1: Feature Heading */}
            <div className="space-y-3 pl-0 border-l-2 border-accent-cyan/30 py-1 transition-all">
              <div className="inline-flex items-center space-x-2 bg-accent-cyan/10 border border-accent-cyan/20 px-3 py-1 rounded-full text-accent-cyan">
                <CloudLightning className="h-3 w-3 animate-pulse" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest">{content.featureHeading}</span>
              </div>
              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {content.featureDesc1}
              </p>
            </div>

            {/* Step 2: Feature Desc 2 (Shifted inside) */}
            <div className="space-y-3 pl-6 sm:pl-10 border-l-2 border-slate-800/80 py-1 transition-all">
              <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed font-light">
                {content.featureDesc2}
              </p>
            </div>

            {/* Use cases Title */}
            <div className="pt-4 pl-0">
              <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                {content.useCasesHeading}
              </h3>
            </div>

            {/* Use Case Step 3: Use case 1 (Shifted intermediate) */}
            <div className="pl-6 sm:pl-10 border-l-2 border-accent-cyan/25 py-1 transition-all">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start space-x-3.5 hover:border-accent-cyan/30 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-accent-cyan mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,229,255,1)]"></div>
                <div>
                  <h4 className="font-sans font-medium text-white text-xs sm:text-sm">{content.useCase1Title}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">{content.useCase1Desc}</p>
                </div>
              </div>
            </div>

            {/* Use Case Step 4: Use case 2 (Shifted deeper) */}
            <div className="pl-12 sm:pl-20 border-l-2 border-accent-emerald/25 py-1 transition-all">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start space-x-3.5 hover:border-accent-cyan/30 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-accent-emerald mt-1.5 shrink-0 shadow-[0_0_8px_rgba(46,204,113,1)]"></div>
                <div>
                  <h4 className="font-sans font-medium text-white text-xs sm:text-sm">{content.useCase2Title}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">{content.useCase2Desc}</p>
                </div>
              </div>
            </div>

            {/* Use Case Step 5: Use case 3 (Shifted deepest) */}
            <div className="pl-18 sm:pl-28 border-l-2 border-accent-blue/25 py-1 transition-all">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start space-x-3.5 hover:border-accent-cyan/30 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-accent-blue mt-1.5 shrink-0 shadow-[0_0_8px_rgba(41,128,185,1)]"></div>
                <div>
                  <h4 className="font-sans font-medium text-white text-xs sm:text-sm">{content.useCase3Title}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">{content.useCase3Desc}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic thematic collage with cinematic audio images */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] w-full flex items-center justify-center">
              {/* Dynamic background lighting for sound wave aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-transparent blur-3xl rounded-full pointer-events-none" />
              
              {/* Image 1: Sound Mixing Board Desk */}
              <div className="absolute w-[72%] aspect-[4/3] top-8 left-2 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl transition hover:border-accent-cyan/30 duration-500 z-10 select-none">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop"
                  alt="Professional audio studio recording system with audio waves in background"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-750"
                />
                <div className="absolute bottom-2 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800/80 font-mono text-[8px] text-accent-cyan uppercase tracking-wider">
                  STUDIO_CONSOLE // EQ_STATION
                </div>
              </div>

              {/* Image 2: Classic vintage studio voice capture microphone */}
              <div className="absolute w-[72%] aspect-[4/3] bottom-8 right-2 rounded-2xl border border-slate-850 bg-slate-950 overflow-hidden shadow-2xl transition hover:border-accent-cyan/30 duration-500 z-20 select-none">
                <img
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop"
                  alt="High-definition condenser voice microphone captured in dark broadcast station"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-750"
                />
                <div className="absolute bottom-2 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-850 font-mono text-[8px] text-accent-cyan uppercase tracking-wider">
                  NEURAL_SPEECH // HD_RECORD
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
