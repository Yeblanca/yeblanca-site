/**
 * yeblanca.com — Payload CMS Seed Script
 *
 * Run:  pnpm seed
 * Or:   tsx --require ./scripts/patch-next-env.cjs scripts/seed.ts
 *
 * Seeds: Projects, Services, Testimonials (placeholder), SiteSettings global
 *
 * Notes:
 * - Uses old slugs for projects that existed in the previous seed to avoid
 *   creating duplicate entries in the database (colonial-crm, candy-store,
 *   radia-landing, ofisenas keep their original slugs).
 * - Rich-text fields use Lexical JSON format (toRichText helper).
 */

import { getPayload } from 'payload'
import config from '../payload.config'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Converts a plain string into Payload CMS Lexical rich-text JSON.
 * Allows seeding descriptions without manually crafting Lexical ASTs.
 */
function toRichText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text,
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
    },
  }
}

/**
 * Converts a multi-line string (with \n) into a Lexical rich-text block where
 * each line becomes its own paragraph. Preserves blank lines as empty paragraphs.
 */
function toRichTextBlock(text: string) {
  const lines = text.split('\n')
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: lines.map((line) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: line
          ? [
              {
                mode: 'normal',
                text: line,
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ]
          : [],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      })),
      direction: 'ltr',
    },
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

type ServiceType = 'web' | 'ecommerce' | 'system' | 'consulting' | 'other'
type ProjectStatus = 'live' | 'archived' | 'wip'

interface ProjectSeed {
  slug: string
  titleEn: string
  titleEs: string
  taglineEn: string
  taglineEs: string
  descriptionEn: ReturnType<typeof toRichTextBlock>
  descriptionEs: ReturnType<typeof toRichTextBlock>
  year: number
  client: string
  serviceType: ServiceType
  stack: { tech: string }[]
  featured: boolean
  status: ProjectStatus
  liveUrl?: string
  complexity: number
}

