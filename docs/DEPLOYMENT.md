# Despliegue en producción

Esta guía deja el portfolio publicado en Vercel con un dominio propio. El proyecto genera HTML estático en `dist/`; no necesita variables de entorno, funciones, base de datos ni secretos.

## Decisiones de infraestructura

- **Hosting:** Vercel.
- **Repositorio fuente:** `pallerdev/personal_web`.
- **Rama de producción:** `main`.
- **Runtime de build:** Node.js 24 LTS.
- **Gestor de paquetes:** npm, mediante `npm ci`.
- **Build:** `npm run build`.
- **Directorio de salida:** `dist`.
- **CI:** GitHub Actions ejecuta tests, lint, formato, comprobación de Astro, build y pruebas E2E.

GitHub Pages no forma parte de la arquitectura final. La configuración antigua usa Jekyll sobre la raíz del repositorio y debe desactivarse durante el lanzamiento para evitar builds fallidos y dos URLs públicas diferentes.

## 1. Elegir el dominio canónico

La configuración actual presupone `https://paller.dev`. Si se utiliza otro dominio, actualiza antes del despliegue:

1. `src/config.ts`, constante `SITE_URL`.
2. `astro.config.ts`, propiedad `site`.
3. `public/robots.txt`, URL del sitemap.

Las tres URLs deben usar HTTPS, no terminar en `/` y apuntar al mismo dominio principal. Decide también si la variante `www` redirigirá al dominio raíz o al contrario; solo una debe ser canónica.

## 2. Ejecutar el preflight local

Desde la raíz del repositorio y con Node.js 24:

```bash
node --version
npm ci
npm test
npm run lint
npm run format:check
npm run check
npm run build
npm run test:e2e
```

El primer comando debe devolver `v24.x`. No publiques si alguna comprobación falla.

Confirma además que `git status --short` no muestra cambios sin guardar y que el workflow **Quality** del último commit está verde en GitHub Actions.

## 3. Importar el repositorio en Vercel

1. Inicia sesión en [Vercel](https://vercel.com/) con la cuenta que vaya a conservar el proyecto.
2. Pulsa **Add New → Project**.
3. Conecta GitHub, si todavía no está conectado, y autoriza el acceso a `pallerdev/personal_web`.
4. Importa el repositorio.
5. Revisa la configuración detectada:
   - Framework preset: **Astro**.
   - Root directory: `.`.
   - Install command: `npm ci`.
   - Build command: `npm run build`.
   - Output directory: `dist`.
   - Node.js version: **24.x**.
6. No añadas variables de entorno: el sitio no las utiliza.
7. Ejecuta el primer despliegue.

Vercel publicará `main` como producción y creará previews automáticas para futuras pull requests.

## 4. Configurar el dominio

En **Project Settings → Domains**:

1. Añade el dominio canónico elegido.
2. Añade también su variante con o sin `www` y configúrala como redirección permanente hacia el dominio canónico.
3. Copia los registros DNS indicados por Vercel en el proveedor del dominio.
4. Espera a que Vercel confirme DNS y certificado TLS.
5. Comprueba que HTTP redirige a HTTPS y que la variante secundaria redirige una sola vez al dominio canónico.

No cambies DNS antes de que el proyecto de Vercel esté creado y tenga un deployment correcto.

## 5. Retirar GitHub Pages antiguo

En GitHub abre **Settings → Pages** para `pallerdev/personal_web` y desactiva la publicación desde rama. Esto evita que Jekyll intente procesar los archivos `.astro` y elimina la web antigua como destino alternativo.

Desactivar Pages no borra el repositorio ni su historial. Puede volver a habilitarse más adelante si fuera necesario.

## 6. Verificación posterior al despliegue

Sustituye el dominio del ejemplo y ejecuta:

```bash
PLAYWRIGHT_BASE_URL=https://paller.dev npm run test:e2e
```

Comprueba manualmente:

- La portada y `/work/gardenview/` responden con estado `200`.
- Navegación, enlaces externos, email y descarga del CV, si se añade en el futuro.
- Layout en móvil y escritorio.
- Título, descripción, canonical, Open Graph y Twitter card.
- `https://paller.dev/robots.txt` y `https://paller.dev/sitemap-index.xml`.
- Ausencia de errores en la consola del navegador.
- Lighthouse sin regresiones importantes en rendimiento, accesibilidad, buenas prácticas y SEO.

## 7. Analytics y observación

El sitio no incluye tracking por defecto. Si se necesita una métrica mínima y sin añadir JavaScript de terceros al repositorio, activa **Web Analytics** y **Speed Insights** desde el panel del proyecto en Vercel. Documenta la decisión de privacidad antes de activar cualquier herramienta adicional.

Durante las primeras semanas revisa:

- Fallos de deployments en Vercel.
- Estado del workflow **Quality** en GitHub.
- Core Web Vitals en Speed Insights, si se activa.
- Errores 404 y enlaces rotos tras cambios de contenido.

## Rollback

Si una publicación introduce una regresión:

1. Abre **Deployments** en Vercel.
2. Selecciona el último deployment estable.
3. Promuévelo de nuevo a producción.
4. Corrige el problema en una rama y deja que GitHub Actions valide el cambio antes de fusionarlo.

El rollback de Vercel no sustituye revertir o corregir el commit defectuoso en Git; ambos historiales deben volver a representar el mismo estado estable.
