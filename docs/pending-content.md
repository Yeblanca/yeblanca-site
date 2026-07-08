# Pending Content — yeblanca.com

> Brief ejecutable para imágenes, logos, y screenshots que faltan
> después de la auditoría UX del 8 de julio 2026.
> Cada item está listo para asignar a una sesión de foto, una
> captura, o un download. Los lugares ya están cableados en el
> código — solo falta subir el contenido a Payload o `public/`.

---

## Photography & Visual Style

| Zona | Estilo | Por qué |
|---|---|---|
| Founder, Origin, Context shots | **B&W estricto** | Y-3, restraint, "the engineer who scoped it builds it" |
| Project covers, Testimonial avatar | **B&W por default, color on hover** | El Featured Projects ya hace grayscale → color en hover. Mantener. |
| Yeblanca OS product screenshot | **Desaturado con un elemento pink destacado** | Único lugar donde el color controlado se gana — vende el producto |
| Hero alternative (opcional) | **B&W still image, 20% opacity** | Reemplaza el video del 3D Y si decides moverte |
| Client logos | **B&W, opacity-30 por default, opacity-100 pink on hover** | Reemplaza el text-marquee actual |

**Reglas duras del brand:**
- `2px` border en cualquier contenedor
- Sin sombras
- Sin gradients
- Pink solo en: bordes, hover, dividers, el único accent color
- 1:1, 4:3, 16:9, 4:5 son las proporciones seguras. Nada de vertical extremo.

---

## Item A — Founder portrait

**Dónde:** `app/[locale]/about/page.tsx` línea 105 (reemplaza el `JP` initials)
**Tamaño render:** 96×96 mobile, 128×128 desktop, `rounded-full` (única excepción permitida)
**Tamaño source:** mínimo 512×512, ideal 1024×1024
**Formato:** WebP, max 80KB

**Qué foto capturar:**
- Retrato de JP, monocromático, plano medio (cabeza + hombros)
- Fondo: neutro (pared lisa) o contexto de workspace suavemente desenfocado
- Iluminación: studio o natural con un solo key light. No flat.
- Mirada: a la cámara, directo, sin sonreír exagerado
- Estilo editorial, no stock

**Por qué:** El brand "el que cotiza construye" muere sin cara. Es la pieza más importante del plan.

**Notas:**
- No es una foto de "team smiling at whiteboard" — es un retrato honesto
- Si tienes un workspace con luz controlada, úsalo. Si no, fondo neutro limpio
- El B&W se puede hacer en post (Capture One, Lightroom, o Desaturate en cualquier editor)

---

## Item B — Workspace / context shot (about)

**Dónde:** Nueva sección "Behind the build" debajo de Origin en `/about` (no existe aún — agregar)
**Tamaño render:** full-bleed dentro de `max-w-5xl`, `aspect-video`, 2px border
**Tamaño source:** 1920×1080 mínimo
**Formato:** WebP

**Qué foto capturar:**
- JP en su setup: pantalla con código, segundo monitor, luz controlada
- O alternativa: una toma de Piedras Negras — el puente, una calle del centro, un taller
- Estilo: B&W estricto, encuadre editorial

**Por qué:** Refuerza "real engineer, real place". Counter-balance al portrait.

**Notas:**
- Si la foto tiene monitores encendidos, hacer la foto en un ángulo donde NO se vea el contenido (privacidad de clientes)
- No incluir logos de terceros reconocibles

---

## Item C — Origin: Piedras Negras / border image

**Dónde:** Sección Origin en `/about`, al lado del copy en grid 2 columnas
**Tamaño render:** `aspect-[4/5]` o `aspect-square`, 2px border
**Tamaño source:** 1200×1500 o 1500×1500
**Formato:** WebP

**Qué foto capturar:**
- Una de estas opciones, en orden de preferencia:
  1. El puente internacional Piedras Negras–Eagle Pass (border reality, on-brand)
  2. Una calle del centro de Piedras Negras (genuine, no postcard)
  3. Taller de Colonial Iron Doors (cliente real, producción real)
  4. El desierto / paisaje entre las dos ciudades (atmósfera, "built at the border")
