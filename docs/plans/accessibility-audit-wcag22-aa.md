# 🔍 Auditoría de Accesibilidad WCAG 2.2 Nivel AA — yeblanca.com

**Sitio:** yeblanca.com  
**Framework:** Next.js 16 + Tailwind CSS v4 + next-intl (EN/ES)  
**Fecha:** 19 de mayo de 2026  
**Metodología:** Análisis directo del código fuente (70+ archivos .tsx/.css/.json revisados)  
**Alcance:** 6 áreas — Contraste de color, Escalado de texto, Lectores de pantalla y ARIA, Responsive/viewports, Formularios, Imágenes y alt text

---

## 🔴 Crítico — Bloquea el acceso a usuarios con discapacidad

### 1. Contraste insuficiente en texto secundario (modo oscuro)

- **Área:** Contraste de color
- **Criterio:** WCAG 2.2 — 1.4.3 Contraste (mínimo) (AA)
- **Descripción:** El color `rgba(240,240,240,0.45)` usado extensivamente para etiquetas, metadatos y navegación produce un contraste efectivo de **~4.1:1** sobre el fondo `#0a0a0a`, por debajo del mínimo **4.5:1** para texto normal.
- **Componentes afectados:**
  - `SectionLabel` (`components/ui/SectionLabel.tsx:5`) — etiquetas como "Selected work", "What we build", etc.
  - `Navbar` enlaces inactivos (`components/layout/Navbar.tsx:76`) — "Projects", "Services", "About", "Contact"
  - `Footer` enlaces de navegación (`components/layout/Footer.tsx:47`)
  - `ContactPage` y `QuoteForm` labels de campos (`app/[locale]/contact/page.tsx:55,67,81,94`)
  - `QuoteStep1/2/3` labels de grupos de opciones
  - `CaseStudyHero` etiquetas de metadatos
- **Impacto:** Usuarios con visión reducida no podrán leer etiquetas de navegación, nombres de campos de formulario ni metadatos de contenido.

### 2. Contraste insuficiente en texto secundario (modo claro)

- **Área:** Contraste de color
- **Criterio:** WCAG 2.2 — 1.4.3 Contraste (mínimo) (AA)
- **Descripción:** En modo claro, el color `rgba(10,10,10,0.45)` produce un contraste efectivo de **~3.1:1** sobre `#f5f5f5`, muy por debajo del mínimo 4.5:1. Todos los mismos componentes del punto #1 se ven afectados en modo claro, con un impacto aún más severo.
- **Componentes afectados:** Los mismos que en el punto #1 (todos los usos de `text-[rgba(240,240,240,0.45)]` en oscuro pasan a `rgba(10,10,10,0.45)` en claro).
- **Impacto:** Mayor que el punto anterior; el contraste es aún más bajo.

### 3. Atributo `lang` incorrecto en `<html>`

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 3.1.1 Idioma de la página (A)
- **Descripción:** En `app/[locale]/layout.tsx:70`, el atributo `lang="en"` está hardcodeado. Cuando el locale activo es `es`, el HTML sigue diciendo `lang="en"`, lo que hace que los lectores de pantalla pronuncien el contenido en español con fonética inglesa.
- **Componente afectado:** `app/[locale]/layout.tsx` línea 70
- **Impacto:** Usuarios hispanohablantes con lectores de pantalla escucharán el contenido con pronunciación incorrecta, dificultando gravemente la comprensión.

### 4. Formularios sin asociación `<label>` → `<input>`

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 1.3.1 Información y relaciones (A), 3.3.2 Etiquetas o instrucciones (A)
- **Descripción:** Los elementos `<label>` y los `<input>`/`<textarea>` **no están asociados** mediante `htmlFor`/`id`. Son hermanos adyacentes pero sin relación programática, por lo que los lectores de pantalla no anuncian la etiqueta al enfocar el campo.
- **Componentes afectados:**
  - `ContactPage` (`app/[locale]/contact/page.tsx:55-63`) — campos name, email, message
  - `QuoteStep2` (`components/quote/QuoteStep2.tsx:27-78`) — projectName, description, currentStack, referenceUrls
  - `QuoteStep3` (`components/quote/QuoteStep3.tsx:55-76`) — name, email, company
