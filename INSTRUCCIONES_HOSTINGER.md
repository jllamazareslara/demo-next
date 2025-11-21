# Instrucciones para subir la demo a Hostinger

## ⚠️ IMPORTANTE: Requisitos previos

Esta aplicación Next.js **requiere Node.js** para funcionar. Hostinger en hosting compartido normalmente **NO soporta** aplicaciones Node.js.

**Opciones:**
1. **Si tienes plan VPS/Business de Hostinger** → Sigue estas instrucciones
2. **Si tienes hosting compartido** → Usa Vercel (gratis) y conecta el subdominio

---

## 📦 Qué subir a Hostinger

Si tu plan de Hostinger soporta Node.js, sube estos archivos y carpetas a `public_html/demo/`:

### Archivos y carpetas necesarios:
```
demo/
├── .next/              (carpeta generada por `npm run build`)
├── node_modules/       (carpeta con dependencias)
├── public/            (archivos estáticos)
├── prisma/            (schema y migraciones)
├── src/               (código fuente)
├── dev.db             (base de datos SQLite - se crea automáticamente)
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── .env               (variables de entorno - ¡NO subas este archivo con datos reales!)
```

### ⚠️ NO subas:
- `.env` con credenciales reales (usa variables de entorno en el panel de Hostinger)
- `node_modules` si Hostinger puede ejecutar `npm install`

---

## 🔧 Pasos para desplegar

### 1. Generar el build localmente

En tu PC, desde la carpeta `demo-next`:

```bash
npm install
npm run build
npx prisma generate
```

Esto creará la carpeta `.next` con los archivos optimizados.

### 2. Subir archivos a Hostinger

1. Entra al **Panel de archivos de Hostinger**
2. Ve a `public_html`
3. Crea una carpeta llamada `demo`
4. Sube todos los archivos y carpetas listados arriba (excepto `.env`)

### 3. Configurar Node.js en Hostinger

1. En el panel de Hostinger, busca **"Node.js"** o **"Aplicaciones"**
2. Crea una nueva aplicación Node.js:
   - **Directorio**: `public_html/demo`
   - **Versión de Node**: 18.x o superior
   - **Comando de inicio**: `npm start`
   - **Puerto**: El que te asigne Hostinger (normalmente 3000 o similar)

### 4. Configurar variables de entorno

En el panel de Node.js de Hostinger, añade estas variables:

```
NODE_ENV=production
NEXTAUTH_URL=https://walledapp.es/demo
NEXTAUTH_SECRET=tu_secret_generado_aqui
GOOGLE_CLIENT_ID=tu_client_id_de_google
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google
DATABASE_URL=file:./dev.db
```

**Para generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Instalar dependencias en el servidor

Si Hostinger no lo hace automáticamente, ejecuta en el servidor:

```bash
cd public_html/demo
npm install --production
npx prisma generate
npx prisma migrate deploy
```

### 6. Iniciar la aplicación

En el panel de Node.js, inicia la aplicación. Debería estar disponible en:
- `https://walledapp.es/demo` (si configuraste el proxy)
- O en el puerto que te asignó Hostinger

---

## 🌐 Configurar el subdominio (opcional pero recomendado)

Si prefieres usar `demo.walledapp.es`:

1. En Hostinger → **DNS Management**
2. Añade un registro:
   - **Tipo**: CNAME
   - **Nombre**: `demo`
   - **Valor**: `walledapp.es` (o la IP del servidor Node.js)

3. Actualiza `NEXTAUTH_URL` a `https://demo.walledapp.es`

---

## ✅ Verificar que funciona

1. Visita `https://walledapp.es/demo`
2. Deberías ver la página de login
3. Haz clic en "Continuar con Google"
4. Si funciona, ¡listo! 🎉

---

## 🆘 Si no funciona

**Problema**: Hostinger no soporta Node.js en tu plan

**Solución**: Usa Vercel (gratis):
1. Sube `demo-next` a GitHub
2. Conecta GitHub con Vercel
3. Vercel despliega automáticamente
4. Añade `demo.walledapp.es` como dominio personalizado en Vercel
5. Configura el DNS en Hostinger apuntando a Vercel

---

## 📝 Notas adicionales

- La base de datos SQLite (`dev.db`) se crea automáticamente la primera vez que se ejecuta
- Asegúrate de que el servidor tenga permisos de escritura en la carpeta `demo` para crear la BD
- Si cambias algo en el código, necesitas hacer `npm run build` de nuevo y subir la carpeta `.next` actualizada