- NO: skyline genérico de una ciudad random, foto de un país no identificable, stock photo de "Mexican border"

**Por qué:** Ancla visual al "Built at the border. For businesses that live there." El copy pide esto.

**Notas:**
- Si la foto es del taller, conseguir permiso del cliente para mostrarla
- B&W estricto. Tratarlo como un "still" de fotografía documental

---

## Item D — Project cover images (3 mínimo)

**Dónde:** `FeaturedProjects.tsx` (home) y `CaseStudyHero.tsx` (`/projects/[slug]`)
**Tamaño render:** `aspect-video`, grayscale por default, color on hover
**Tamaño source:** 1920×1080 o 1600×900
**Formato:** WebP, max 150KB por imagen

**Qué imagen por proyecto:**

| Proyecto | Qué capturar |
|---|---|
| **Colonial Iron Doors CRM** | Screenshot del dashboard real (producción), con un lead o KPI destacado. Si no hay acceso, captura del ambiente de login o de la nav. |
| **Candy Store e-commerce** | Screenshot de la home pública del store, o del product detail page. Captura en estado "vacío" para que se vea la estructura, no productos específicos. |
| **TalentInsight (Wizeline)** | Screenshot del assessment flow o del dashboard de resultados. Difuminar nombres si aparecen. |

**Por qué:** El Featured Projects es la sección de mayor credibilidad. Sin imágenes reales, son 3 cards con placeholder minimalista (que pusimos en el commit 3) que aguanta pero no vende.

**Notas:**
- Si una imagen no está disponible todavía, dejar el placeholder minimalista (`002`, `003` en mono)
- No inventar screenshots — pedir permiso antes de mostrar UI de clientes

---

## Item E — Client logos

**Dónde:** `components/sections/Clients.tsx` (reemplaza el text-marquee)
**Tamaño render:** altura fija 32-40px, ancho proporcional, B&W, opacity-30
**Tamaño source:** SVG ideal, PNG @2x mínimo
**Formato:** SVG o WebP

**Logos a conseguir (en orden de prioridad):**

1. **Colonial Iron Doors** (seguro — es tu cliente principal)
2. **Wizeline** (tienen el proyecto TalentInsight)
3. **Bengala Studios**
4. **Constellation Brands**
5. **Fundación Televisa**
6. **UTRC**
7. **GoLeta**

**Por qué:** Social proof visual inmediato. Reemplaza el text-marquee que hoy solo lee nombres.

**Notas:**
- Pedir versión B&W oficial de cada logo. Si no tienen, hacer un pase de desaturate en post
- Logos vectoriales (SVG) son ideales para mantener sharpness
- Altura uniforme (32-40px) — algunos logos tienen más aire que otros, ajustar
- Si un logo no se consigue en 1 semana, dejar el text-mark como fallback para ese cliente específico (no bloquear el resto)

---

## Item F — Yeblanca OS product screenshot

**Dónde:** Nueva sección entre "Solution" y "Features" en `app/[locale]/os/page.tsx`
**Tamaño render:** full-bleed dentro de `max-w-5xl`, `aspect-[16/10]`, 2px border
**Tamaño source:** 1920×1200
**Formato:** WebP

**Qué capturar:**
- Screenshot real del Yeblanca OS CRM (que ya corre en producción para Colonial Iron Doors)
- Sección ideal: dashboard principal o vista de leads/pipeline
- **Desaturar todo el screenshot**, luego realzar UN elemento en pink (un lead destacado, un KPI importante, el CTA principal)
- Asegurar que NO aparezca data confidencial de clientes reales (blur nombres, emails, teléfonos)

**Por qué:** El OS es tu producto más nuevo. La página de venta es 100% copy. Un screenshot vale por 10 párrafos y es la única zona donde el color controlado se gana — vende el producto, no solo el brand.