- **Impacto:** Usuarios con lectores de pantalla no sabrán qué información ingresar en cada campo.

### 5. Campos requeridos sin indicación accesible

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 3.3.2 Etiquetas o instrucciones (A), 1.3.1 Información y relaciones (A)
- **Descripción:** Los campos obligatorios en el QuoteForm (QuoteStep2 y QuoteStep3) no tienen atributo `required`, `aria-required`, ni indicador visual de obligatoriedad. Solo el ContactForm usa el atributo HTML `required`. El QuoteForm valida en el frontend con `canProceed`/`canSubmit` pero no comunica la obligatoriedad a tecnologías asistivas.
- **Componentes afectados:** `QuoteStep2`, `QuoteStep3`
- **Impacto:** Usuarios de lectores de pantalla no sabrán qué campos son obligatorios hasta que intenten avanzar y no puedan.

---

## 🟠 Alto — Dificulta significativamente la experiencia

### 6. Contraste muy bajo en metadatos y etiquetas decorativas

- **Área:** Contraste de color
- **Criterio:** WCAG 2.2 — 1.4.3 Contraste (mínimo) (AA)
- **Descripción:** Los colores `rgba(240,240,240,0.30)` y `rgba(240,240,240,0.25)` usados en pies de página, texto legal, placeholders y etiquetas de filtro tienen un contraste efectivo de **~1.4:1 a ~1.8:1**, totalmente insuficiente.
- **Componentes afectados:**
  - `Footer` texto legal (`components/layout/Footer.tsx:88`) — `text-[rgba(240,240,240,0.30)]` a 10px
  - `Footer` "Links" y "Social" headings (`Footer.tsx:39,58`) — `rgba(240,240,240,0.30)`
  - `CaseStudyHero` labels "Client"/"Year" (`components/project/CaseStudyHero.tsx:52,60`)
  - `ProjectFilters` labels de categorías (`components/project/ProjectFilters.tsx:52`)
  - `FeaturedProjects` "View all projects" link — `rgba(240,240,240,0.45)` (mismo problema que #1)
  - Placeholder text en inputs (`rgba(240,240,240,0.25)`)
- **Impacto:** Información de pie de página, etiquetas de filtro y texto legal es prácticamente ilegible para usuarios con baja visión.

### 7. No hay enlace "Skip to main content"

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 2.4.1 Evitar bloques (A)
- **Descripción:** No existe un mecanismo para saltar directamente al contenido principal. Los usuarios de teclado y lectores de pantalla deben navegar secuencialmente por todo el Navbar en cada página.
- **Componente afectado:** `app/[locale]/layout.tsx` — ausente entre `<body>` y `<Navbar />`
- **Impacto:** Usuarios de teclado pierden tiempo y esfuerzo navegando repetidamente por la barra de navegación en cada página.

### 8. Indicador de foco insuficiente o ausente en enlaces y botones

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 2.4.7 Foco visible (AA)
- **Descripción:** El proyecto define `outline: none` para inputs/textarea/select y no define estilos de foco personalizados para enlaces (`<Link>`) y botones. Aunque Tailwind v4 puede incluir un `focus-visible` por defecto, el cambio de borde de 0.5px con opacidad 0.08 a rosa no es un indicador de foco suficientemente visible para cumplir 2.4.7.
- **Componentes afectados:** `globals.css:71-77`, todos los `<Link>`, `<button>`, `<a>`
- **Impacto:** Usuarios que navegan por teclado no pueden identificar visualmente qué elemento está enfocado.

### 9. Uso masivo de texto a 10-11px en elementos informativos

- **Área:** Escalado de texto
- **Criterio:** WCAG 2.2 — 1.4.4 Redimensionar texto (AA) — si bien técnicamente el texto puede escalarse al 200% con zoom del navegador, el tamaño base es tan pequeño que incluso con zoom resulta difícil de leer. Relacionado con 1.4.12 Espaciado de texto (AA).
- **Descripción:** Prácticamente todo el texto secundario usa `text-[11px]` (8.25pt) o `text-[10px]` (7.5pt): etiquetas, navegación, metadatos, filtros, badges, pies de página. WCAG no especifica un tamaño mínimo, pero las pautas de legibilidad recomiendan no bajar de 14-16px para body text y 12px para UI.
- **Componentes afectados:** Navbar, Footer, SectionLabel, ProjectCard, ProjectFilters, CaseStudyHero, formularios, badges en toda la app.
- **Impacto:** Usuarios con visión reducida y adultos mayores encontrarán la interfaz difícil de leer incluso haciendo zoom.

### 10. Opciones de formulario (QuoteStep1) sin semántica de grupo

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 1.3.1 Información y relaciones (A), 4.1.2 Nombre, función, valor (A)
- **Descripción:** Los selectores de tipo de servicio, presupuesto y plazo en QuoteStep1 usan `<button>` elements sueltos sin agrupar con `<fieldset>`/`<legend>`. No hay `role="radiogroup"` ni `role="radio"` con `aria-checked`. Los lectores de pantalla no entienden que son grupos de opciones mutuamente excluyentes.
- **Componente afectado:** `components/quote/QuoteStep1.tsx` (completo)
- **Impacto:** Usuarios de lectores de pantalla no pueden entender la relación entre las opciones ni saber cuál está seleccionada.

### 11. Barra de progreso del QuoteForm sin semántica ARIA

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 1.3.1 Información y relaciones (A), 4.1.2 Nombre, función, valor (A)
- **Descripción:** La barra de progreso en `QuoteForm.tsx:109-118` es puramente visual (tres `<div>` con colores condicionales). No tiene `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, ni texto accesible que indique "Paso 1 de 3".
- **Componente afectado:** `components/quote/QuoteForm.tsx:109-118`
- **Impacto:** Usuarios de lectores de pantalla no saben en qué paso del formulario están ni cuántos faltan.

---

## 🟡 Medio — Problema notable pero con workaround posible

### 12. Video del Hero sin alternativa textual ni descripción

- **Área:** Imágenes y alt text
- **Criterio:** WCAG 2.2 — 1.1.1 Contenido no textual (A), 1.2.1 Solo audio y solo video (pregrabado) (A)
- **Descripción:** El `<video>` de fondo en el Hero (`components/sections/Hero.tsx:21-30`) no tiene atributo `title`, `aria-label`, ni `<track>` descriptivo. Aunque es decorativo, la ausencia de cualquier metadata hace que los lectores de pantalla anuncien "video" sin contexto.
- **Componente afectado:** `components/sections/Hero.tsx:21-30`
- **Impacto:** Usuarios de lectores de pantalla reciben un anuncio vacío de elemento multimedia.

### 13. Icono decorativo sin `aria-hidden` (testimonial section)

- **Área:** Imágenes y alt text
- **Criterio:** WCAG 2.2 — 1.1.1 Contenido no textual (A)
- **Descripción:** El `<span>` con `material-symbols-outlined` en la sección de testimonial (`app/[locale]/page.tsx:141`) renderiza el icono "format_quote" con contenido textual `format_quote` visible para lectores de pantalla. No tiene `aria-hidden="true"`.
- **Componente afectado:** `app/[locale]/page.tsx:141`
- **Impacto:** Los lectores de pantalla leerán "format_quote" como texto suelto en medio del contenido.

### 14. Overlay del menú móvil no accesible por teclado

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 2.1.1 Teclado (A), 4.1.2 Nombre, función, valor (A)
- **Descripción:** El backdrop del menú móvil es un `<div>` con `onClick` pero sin `role="button"`, `tabIndex={0}`, `aria-label`, ni manejo de teclado (`onKeyDown` para Enter/Space). No se puede cerrar el menú con teclado haciendo clic fuera.
- **Componente afectado:** `components/layout/Navbar.tsx:150-153`
- **Impacto:** Usuarios de teclado no pueden cerrar el menú móvil tocando el backdrop.

### 15. Mensajes de error sin `role="alert"` ni `aria-live`

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 4.1.3 Mensajes de estado (AA)
- **Descripción:** Los mensajes de error en ContactForm (`app/[locale]/contact/page.tsx:116`) y QuoteForm (`components/quote/QuoteForm.tsx:142`) se renderizan como `<p>` estáticos. No usan `role="alert"` ni `aria-live="polite"`, por lo que los lectores de pantalla no anuncian los errores cuando aparecen.
- **Componentes afectados:** `app/[locale]/contact/page.tsx:116`, `components/quote/QuoteForm.tsx:142`
- **Impacto:** Usuarios con lectores de pantalla no perciben que ocurrió un error al enviar el formulario.

### 16. Texto placeholder con contraste insuficiente

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 1.4.3 Contraste (mínimo) (AA)
- **Descripción:** El placeholder text usa `placeholder:text-[rgba(240,240,240,0.25)]` que produce un contraste muy bajo (~1.8:1) sobre `#0a0a0a`.
- **Componentes afectados:** `ContactPage`, `QuoteStep2`, `QuoteStep3` (definición de `inputClass`)
- **Impacto:** El texto de ejemplo dentro de los campos es ilegible para usuarios con visión reducida.

### 17. Etiquetas de formulario no asociadas a grupos de opciones (QuoteStep1/3)

- **Área:** Formularios
- **Criterio:** WCAG 2.2 — 1.3.1 Información y relaciones (A)
- **Descripción:** En QuoteStep1 (líneas 51, 69, 87) y QuoteStep3 (líneas 93, 110), las etiquetas como "Service type", "Budget range", "Language", "How did you find us?" son `<p>` elementos que preceden visualmente a los botones de opción, pero no hay `<fieldset>` con `<legend>` que agrupe y etiquete semánticamente cada conjunto de opciones.
- **Componentes afectados:** `QuoteStep1.tsx`, `QuoteStep3.tsx`
- **Impacto:** Usuarios de lectores de pantalla no pueden asociar las etiquetas con sus respectivos grupos de opciones.

---

## 🟢 Bajo — Mejora recomendada, no es bloqueante

### 18. Unidades fijas (px) en lugar de relativas (rem/em)

- **Área:** Escalado de texto
- **Criterio:** WCAG 2.2 — 1.4.4 Redimensionar texto (AA) (cumplimiento técnico mediante zoom del navegador, pero mejor práctica no seguida)
- **Descripción:** Uso extensivo de `text-[11px]`, `text-[10px]`, `text-[13px]` y `h-11`, `h-9`, `h-8` en Tailwind (que traduce a px). Si bien los navegadores modernos escalan px correctamente con zoom, el uso de `rem`/`em` permitiría que los usuarios que configuran un tamaño de fuente base personalizado en su navegador vean todos los elementos escalar proporcionalmente.
- **Componentes afectados:** Todo el proyecto (global)
- **Recomendación:** Cambiar `text-[11px]` → `text-[0.6875rem]`, `text-[10px]` → `text-[0.625rem]`, etc.

### 19. Animación continua sin respetar `prefers-reduced-motion`

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 2.3.3 Animación por interacción (AAA, no requerido para AA pero buena práctica)
- **Descripción:** El componente `text-cursor-proximity.tsx` ejecuta `useAnimationFrame` continuamente para animar letras. El `<video>` en el Hero se reproduce en bucle infinito. No se verifica `prefers-reduced-motion` para desactivar estas animaciones.
- **Componentes afectados:** `components/ui/text-cursor-proximity.tsx`, `components/sections/Hero.tsx`
- **Impacto:** Usuarios con trastornos vestibulares pueden experimentar molestias.

### 20. Falta de etiquetas semánticas en algunas secciones

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 1.3.1 Información y relaciones (A) (mejora recomendada)
- **Descripción:** Varias secciones del homepage (Methodology, Clients, Testimonial) y páginas internas usan `<section>` genérico sin `aria-label` o `aria-labelledby`. Si bien `<section>` es semántico, sin etiquetar, los lectores de pantalla simplemente anuncian "region" sin contexto.
- **Componentes afectados:** `app/[locale]/page.tsx` secciones de Methodology, Clients, Testimonial. `app/[locale]/about/page.tsx` secciones de Origin, Founder, Stack.
- **Recomendación:** Agregar `aria-labelledby` apuntando al `<h2>` de cada sección.

### 21. Enlaces de footer con `target="_blank"` sin advertencia

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 3.2.5 Cambios a petición (AAA) / buena práctica
- **Descripción:** Los enlaces de redes sociales en el Footer (`Footer.tsx:64-80`) usan `target="_blank"` pero no incluyen texto visible o `aria-label` que advierta que se abren en nueva pestaña (ej. "GitHub — opens in new tab").
- **Componente afectado:** `components/layout/Footer.tsx:64-80`
- **Impacto:** Usuarios de lectores de pantalla pueden no esperar el cambio de contexto.

### 22. Títulos de página sin metadatos descriptivos por página

- **Área:** Lectores de pantalla y ARIA
- **Criterio:** WCAG 2.2 — 2.4.2 Titulado de páginas (A)
- **Descripción:** No hay exportaciones de `metadata` por página. Los títulos de página usan el template `%s | yeblanca` del layout pero el `%s` se genera automáticamente del segmento de ruta (ej. "about | yeblanca", "contact | yeblanca"), lo cual es funcional pero no descriptivo para usuarios de lectores de pantalla que usan el título para orientarse.
- **Componentes afectados:** `about/page.tsx`, `contact/page.tsx`, `quote/page.tsx`, `services/page.tsx`, `projects/page.tsx`, `projects/[slug]/page.tsx`
- **Recomendación:** Agregar `export const metadata` en cada página con `title` descriptivo.

### 23. Área de toque de 40px en footer (por debajo de 44px recomendado)

- **Área:** Responsive / viewports
- **Criterio:** WCAG 2.2 — 2.5.5 Tamaño del objetivo (AAA, no AA pero buena práctica)
- **Descripción:** Los enlaces del footer usan `min-h-[40px]` en lugar de los `min-h-[44px]` usados en el Navbar.
- **Componente afectado:** `components/layout/Footer.tsx:47,67,77`

---

## 📊 Resumen

| Severidad | Cantidad | Criterios WCAG incumplidos |
|-----------|----------|---------------------------|
| 🔴 Crítico | 5 | 1.4.3, 3.1.1, 1.3.1, 3.3.2 |
| 🟠 Alto | 6 | 1.4.3, 2.4.1, 2.4.7, 1.4.4, 1.3.1, 4.1.2 |
| 🟡 Medio | 6 | 1.1.1, 1.2.1, 2.1.1, 4.1.2, 4.1.3, 1.4.3, 1.3.1 |
| 🟢 Bajo | 6 | 1.4.4, 2.3.3(AAA), 1.3.1, 3.2.5(AAA), 2.4.2, 2.5.5(AAA) |
| **Total** | **23** | |

### Áreas más afectadas (por número de hallazgos)

1. **Contraste de color** — 5 hallazgos (🔴🔴🟠🟡) — El problema más sistémico. El uso de colores con opacidad `rgba(240,240,240,0.45)` y `rgba(10,10,10,0.45)` como texto secundario produce contraste insuficiente en ambos modos (oscuro y claro).
2. **Lectores de pantalla y ARIA** — 8 hallazgos — Atributo `lang` incorrecto, falta de skip link, foco insuficiente, progreso sin semántica, backdrop no accesible, secciones sin etiquetar.
3. **Formularios** — 7 hallazgos — Labels sin asociar, campos requeridos no indicados, grupos sin fieldset, errores sin alert, placeholders ilegibles.

### Recomendaciones prioritarias (quick wins)

1. **Corregir contraste de `rgba(240,240,240,0.45)`** → cambiar a `rgba(240,240,240,0.65)` (~7:1 en oscuro, ~7.5:1 en claro) en todos los tokens `--color-muted`.
2. **Corregir `lang` dinámico** → usar `locale` en `<html lang={locale}>`.
3. **Asociar labels con inputs** → agregar `id` a cada input y `htmlFor` a cada label, o envolver el input dentro del label.
4. **Agregar `<SkipLink>`** → un enlace visible-on-focus antes del Navbar que apunte a `<main id="main-content">`.
5. **Agregar `required`/`aria-required`** a campos obligatorios del QuoteForm.

---

## 🔢 Tabla de criterios WCAG 2.2 por hallazgo

| # | Hallazgo | Criterio WCAG | Nivel | Severidad |
|---|----------|--------------|-------|-----------|
| 1 | Contraste texto secundario (oscuro) | 1.4.3 Contraste (mínimo) | AA | 🔴 Crítico |
| 2 | Contraste texto secundario (claro) | 1.4.3 Contraste (mínimo) | AA | 🔴 Crítico |
| 3 | `lang` hardcodeado en `<html>` | 3.1.1 Idioma de la página | A | 🔴 Crítico |
| 4 | Labels sin asociar a inputs | 1.3.1 Información y relaciones, 3.3.2 Etiquetas | A | 🔴 Crítico |
| 5 | Campos requeridos sin `required`/`aria-required` | 3.3.2 Etiquetas o instrucciones | A | 🔴 Crítico |
| 6 | Contraste muy bajo en metadatos | 1.4.3 Contraste (mínimo) | AA | 🟠 Alto |
| 7 | Sin skip-to-main-content | 2.4.1 Evitar bloques | A | 🟠 Alto |
| 8 | Indicador de foco insuficiente | 2.4.7 Foco visible | AA | 🟠 Alto |
| 9 | Texto base a 10-11px | 1.4.4 Redimensionar texto | AA | 🟠 Alto |
| 10 | QuoteStep1 sin fieldset/radiogroup | 1.3.1 Información y relaciones, 4.1.2 | A | 🟠 Alto |
| 11 | Barra de progreso sin role="progressbar" | 1.3.1, 4.1.2 Nombre, función, valor | A | 🟠 Alto |
| 12 | Video sin alternativa textual | 1.1.1 Contenido no textual, 1.2.1 | A | 🟡 Medio |
| 13 | Icono decorativo sin aria-hidden | 1.1.1 Contenido no textual | A | 🟡 Medio |
| 14 | Backdrop menú móvil no accesible | 2.1.1 Teclado, 4.1.2 | A | 🟡 Medio |
| 15 | Mensajes de error sin role="alert" | 4.1.3 Mensajes de estado | AA | 🟡 Medio |
| 16 | Placeholder con contraste insuficiente | 1.4.3 Contraste (mínimo) | AA | 🟡 Medio |
| 17 | Etiquetas sin fieldset en grupos | 1.3.1 Información y relaciones | A | 🟡 Medio |
| 18 | Unidades px en lugar de rem | 1.4.4 Redimensionar texto (mejora) | AA | 🟢 Bajo |
| 19 | Sin prefers-reduced-motion | 2.3.3 Animación (AAA) | AAA | 🟢 Bajo |
| 20 | Secciones sin aria-labelledby | 1.3.1 Información y relaciones | A | 🟢 Bajo |
| 21 | target="_blank" sin advertencia | 3.2.5 Cambios a petición (AAA) | AAA | 🟢 Bajo |
| 22 | Títulos de página genéricos | 2.4.2 Titulado de páginas | A | 🟢 Bajo |
| 23 | Touch target 40px en footer | 2.5.5 Tamaño del objetivo (AAA) | AAA | 🟢 Bajo |

---

## 📁 Archivos con mayor concentración de hallazgos

| Archivo | Hallazgos |
|---------|-----------|
| `globals.css` | #1, #2, #6, #8, #16, #18 |
| `app/[locale]/layout.tsx` | #3, #7 |
| `components/quote/QuoteStep1.tsx` | #1, #10, #17 |
| `components/quote/QuoteStep2.tsx` | #1, #4, #5, #16 |
| `components/quote/QuoteStep3.tsx` | #1, #4, #5, #16, #17 |
| `components/quote/QuoteForm.tsx` | #1, #11, #15 |
| `app/[locale]/contact/page.tsx` | #1, #4, #15, #16 |
| `components/layout/Navbar.tsx` | #1, #14 |
| `components/layout/Footer.tsx` | #1, #6, #21, #23 |
| `components/project/CaseStudyHero.tsx` | #1, #6 |

---

*Reporte generado el 19 de mayo de 2026. No se realizaron modificaciones al código fuente.*
