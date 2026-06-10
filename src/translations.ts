/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "en" | "ru" | "uk";

export interface TranslationSchema {
  nav: {
    hero: string;
    mastering: string;
    encoding: string;
    ai: string;
    tts: string;
    contacts: string;
    activePipelines: string;
    language: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    btnSpecs: string;
    btnMonitor: string;
    years: string;
    sla: string;
    vmaf: string;
    pipelineSteps: string;
    pipelineProcessed: string;
    logWait: string;
    logStart: string;
    logReset: string;
    btnRun: string;
    btnReset: string;
    stateLabel: string;
  };
  contactFaq: {
    faqTitle: string;
    faqSub: string;
    faqItems: { q: string; a: string }[];
    contactBadge: string;
    contactTitle: string;
    contactDesc: string;
    labelName: string;
    labelEmail: string;
    labelTask: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderTask: string;
    btnSend: string;
    btnSending: string;
    btnSent: string;
    secureTunnel: string;
    secureSigned: string;
  };
  footer: {
    protected: string;
    sla: string;
    ffmpeg: string;
  };
  panels: {
    colorMastering: string;
    encodingTitle: string;
    aiTitle: string;
    ttsTitle: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      hero: "Overview",
      mastering: "Mastering",
      encoding: "Streaming",
      ai: "AI Upscaling",
      tts: "Voice Synthesis",
      contacts: "Get in Touch",
      activePipelines: "Active Solutions",
      language: "Language",
    },
    hero: {
      badge: "",
      titleLine1: "Advanced Audio &",
      titleLine2: "Video Engineering",
      desc: "Delivering turnkey media solutions: from broadcast-grade streaming and high-fidelity color grading to neural network enhancements and automated cloud voiceovers.",
      btnSpecs: "Explore Solutions",
      btnMonitor: "Try Live Demo",
      years: "",
      sla: "",
      vmaf: "",
      pipelineSteps: "PIXORA Project Showcases",
      pipelineProcessed: "DEMO",
      logWait: "Ready-to-use platforms for broadcast, web, and TV networks.",
      logStart: "Starting interactive pipeline visualization...",
      logReset: "System initialized. Ready to launch.",
      btnRun: "RUN SHOWCASE",
      btnReset: "RESET",
      stateLabel: "MODE",
    },
    contactFaq: {
      faqTitle: "Frequently Asked Questions",
      faqSub: "Find answers regarding our deployment procedures, service level agreements, and content customization capabilities.",
      faqItems: [
        {
          q: "How does PIXORA guarantee stream reliability and continuity?",
          a: "We deploy dual-redundant backup nodes operating in real-time. If the primary connection experiences any jitter or signal drops, the delivery system instantly redirects downstreams to backup nodes with zero transmission downtime."
        },
        {
          q: "What is the timeline for custom media workflow integration?",
          a: "A standard setup spanning color space calibration, custom automated FFmpeg pipelines, and neural network configurations typically takes between 5 to 10 business days depending on client infrastructure."
        },
        {
          q: "Can templates be tailored to specific broadcast requirements?",
          a: "Yes. All our processing algorithms, automation modules, and output codecs are highly customizable to support diverse requirements ranging from local OTT services to global TV networks."
        }
      ],
      contactBadge: "DIRECT CONNECTION // PIXORA MEDIA",
      contactTitle: "Start a Conversation",
      contactDesc: "Send us your project brief or request an analysis of your current streaming and video production setup.",
      labelName: "Your Name",
      labelEmail: "Contact Email *",
      labelTask: "Project Requirements / Custom Needs *",
      placeholderName: "Sarah J.",
      placeholderEmail: "sarah@broadcasting.com",
      placeholderTask: "Briefly explain what solutions you are looking to build, e.g., standardizing broadcast pipelines, integrating neural upscalers, or setting up a zero-latency SRT stream...",
      btnSend: "SUBMIT INQUIRY",
      btnSending: "PROCESSSING...",
      btnSent: "INQUIRY SUBMITTED SUCCESSFULLY",
      secureTunnel: "SECURE ENCRYPTED CONTACT TUNNEL ACTIVED",
      secureSigned: "PIXORA SECURED",
    },
    footer: {
      protected: "ALL PLATFORMS LICENSED",
      sla: "SLA: 99.99% SERVICE GUARANTEE",
      ffmpeg: "PIXORA PIPELINE OPTIMIZED",
    },
    panels: {
      colorMastering: "Color Grading & HDR Mastering",
      encodingTitle: "Encoding & Media Transcoding Engine",
      aiTitle: "AI Upscaling & Neural Video Processing",
      ttsTitle: "Cloud Speech Synthesis (TTS) & API Integrations",
    }
  },
  ru: {
    nav: {
      hero: "Главная",
      mastering: "Мастеринг",
      encoding: "Вещание",
      ai: "AI Апскейлинг",
      tts: "Синтез речи",
      contacts: "Контакты",
      activePipelines: "Готовые решения",
      language: "Язык",
    },
    hero: {
      badge: "",
      titleLine1: "Продвинутый аудио-",
      titleLine2: "и видеоинжиниринг",
      desc: "Создание готовых медиарешений под ключ: от безупречного вещания и высокоточной калибровки цвета до интеллектуального апскейла и облачной озвучки.",
      btnSpecs: "Посмотреть решения",
      btnMonitor: "Попробовать демо",
      years: "",
      sla: "",
      vmaf: "",
      pipelineSteps: "Презентация решений PIXORA",
      pipelineProcessed: "ДЕМО",
      logWait: "Готовые решения для ТВ, стриминга и продакшена.",
      logStart: "Запуск демонстрации возможностей...",
      logReset: "Готово к запуску.",
      btnRun: "СТАРТ ДЕМО",
      btnReset: "СБРОС",
      stateLabel: "РЕЖИМ",
    },
    contactFaq: {
      faqTitle: "Часто задаваемые вопросы",
      faqSub: "Полезная информация о развертывании решений, гарантиях надежности и адаптации под ваши стандарты.",
      faqItems: [
        {
          q: "Как гарантируется стабильность трансляций и бесперебойность вещания?",
          a: "За счет автоматического переключения на резервный вещательный узел в реальном времени. Если основная линия испытывает задержки или потери пакетов, зрители мгновенно переключаются на резервный поток без прерывания показа."
        },
        {
          q: "Каковы средние сроки настройки и интеграции готовых решений?",
          a: "Интеграция индивидуальных пайплайнов калибровки цвета, автоматического кодирования и нейросетевых фильтров под ключ обычно занимает от 5 до 10 рабочих дней в зависимости от сложности задач."
        },
        {
          q: "Можно ли адаптировать алгоритмы под специфические требования студии?",
          a: "Да. Все наши скрипты обработки, кодировщики и нейросетевые модели легко настраиваются под любые форматы вещания — от небольших интернет-стримов до крупных телевизионных сетей."
        }
      ],
      contactBadge: "ОБРАТНАЯ СВЯЗЬ // PIXORA MEDIA",
      contactTitle: "Начать сотрудничество",
      contactDesc: "Отправьте требования к вашему проекту или запрос на аудит существующей медиа-инфраструктуры.",
      labelName: "Ваше имя / Компания",
      labelEmail: "Контактный Email *",
      labelTask: "Технические требования / Ваша задача *",
      placeholderName: "Алексей К.",
      placeholderEmail: "alex@broadcasting.com",
      placeholderTask: "Опишите вашу задачу, например: Нам требуется настроить систему трансляции сверхнизкой задержки, провести калибровку цвета под HDR или внедрить ИИ-апскейлинг старых архивов...",
      btnSend: "ОТПРАВИТЬ ЗАПРОС",
      btnSending: "ОТПРАВКА...",
      btnSent: "ЗАЯВКА ОТПРАВЛЕНА УСПЕШНО",
      secureTunnel: "ЗАЩИЩЕННЫЙ КАНАЛ СВЯЗИ АКТИВЕН",
      secureSigned: "PIXORA SECURED",
    },
    footer: {
      protected: "ВСЕ ПЛАТФОРМЫ СЕРТИФИЦИРОВАНЫ",
      sla: "SLA: 99.99% ГАРАНТИЯ НАДЕЖНОСТИ",
      ffmpeg: "ПАЙПЛАЙН PIXORA ОПТИМИЗИРОВАН",
    },
    panels: {
      colorMastering: "Цветокоррекция и HDR Мастеринг",
      encodingTitle: "Кодирование и Медиа Транскодирование",
      aiTitle: "AI Апскейлинг и Обработка Видео",
      ttsTitle: "Облачный Синтез Речи (TTS) и API Интеграция",
    }
  },
  uk: {
    nav: {
      hero: "Головна",
      mastering: "Мастерінг",
      encoding: "Мовлення",
      ai: "AI Апскейлінг",
      tts: "Синтез мовлення",
      contacts: "Контакти",
      activePipelines: "Готові рішення",
      language: "Мова",
    },
    hero: {
      badge: "",
      titleLine1: "Передовий аудіо-",
      titleLine2: "та відеоінжиніринг",
      desc: "Створення готових медіарішень під ключ: від бездоганного вещания та високоточного калібрування кольору до інтелектуального апскейлу та хмарної озвучки.",
      btnSpecs: "Переглянути рішення",
      btnMonitor: "Спробувати демо",
      years: "",
      sla: "",
      vmaf: "",
      pipelineSteps: "Презентация рішень PIXORA",
      pipelineProcessed: "ДЕМО",
      logWait: "Готові рішення для ТБ, стрімінгу та продакшну.",
      logStart: "Запуск інтерактивної демонстрації рішень...",
      logReset: "Готово до запуску.",
      btnRun: "СТАРТ ДЕМО",
      btnReset: "СКИДАННЯ",
      stateLabel: "РЕЖИМ",
    },
    contactFaq: {
      faqTitle: "Часті запитання",
      faqSub: "Корисна інформація щодо впровадження рішень, гарантій надійності та адаптації під ваші стандарти.",
      faqItems: [
        {
          q: "Як гарантується стабільність трансляцій та безперебійність мовлення?",
          a: "Завдяки автоматичному переключенню на резервний мовний узел у реальному часі. Якщо основна лінія має затримки чи втрати пакетів, глядачі миттєво переходять на резервний потік без переривання показу."
        },
        {
          q: "Які середні терміни налаштування та інтеграції готових рішень?",
          a: "Інтеграція індивідуальних пайплайнів калібрування кольору, автоматичного кодування та нейромережевих фільтрів під ключ зазвичай займає від 5 до 10 робочих днів залежно від складності завдань."
        },
        {
          q: "Чи можна адаптувати алгоритми під специфічні вимоги студії?",
          a: "Да. Всі наші скрипти обробки, кодувальники та нейромережеві моделі легко налаштовуються під будь-які формати мовлення — від невеликих інтернет-стрімів до великих телевізійних мереж."
        }
      ],
      contactBadge: "ЗВОРОТНІЙ ЗВ'ЯЗОК // PIXORA MEDIA",
      contactTitle: "Почати співпрацю",
      contactDesc: "Надішліть вимоги до вашого проекту або запит на повний технічний аудит медіа-інфраструктури.",
      labelName: "Ваше ім'я / Компанія",
      labelEmail: "Контактний Email *",
      labelTask: "Технічні вимоги / Ваша задача *",
      placeholderName: "Олексій К.",
      placeholderEmail: "alex@broadcasting.com",
      placeholderTask: "Опишіть ваше завдання, наприклад: Нам потрібно налаштувати систему трансляції наднизької задержки, провести калібрування кольору під HDR або впровадити ІІ-апскейлінг старих архівів...",
      btnSend: "НАДІСЛАТИ ЗАПИТ",
      btnSending: "ВІДПРАВКА...",
      btnSent: "ЗАЯВКУ НАДІСЛАНО УСПІШНО",
      secureTunnel: "ЗАХИЩЕНИЙ КАНАЛ ЗВ'ЯЗКУ АКТИВНИЙ",
      secureSigned: "PIXORA SECURED",
    },
    footer: {
      protected: "УСІ ПЛАТФОРМИ СЕРТИФІКОВАНІ",
      sla: "SLA: 99.99% ГАРАНТІЯ НАДІЙНОСТІ",
      ffmpeg: "ПАЙПЛАЙН PIXORA ОПТИМІЗОВАНИЙ",
    },
    panels: {
      colorMastering: "Кольорокорекція та HDR Мастерінг",
      encodingTitle: "Кодування та Медіа Транскодування",
      aiTitle: "AI Апскейлінг та Обробка Відео",
      ttsTitle: "Хмарний Синтез Мовлення (TTS) та API Інтеграція",
    }
  },
};