**Notas:**
- Este es el ÚNICO screenshot del sitio que NO es B&W estricto
- El elemento pink destacado debe ser deliberado — debe comunicar "esto es lo importante de este dashboard"
- Si no se puede usar data real, generar un screenshot con datos ficticios que respeten la estructura

---

## Item G — Testimonial avatar

**Dónde:** `components/sections/Testimonial.tsx`, al lado del attribution
**Tamaño render:** 48×48px, `rounded-full`, 2px border pink
**Tamaño source:** 256×256
**Formato:** WebP

**Qué foto:**
- Foto del cliente que da el testimonial (headshot, B&W)
- Si no se puede conseguir, dejar el initials placeholder con `JP` style (gris muted, no pink)

**Por qué:** Un quote con cara es 3x más creíble que un quote anónimo. Pero solo si el cliente acepta.

**Notas:**
- Pedir permiso ANTES de usar la foto. Si dice que no, no usar.
- Si no hay foto, generar un monograma con las iniciales del cliente en el mismo estilo que el founder placeholder

---

## Item H — Hero alternative (opcional, baja prioridad)

**Dónde:** `components/sections/Hero.tsx` (reemplaza el video del 3D Y)
**Tamaño render:** full-bleed con opacity 20% + overlay sólido (no gradient)
**Tamaño source:** 2400×1200 mínimo
**Formato:** WebP

**Qué foto:**
- Una still del taller de Colonial Iron Doors, o de Piedras Negras, o de un wireframe de proyecto
- B&W estricto
- Composición que aguante el `bg-bg/60` overlay encima sin perder legibilidad

**Por qué:** El video del 3D Y es "showy" — el brand es "quiet". Una still B&W dice más sobre quién eres.

**Notas:**
- ESTE ITEM ES OPCIONAL. El video actual es intencional y el usuario lo aprobó.
- Solo hacerlo si se decide mover del video.
- Si se hace, eliminar el gradient overlay (`bg-gradient-to-b from-bg via-bg/70 to-bg`) y reemplazarlo con un `bg-bg/60` sólido

---

## Decisiones de marca que respetar (reglas duras)

De `docs/BRAND_GUIDELINES_MARKETER.md`:

- ❌ No gradients en imágenes (ni overlays con gradient)
- ❌ No box-shadows en contenedores
- ❌ No rounded-full excepto avatars (`rounded-full` solo en Item A y G)
- ❌ No blue for links, no green for success — solo pink como accent
- ❌ No fondos de imagen en el hero (el video actual es la excepción, no la regla)
- ✅ 2px border en TODOS los contenedores de imagen
- ✅ Pink solo en: bordes destacados, hover, dividers, accent estratégico
- ✅ B&W estricto es la base; desaturado con pink selectivo solo en zona de producto (Item F)

---

## Workflow sugerido

1. **Sesión de foto founder (1h):** Capturar Items A y B. Necesitas: cámara o iPhone, trípode o superficie estable, fondo neutro o el setup de tu oficina. Luz natural de ventana funciona.
2. **Pase por Piedras Negras (2-3h):** Capturar Item C. Caminar el centro, pararte en el puente, fotografiar el taller si hay chance.
3. **Sesión de screenshots (1h):** Capturar Items D y F. Pedir acceso temporal a Colonial Iron Doors CRM o usar staging. Difuminar data sensible.
4. **Round de logos (1 semana de outreach):** Items E. Email a cada cliente, pedir versión B&W oficial.
5. **Testimonial photo (coordinar con cliente):** Item G. Solo si el cliente acepta.

Tiempo total estimado: 1 día de trabajo en campo + 1 semana de outreach para logos.

---

## Donde NO poner imágenes

Para evitar errores, no agregar imágenes en:

- `bg-bg` sections como fondo (el brand dice flat surfaces only)
- El interior del `Hero` (la excepción del video no se generaliza)
- Cards de servicios (deben ser 2px border + icon, no photo)
- El timeline de Methodology (es texto + línea central, no se beneficia de imagen)

---

*Last updated: 8 julio 2026*
*Auditado por: yeb UX audit, branch `fix/audit-ux-brand-fixes`*