interface ServiceSeed {
  slug: string
  titleEn: string
  titleEs: string
  descriptionEn: ReturnType<typeof toRichText>
  descriptionEs: ReturnType<typeof toRichText>
  icon: string
  featuresEn: { feature: string }[]
  featuresEs: { feature: string }[]
  startingPrice?: number
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects: ProjectSeed[] = [
  // ── Tier 1: Featured (high complexity) ──────────────────────────────────────

  {
    slug: 'colonial-crm',
    titleEn: 'Colonial Iron Doors — CRM/ERP',
    titleEs: 'Colonial Iron Doors — CRM/ERP',
    taglineEn: 'End-to-end operations system for a U.S. steel door manufacturer',
    taglineEs: 'Sistema operativo completo para un fabricante de puertas de acero en EE.UU.',
    descriptionEn: toRichTextBlock(
      `A comprehensive CRM/ERP built from the ground up for Colonial Iron Doors LLC, a U.S.-based steel door manufacturer serving markets across Texas (ATX, WTX, STX, DTX, HTX). The system replaced a fragmented spreadsheet workflow and entered full production migration on April 1, 2026.

Key modules: lead management with Meta CAPI conversion tracking, sales pipeline (opportunities with product estimation), project lifecycle from approval through installation scheduling, payment milestones, multi-project shipment tracking, QuickBooks integration, crew capacity management, scheduling optimizer, push notifications, and an analytics dashboard with KPI widgets.

Built with a 7-role permission system (admin, production_manager, KAM, sales_manager, planning_coordinator, installer, lead_tracker), offline-first PWA capabilities with IndexedDB caching, and a design system audit across 20+ components.`
    ),
    descriptionEs: toRichTextBlock(
      `CRM/ERP construido desde cero para Colonial Iron Doors LLC, fabricante estadounidense de puertas de acero con operaciones en Texas (ATX, WTX, STX, DTX, HTX). El sistema reemplazó flujos de trabajo fragmentados en hojas de cálculo y entró en migración completa a producción el 1 de abril de 2026.

Módulos principales: gestión de leads con Meta CAPI, pipeline de ventas con estimación de productos, ciclo de vida de proyectos desde aprobación hasta programación de instalación, hitos de pago, seguimiento de embarques multi-proyecto, integración con QuickBooks, gestión de capacidad de cuadrillas, optimizador de agenda, notificaciones push y dashboard analítico con KPIs.

Construido con sistema de permisos de 7 roles, capacidades PWA offline-first con IndexedDB, y auditoría de design system en más de 20 componentes.`
    ),
    year: 2025,
    client: 'Colonial Iron Doors LLC',
    serviceType: 'system',
    stack: [
      { tech: 'Next.js 16' },
      { tech: 'TypeScript' },
      { tech: 'Supabase' },
      { tech: 'PostgreSQL' },
      { tech: 'Zustand' },
      { tech: 'Payload CMS' },
      { tech: 'QuickBooks API' },
      { tech: 'Tailwind CSS v4' },
      { tech: 'Radix UI' },
      { tech: 'Resend' },
      { tech: 'Recharts' },
      { tech: 'dnd-kit' },
      { tech: 'Vercel' },
    ],
    featured: true,
    status: 'live',
    complexity: 10,
  },

  {
    slug: 'talent-insight-wizeline',
    titleEn: 'TalentInsight — Assessment Platform',
    titleEs: 'TalentInsight — Plataforma de Evaluación',
    taglineEn: 'Internal technical assessment & analytics platform for a global tech company',
    taglineEs: 'Plataforma interna de evaluación técnica y analítica para empresa tecnológica global',
    descriptionEn: toRichTextBlock(
      `Led front-end development of TalentInsight at Wizeline — an internal platform for technical assessment, interview coordination, and candidate analytics. Evolved from prototype to production-ready system used across the company.

Implemented authentication and authorization with Auth0, optimized data models with Prisma, and built key UI components with React, TypeScript, Ant Design, and GraphQL. Redesigned Prisma schemas and optimized GraphQL queries, reducing assessment processing time from days to minutes.

Also mentored engineers in React best practices and designed/facilitated bootcamps including Redux training and Tecnolochicas Pro.`
    ),
    descriptionEs: toRichTextBlock(
      `Lideré el desarrollo front-end de TalentInsight en Wizeline — plataforma interna para evaluación técnica, coordinación de entrevistas y analítica de candidatos. Evolucionó de prototipo a sistema en producción utilizado en toda la empresa.

Implementé autenticación con Auth0, optimicé modelos de datos con Prisma y construí componentes clave con React, TypeScript, Ant Design y GraphQL. Rediseñé esquemas de Prisma y optimicé queries GraphQL, reduciendo el tiempo de procesamiento de evaluaciones de días a minutos.`
    ),
    year: 2023,
    client: 'Wizeline',
    serviceType: 'system',
    stack: [
      { tech: 'React' },
      { tech: 'TypeScript' },
      { tech: 'GraphQL' },
      { tech: 'Ant Design' },
      { tech: 'PostgreSQL' },
      { tech: 'Prisma' },
      { tech: 'Auth0' },
      { tech: 'Node.js' },
    ],
    featured: true,
    status: 'archived',
    complexity: 10,
  },

  {
    slug: 'vlood-plus',
    titleEn: 'Vlood+ — Blood Donation PWA',
    titleEs: 'Vlood+ — PWA de Donación de Sangre',
    taglineEn: 'Progressive web app connecting blood donors with urgent requests by blood type',
    taglineEs: 'Aplicación web progresiva que conecta donadores con solicitudes urgentes por tipo de sangre',
    descriptionEn: toRichTextBlock(
      `A Progressive Web Application built for Rotaract Club Emprendedor Poniente to streamline the blood donation process in Piedras Negras, Coahuila.

Features: donor registration with blood type, real-time push notifications for matching donation requests, beneficiary and applicant management, request coordination with hospitals, and a secure login module with JWT.

Built an interactive dashboard with React and Material UI, a RESTful API with Node.js and Express, and a scalable MySQL database. Deployed functional demo on Vercel.`
    ),
    descriptionEs: toRichTextBlock(
      `Aplicación web progresiva desarrollada para el Club Rotaract Emprendedor Poniente para optimizar el proceso de donación de sangre en Piedras Negras, Coahuila.

Funcionalidades: registro de donadores por tipo de sangre, notificaciones push en tiempo real, gestión de beneficiarios y solicitantes, coordinación con hospitales y módulo de login seguro con JWT.

Tablero interactivo con React y Material UI, API RESTful con Node.js y Express, base de datos MySQL escalable. Demo funcional desplegada en Vercel.`
    ),
    year: 2020,
    client: 'Rotaract Club Emprendedor Poniente',
    serviceType: 'system',
    stack: [
      { tech: 'React' },
      { tech: 'Material UI' },
      { tech: 'Node.js' },
      { tech: 'Express' },
      { tech: 'MySQL' },
      { tech: 'JWT' },
      { tech: 'Vercel' },
    ],
    featured: true,
    status: 'archived',
    complexity: 8,
  },

  {
    slug: 'covid-management-bxp',
    titleEn: 'COVID-19 Test Management System',
    titleEs: 'Sistema de Gestión COVID-19',
    taglineEn: 'Appointment booking and test results platform used during the pandemic',
    taglineEs: 'Plataforma de citas y resultados de pruebas utilizada durante la pandemia',
    descriptionEn: toRichTextBlock(
      `A web system developed at BXP Tech enabling local citizens in Piedras Negras to schedule COVID-19 test appointments and track potential infection via contact tracing.

Built a RESTful API to manage appointments with CodeIgniter (PHP), a Bootstrap dashboard for test results upload and appointment management, and deployed to Ubuntu VPS with Apache.`
    ),
    descriptionEs: toRichTextBlock(
      `Sistema web desarrollado en BXP Tech que permitió a ciudadanos de Piedras Negras agendar citas para pruebas COVID-19 y rastrear posibles contagios por contacto cercano.

API RESTful para gestión de citas con CodeIgniter (PHP), dashboard con Bootstrap para carga de resultados y gestión de citas, desplegado en VPS Ubuntu con Apache.`
    ),
    year: 2020,
    client: 'BXP Tech',
    serviceType: 'system',
    stack: [
      { tech: 'PHP' },
      { tech: 'CodeIgniter' },
      { tech: 'MySQL' },
      { tech: 'Bootstrap' },
      { tech: 'Apache' },
      { tech: 'Ubuntu VPS' },
    ],
    featured: false,
    status: 'archived',
    complexity: 7,
  },

  {
    slug: 'constellation-lynx',
    titleEn: 'Constellation Lynx — Production Reporting ERP',
    titleEs: 'Constellation Lynx — ERP de Reportes de Producción',
    taglineEn: 'Reduced production report generation from 2 days to minutes for a global beverage company',
    taglineEs: 'Redujo la generación de reportes de producción de 2 días a minutos para empresa global',
    descriptionEn: toRichTextBlock(
      `Designed and developed a web application at Constellation Brands that automated production data processing and reporting. The system reduced time from raw data to synthesized executive reports from 2 days to a matter of minutes.

Built data input and processing modules using PHP with MVC architecture, MySQL for data persistence, and Chart.js for a control chart module with real-time quality control anomaly detection. Presented to upper management, validating the business case for digital transformation.`
    ),
    descriptionEs: toRichTextBlock(
      `Diseñé y desarrollé una aplicación web en Constellation Brands que automatizó el procesamiento de datos de producción y la generación de reportes. El sistema redujo el tiempo de datos brutos a reportes ejecutivos de 2 días a minutos.

Módulos de captura y procesamiento con PHP y arquitectura MVC, MySQL para persistencia, y Chart.js para un módulo de cartas de control con detección de anomalías en tiempo real. Presentado a dirección corporativa.`
    ),
    year: 2019,
    client: 'Constellation Brands',
    serviceType: 'system',
    stack: [
      { tech: 'PHP' },
      { tech: 'MySQL' },
      { tech: 'Chart.js' },
      { tech: 'Bootstrap' },
      { tech: 'HTML' },
      { tech: 'CSS' },
      { tech: 'XAMPP' },
    ],
    featured: false,
    status: 'archived',
    complexity: 9,
  },

  // ── Tier 2: Web & E-commerce ────────────────────────────────────────────────

  {
    slug: 'candy-store',
    titleEn: 'Candy Store — E-commerce Platform',
    titleEs: 'Candy Store — Plataforma de E-commerce',
    taglineEn: 'Full-stack e-commerce with Stripe payments, logistics integration, and instant search',
    taglineEs: 'E-commerce full-stack con pagos Stripe, integración logística y búsqueda instantánea',
    descriptionEn: toRichTextBlock(
      `A full-stack e-commerce platform built for a candy retailer using MedusaJS as the commerce engine. Integrated Stripe for payments, SoloEnvíos for logistics, Cloudinary for media management, and Meilisearch for instant product search.

Built on Next.js with PostgreSQL as the primary database, ensuring a smooth and performant customer experience from product discovery to checkout and fulfillment.`
    ),
    descriptionEs: toRichTextBlock(
      `Plataforma e-commerce completa construida para una tienda de dulces usando MedusaJS como motor de comercio. Integración de Stripe para pagos, SoloEnvíos para logística, Cloudinary para medios y Meilisearch para búsqueda instantánea de productos.

Construida con Next.js y PostgreSQL, asegurando una experiencia de compra fluida desde el descubrimiento del producto hasta el pago y envío.`
    ),
    year: 2024,
    client: 'Yeblanca client',
    serviceType: 'ecommerce',
    stack: [
      { tech: 'MedusaJS' },
      { tech: 'Next.js' },
      { tech: 'PostgreSQL' },
      { tech: 'Stripe' },
      { tech: 'Meilisearch' },
      { tech: 'Cloudinary' },
      { tech: 'TypeScript' },
    ],
    featured: true,
    status: 'wip',
    complexity: 8,
  },

  {
    slug: 'radia-landing',
    titleEn: 'Radia — AI Customs Automation',
    titleEs: 'Radia — Automatización Aduanera con IA',
    taglineEn: 'Multilingual landing and HS tariff classification API for an AI customs startup',
    taglineEs: 'Landing multilingüe y API de clasificación arancelaria HS para startup de IA aduanera',
    descriptionEn: toRichTextBlock(
      `Contributed to Radia, an AI-driven customs automation startup, by building two core deliverables: a multilingual marketing landing page and an HS tariff classification API.

The landing page was built with Next.js, TailwindCSS, and Resend for lead capture. The classification API was built with Node.js, TypeScript, Express, and Docker — featuring a step-based flow engine (p1–p6) with Swagger documentation for tariff classification workflows.`
    ),
    descriptionEs: toRichTextBlock(
      `Contribuí a Radia, startup de automatización aduanera con IA, construyendo dos entregables principales: una landing page multilingüe y una API de clasificación arancelaria HS.

La landing fue construida con Next.js, TailwindCSS y Resend para captura de leads. La API de clasificación con Node.js, TypeScript, Express y Docker — con motor de flujo por pasos (p1–p6) y documentación Swagger.`
    ),
    year: 2024,
    client: 'Radia',
    serviceType: 'web',
    stack: [
      { tech: 'Next.js' },
      { tech: 'TypeScript' },
      { tech: 'Node.js' },
      { tech: 'Express' },
      { tech: 'Docker' },
      { tech: 'TailwindCSS' },
      { tech: 'Resend' },
      { tech: 'Swagger' },
    ],
    featured: false,
    status: 'archived',
    complexity: 6,
  },

  {
    slug: 'ofisenas',
    titleEn: 'Ofiseñas — Sign Language LMS',
    titleEs: 'Ofiseñas — LMS en Lengua de Señas',
    taglineEn: 'Web platform teaching office software to hearing-impaired users in Mexican Sign Language',
    taglineEs: 'Plataforma web para enseñar software de oficina a personas con discapacidad auditiva en LSM',
    descriptionEn: toRichTextBlock(
      `Pioneered a web platform specifically designed for individuals with hearing impairments to learn office suite software through tutorials in Mexican Sign Language (LSM).

Led team management and curriculum design, collaborated with qualified experts to create specialized technical sign vocabulary, and presented the project at regional innovation contests and incubators. Built with HTML, CSS, and PHP.`
    ),
    descriptionEs: toRichTextBlock(
      `Plataforma web diseñada para que personas con discapacidad auditiva aprendan software de oficina a través de tutoriales en Lengua de Señas Mexicana (LSM).

Lideré la gestión del equipo y diseño curricular, colaboré con expertos para crear vocabulario técnico especializado en señas, y presenté el proyecto en concursos de innovación e incubadoras regionales.`
    ),
    year: 2019,
    client: 'UTNC',
    serviceType: 'web',
    stack: [
      { tech: 'HTML' },
      { tech: 'CSS' },
      { tech: 'PHP' },
      { tech: 'MySQL' },
      { tech: 'XAMPP' },
    ],
    featured: false,
    status: 'archived',
    complexity: 5,
  },

  {
    slug: 'bxp-gym-system',
    titleEn: 'Gym Management System',
    titleEs: 'Sistema de Gestión de Gimnasio',
    taglineEn: 'Full-featured gym management with memberships, trainers, schedules, and payments',
    taglineEs: 'Gestión completa de gimnasio: membresías, entrenadores, horarios y pagos',
    descriptionEn: toRichTextBlock(
      `A comprehensive gym management system developed at BXP Tech covering all core operational modules: customer registration, trainer management, class schedules, payment tracking, and subscription management.

Built with CodeIgniter and MySQL, deployed on Ubuntu VPS.`
    ),
    descriptionEs: toRichTextBlock(
      `Sistema completo de gestión de gimnasio desarrollado en BXP Tech que cubre todos los módulos operativos: registro de clientes, gestión de entrenadores, horarios de clases, seguimiento de pagos y gestión de suscripciones.

Construido con CodeIgniter y MySQL, desplegado en VPS Ubuntu.`
    ),
    year: 2020,
    client: 'BXP Tech',
    serviceType: 'system',
    stack: [
      { tech: 'PHP' },
      { tech: 'CodeIgniter' },
      { tech: 'MySQL' },
      { tech: 'Bootstrap' },
      { tech: 'Apache' },
    ],
    featured: false,
    status: 'archived',
    complexity: 7,
  },

  {
    slug: 'treon-bubbles',
    titleEn: 'TreonBubbles — Reservations POS',
    titleEs: 'TreonBubbles — POS con Reservaciones',
    taglineEn: 'Landing page and admin system with PayPal reservation integration',
    taglineEs: 'Landing page y sistema admin con integración de reservaciones PayPal',
    descriptionEn: toRichText(
      'Point-of-sale and reservation system with a public-facing landing page and an admin panel for managing reservations and payments via PayPal integration. Built with PHP, MySQL, and JavaScript.'
    ),
    descriptionEs: toRichText(
      'Sistema de punto de venta y reservaciones con landing page pública y panel administrativo para gestión de reservas y pagos vía PayPal. Construido con PHP, MySQL y JavaScript.'
    ),
    year: 2020,
    client: 'BXP Tech',
    serviceType: 'web',
    stack: [
      { tech: 'PHP' },
      { tech: 'MySQL' },
      { tech: 'JavaScript' },
      { tech: 'Bootstrap' },
      { tech: 'PayPal API' },
    ],
    featured: false,
    status: 'archived',
    complexity: 7,
  },

  {
    slug: 'ibarra-bus-iot',
    titleEn: 'Ibarra Bus — IoT Tracking Prototype',
    titleEs: 'Ibarra Bus — Prototipo de Rastreo IoT',
    taglineEn: 'Real-time bus tracking prototype using IoT and GPS integration',
    taglineEs: 'Prototipo de rastreo de autobuses en tiempo real con IoT y GPS',
    descriptionEn: toRichText(
      'IoT prototype for real-time bus location tracking, integrating GPS hardware with a web dashboard for route monitoring. Built at BXP Tech as an exploratory project.'
    ),
    descriptionEs: toRichText(
      'Prototipo IoT para rastreo de ubicación de autobuses en tiempo real, integrando hardware GPS con tablero web para monitoreo de rutas. Desarrollado en BXP Tech como proyecto exploratorio.'
    ),
    year: 2020,
    client: 'BXP Tech',
    serviceType: 'other',
    stack: [
      { tech: 'JavaScript' },
      { tech: 'PHP' },
      { tech: 'GPS API' },
      { tech: 'Bootstrap' },
      { tech: 'IoT' },
    ],
    featured: false,
    status: 'archived',
    complexity: 2,
  },

  {
    slug: 'centro-incubador-utnc',
    titleEn: 'Centro Incubador UTNC — Website & LMS',
    titleEs: 'Centro Incubador UTNC — Sitio Web y LMS',
    taglineEn: "Institutional website and learning platform for UTNC's innovation incubator",
    taglineEs: 'Sitio web institucional y plataforma de aprendizaje para la incubadora de innovación de la UTNC',
    descriptionEn: toRichText(
      'Website and LMS for the innovation incubator at Universidad Tecnológica del Norte de Coahuila. Built with HTML, CSS, JavaScript, and Bootstrap.'
    ),
    descriptionEs: toRichText(
      'Sitio web y LMS para la incubadora de innovación de la Universidad Tecnológica del Norte de Coahuila. Construido con HTML, CSS, JavaScript y Bootstrap.'
    ),
    year: 2021,
    client: 'UTNC',
    serviceType: 'web',
    stack: [
      { tech: 'HTML' },
      { tech: 'CSS' },
      { tech: 'JavaScript' },
      { tech: 'Bootstrap' },
      { tech: 'PHP' },
    ],
    featured: false,
    status: 'archived',
    complexity: 5,
  },

  {
    slug: 'wizeline-redux-bootcamp',
    titleEn: 'Redux Bootcamp — E-commerce Milestone',
    titleEs: 'Bootcamp Redux — Milestone E-commerce',
    taglineEn: "Mentoring project: e-commerce built during Redux training at Wizeline",
    taglineEs: 'Proyecto de mentoría: e-commerce construido durante capacitación Redux en Wizeline',
    descriptionEn: toRichText(
      "E-commerce application built as the capstone project for Wizeline's internal Redux bootcamp. Covered advanced state management patterns with Redux Toolkit, styled-components, and React best practices."
    ),
    descriptionEs: toRichText(
      'Aplicación e-commerce construida como proyecto final del bootcamp interno de Redux en Wizeline. Cubrió patrones avanzados de gestión de estado con Redux Toolkit, styled-components y mejores prácticas de React.'
    ),
    year: 2022,
    client: 'Wizeline',
    serviceType: 'web',
    stack: [
      { tech: 'React' },
      { tech: 'Redux Toolkit' },
      { tech: 'styled-components' },
      { tech: 'JavaScript' },
    ],
    featured: false,
    status: 'archived',
    complexity: 3,
  },

  {
    slug: 'xml-parser-microservice',
    titleEn: 'XML Parser Microservice',
    titleEs: 'Microservicio de Parseo XML',
    taglineEn: 'Standalone TypeScript microservice for structured XML document processing',
    taglineEs: 'Microservicio TypeScript para procesamiento de documentos XML estructurados',
    descriptionEn: toRichText(
      'Standalone microservice built under yeblanca for structured XML document parsing and transformation. Built with TypeScript and Node.js, containerized with Docker.'
    ),
    descriptionEs: toRichText(
      'Microservicio independiente construido bajo yeblanca para parseo y transformación de documentos XML estructurados. Construido con TypeScript y Node.js, contenedorizado con Docker.'
    ),
    year: 2024,
    client: 'Yeblanca',
    serviceType: 'other',
    stack: [
      { tech: 'TypeScript' },
      { tech: 'Node.js' },
      { tech: 'Docker' },
      { tech: 'Express' },
    ],
    featured: false,
    status: 'archived',
    complexity: 6,
  },
]

// ─── Services ─────────────────────────────────────────────────────────────────

const services: ServiceSeed[] = [
  {
    slug: 'web-development',
    titleEn: 'Web Development',
    titleEs: 'Desarrollo Web',
    descriptionEn: toRichText(
      'Corporate sites, landing pages, and CMS-driven platforms built for performance and bilingual markets.'
    ),
    descriptionEs: toRichText(
      'Sitios corporativos, landing pages y plataformas con CMS construidas para rendimiento y mercados bilingües.'
    ),
    icon: 'Globe',
    featuresEn: [
      { feature: 'Next.js App Router (latest)' },
      { feature: 'Payload CMS — self-hosted, full control' },
      { feature: 'Bilingual EN/ES with next-intl' },
      { feature: 'SEO-first architecture' },
      { feature: 'Vercel deployment + CDN' },
      { feature: 'Contact forms with Resend' },
    ],
    featuresEs: [
      { feature: 'Next.js App Router (última versión)' },
      { feature: 'Payload CMS — autoalojado, control total' },
      { feature: 'Bilingüe EN/ES con next-intl' },
      { feature: 'Arquitectura SEO-first' },
      { feature: 'Despliegue en Vercel + CDN' },
      { feature: 'Formularios de contacto con Resend' },
    ],
    startingPrice: 800,
  },
  {
    slug: 'ecommerce',
    titleEn: 'E-commerce',
    titleEs: 'Comercio Electrónico',
    descriptionEn: toRichText(
      'Custom storefronts built with MedusaJS and Next.js — payments, logistics, search, and media included.'
    ),
    descriptionEs: toRichText(
      'Tiendas personalizadas con MedusaJS y Next.js — pagos, logística, búsqueda y medios incluidos.'
    ),
    icon: 'ShoppingBag',
    featuresEn: [
      { feature: 'MedusaJS commerce engine' },
      { feature: 'Stripe payments integration' },
      { feature: 'SoloEnvíos / logistics API' },
      { feature: 'Meilisearch instant search' },
      { feature: 'Cloudinary media management' },
      { feature: 'Admin dashboard included' },
    ],
    featuresEs: [
      { feature: 'Motor de comercio MedusaJS' },
      { feature: 'Integración de pagos Stripe' },
      { feature: 'SoloEnvíos / API de logística' },
      { feature: 'Búsqueda instantánea Meilisearch' },
      { feature: 'Gestión de medios con Cloudinary' },
      { feature: 'Dashboard administrativo incluido' },
    ],
    startingPrice: 2000,
  },
  {
    slug: 'custom-systems',
    titleEn: 'Custom Systems',
    titleEs: 'Sistemas a la Medida',
    descriptionEn: toRichText(
      'CRMs, ERPs, booking platforms, and internal tools built for the specific way your business works.'
    ),
    descriptionEs: toRichText(
      'CRMs, ERPs, plataformas de reservas y herramientas internas construidas para la manera específica en que opera tu negocio.'
    ),
    icon: 'Layers',
    featuresEn: [
      { feature: 'Full-stack Next.js + Supabase' },
      { feature: 'Role-based permission systems' },
      { feature: 'QuickBooks / third-party integrations' },
      { feature: 'Real-time data with Supabase' },
      { feature: 'PWA with offline support' },
      { feature: 'Push notifications' },
    ],
    featuresEs: [
      { feature: 'Full-stack Next.js + Supabase' },
      { feature: 'Sistemas de permisos por rol' },
      { feature: 'Integraciones QuickBooks / terceros' },
      { feature: 'Datos en tiempo real con Supabase' },
      { feature: 'PWA con soporte offline' },
      { feature: 'Notificaciones push' },
    ],
    startingPrice: 3500,
  },
  {
    slug: 'consulting',
    titleEn: 'Consulting & Strategy',
    titleEs: 'Consultoría y Estrategia',
    descriptionEn: toRichText(
      'Digital strategy, tech audits, architecture reviews, and team mentoring for startups and SMBs.'
    ),
    descriptionEs: toRichText(
      'Estrategia digital, auditorías tecnológicas, revisiones de arquitectura y mentoría para startups y PYMEs.'
    ),
    icon: 'Compass',
    featuresEn: [
      { feature: 'Tech stack audit and recommendations' },
      { feature: 'Architecture design sessions' },
      { feature: 'Team training (React, Next.js, TypeScript)' },
      { feature: 'Project planning and scoping' },
      { feature: 'Cross-border market strategy (MX/USA)' },
      { feature: 'Ongoing retainer available' },
    ],
    featuresEs: [
      { feature: 'Auditoría y recomendaciones de stack tecnológico' },
      { feature: 'Sesiones de diseño de arquitectura' },
      { feature: 'Capacitación de equipos (React, Next.js, TypeScript)' },
      { feature: 'Planeación y alcance de proyectos' },
      { feature: 'Estrategia de mercado cross-border (MX/EE.UU.)' },
      { feature: 'Retainer mensual disponible' },
    ],
    startingPrice: 500,
  },
]

// ─── Clients ─────────────────────────────────────────────────────────────────

interface ClientSeed {
  name: string
  order: number
  featured: boolean
}

const clients: ClientSeed[] = [
  { name: 'ALPHAVILLE', order: 1, featured: true },
  { name: 'STARK', order: 2, featured: true },
  { name: 'MONOLITH', order: 3, featured: true },
  { name: 'VANGUARD', order: 4, featured: true },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

/**
 * One placeholder testimonial per project.
 * projectSlug is resolved to a project ID at seed time so we can set projectRef.
 */
interface TestimonialSeed {
  projectSlug: string
  author: string
  company: string
  textEn: string
  textEs: string
  featured: boolean
}

const testimonials: TestimonialSeed[] = [
  { projectSlug: 'colonial-crm',              author: 'DIRECTOR', company: 'MONOLITH INC.', textEn: "YEBLANCA DOESN'T JUST BUILD WEBSITES; THEY CONSTRUCT DIGITAL ARCHITECTURE THAT COMMANDS ATTENTION THROUGH SILENCE.", textEs: "YEBLANCA NO SOLO CONSTRUYE SITIOS WEB; CONSTRUYEN ARQUITECTURA DIGITAL QUE COMANDA ATENCIÓN A TRAVÉS DEL SILENCIO.", featured: true },
  { projectSlug: 'talent-insight-wizeline',    author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximamente.', featured: false },
  { projectSlug: 'vlood-plus',                 author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'covid-management-bxp',       author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'constellation-lynx',         author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'candy-store',                author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'radia-landing',              author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'ofisenas',                   author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'bxp-gym-system',             author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'treon-bubbles',              author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'ibarra-bus-iot',             author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'centro-incubador-utnc',      author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'wizeline-redux-bootcamp',    author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
  { projectSlug: 'xml-parser-microservice',    author: 'Juan N.', company: '', textEn: 'Testimonial coming soon.', textEs: 'Testimonio próximas.', featured: false },
]

// ─── Seed Runner ──────────────────────────────────────────────────────────────

async function seed() {
  const payloadInstance = await getPayload({ config })

  console.log('\n🌱 yeblanca seed starting...\n')

  // ── Projects ──────────────────────────────────────────────────────────────
  console.log('📁 Seeding projects…')

  for (const project of projects) {
    try {
      const existing = await payloadInstance.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭  Skipped (exists): ${project.slug}`)
        continue
      }

      await payloadInstance.create({
        collection: 'projects',
        data: project as any,
      })
      console.log(`  ✅ Created: ${project.slug}`)
    } catch (err) {
      console.error(`  ❌ Failed: ${project.slug}`, err)
    }
  }

  // ── Services ──────────────────────────────────────────────────────────────
  console.log('\n🛠  Seeding services…')

  for (const service of services) {
    try {
      const existing = await payloadInstance.find({
        collection: 'services',
        where: { slug: { equals: service.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭  Skipped (exists): ${service.slug}`)
        continue
      }

      await payloadInstance.create({
        collection: 'services',
        data: service as any,
      })
      console.log(`  ✅ Created: ${service.slug}`)
    } catch (err) {
      console.error(`  ❌ Failed: ${service.slug}`, err)
    }
  }

  // ── Clients ─────────────────────────────────────────────────────────────────
  console.log('\n🏢 Seeding clients…')

  for (const client of clients) {
    try {
      const existing = await payloadInstance.find({
        collection: 'clients',
        where: { name: { equals: client.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭  Skipped (exists): ${client.name}`)
        continue
      }

      await payloadInstance.create({
        collection: 'clients',
        data: client as any,
      })
      console.log(`  ✅ Created: ${client.name}`)
    } catch (err) {
      console.error(`  ❌ Failed: ${client.name}`, err)
    }
  }

  // ── Testimonials ────────────────────────────────────────────────────────────
  console.log('\n💬 Seeding testimonials…')

  for (const t of testimonials) {
    try {
      // Resolve project slug → project ID for the relationship field
      const project = await payloadInstance.find({
        collection: 'projects',
        where: { slug: { equals: t.projectSlug } },
        limit: 1,
        depth: 0,
      })

      if (project.docs.length === 0) {
        console.log(`  ⏭  Skipped (no project): ${t.projectSlug}`)
        continue
      }

      const projectId = project.docs[0].id

      // Check if a testimonial already references this project
      const existing = await payloadInstance.find({
        collection: 'testimonials',
        where: { projectRef: { equals: projectId } },
        limit: 1,
        depth: 0,
      })

      if (existing.docs.length > 0) {
        // If it's the featured testimonial, update it with the new text
        if (t.featured) {
          await payloadInstance.update({
            collection: 'testimonials',
            id: existing.docs[0].id,
            data: {
              author: t.author,
              company: t.company,
              textEn: t.textEn,
              textEs: t.textEs,
              featured: t.featured,
            },
          })
          console.log(`  🔄 Updated (featured): ${t.projectSlug}`)
        } else {
          console.log(`  ⏭  Skipped (exists): ${t.projectSlug}`)
        }
        continue
      }

      await payloadInstance.create({
        collection: 'testimonials',
        data: {
          author: t.author,
          company: t.company,
          textEn: t.textEn,
          textEs: t.textEs,
          projectRef: projectId,
          featured: t.featured,
        },
      })
      console.log(`  ✅ Created: ${t.projectSlug}`)
    } catch (err) {
      console.error(`  ❌ Failed: ${t.projectSlug}`, err)
    }
  }

  // ── Site Settings (global) ────────────────────────────────────────────────
  console.log('\n⚙️  Seeding site settings global…')

  try {
    await payloadInstance.updateGlobal({
      slug: 'site-settings',
      data: {
        metaTitleEn: 'yeblanca — Custom Web Development',
        metaTitleEs: 'yeblanca — Desarrollo Web a la Medida',
        metaDescriptionEn:
          'Bilingual web development agency based in Piedras Negras, México. We build custom systems, e-commerce, and web platforms for U.S. and Mexican markets.',
        metaDescriptionEs:
          'Agencia de desarrollo web bilingüe con sede en Piedras Negras, México. Construimos sistemas a la medida, e-commerce y plataformas web para mercados de EE.UU. y México.',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/jplozanoe',
          github: 'https://github.com/jplozanoe',
          instagram: '',
        },
        contactEmail: 'yp@yeblanca.com',
        availableForProjects: true,
      },
    })
    console.log('  ✅ Site settings updated')
  } catch (err) {
    console.error('  ❌ Site settings failed', err)
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n✨ Seed complete.\n')
  console.log(`   Projects: ${projects.length} (${projects.filter((p) => p.featured).length} featured)`)
  console.log(`   Services: ${services.length}`)
  console.log(`   Clients: ${clients.length} (${clients.filter((c) => c.featured).length} featured)`)
  console.log(`   Testimonials: ${testimonials.length} (${testimonials.filter((t) => t.featured).length} featured)`)
  console.log('\n')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
