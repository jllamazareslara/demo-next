# 🚀 Desplegar la Demo en Vercel (GRATIS)

## ✅ Ventajas de Vercel:
- ✅ **Gratis** para proyectos personales
- ✅ **URL pública** inmediata (ej: `walled-demo.vercel.app`)
- ✅ **Despliegue automático** desde GitHub
- ✅ **Sin problemas de servidor local**
- ✅ **SSL automático** (https)
- ✅ **Soporte completo para Next.js**

---

## 📋 Pasos para Desplegar:

### 1. Crear cuenta en Vercel (si no tienes)

1. Ve a: https://vercel.com
2. Haz clic en **"Sign Up"**
3. Elige **"Continue with GitHub"** (más fácil)

### 2. Subir el código a GitHub

**Opción A: Si ya tienes GitHub**
```bash
cd "C:\Users\juanl\OneDrive\Documentos\Walled\Landing\demo-next"
git init
git add .
git commit -m "Demo de Walled"
git branch -M main
git remote add origin TU_REPO_URL
git push -u origin main
```

**Opción B: Crear repo nuevo en GitHub**
1. Ve a: https://github.com/new
2. Crea un repositorio nuevo (ej: `walled-demo`)
3. Sigue las instrucciones de GitHub para subir el código

### 3. Conectar con Vercel

1. Ve a: https://vercel.com/new
2. Haz clic en **"Import Git Repository"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es Next.js

### 4. Configurar Variables de Entorno

En Vercel, antes de hacer deploy, añade estas variables:

**Variables obligatorias:**
```
DATABASE_URL = file:./dev.db
NEXTAUTH_URL = https://TU-PROYECTO.vercel.app
NEXTAUTH_SECRET = (genera uno con: openssl rand -base64 32)
```

**Variables de Google OAuth (opcional por ahora):**
```
GOOGLE_CLIENT_ID = (déjalo vacío si no lo tienes)
GOOGLE_CLIENT_SECRET = (déjalo vacío si no lo tienes)
```

**⚠️ IMPORTANTE:** Para SQLite en Vercel, necesitarás usar una base de datos diferente:
- **Opción 1:** Usar **Supabase** (PostgreSQL gratuito)
- **Opción 2:** Usar **Turso** (SQLite en la nube)
- **Opción 3:** Usar **PlanetScale** (MySQL gratuito)

### 5. Hacer el Deploy

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Listo! Tendrás una URL como: `https://walled-demo.vercel.app`

---

## 🔧 Configurar Base de Datos en la Nube

### Opción Recomendada: Supabase (PostgreSQL)

1. Ve a: https://supabase.com
2. Crea un proyecto gratuito
3. Copia la **Connection String** (está en Settings → Database)
4. En Vercel, cambia `DATABASE_URL` a esa conexión
5. Actualiza `prisma/schema.prisma` para usar PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

6. Ejecuta las migraciones:
```bash
npx prisma migrate deploy
```

---

## 🌐 Conectar con tu Dominio (Opcional)

Si quieres usar `demo.walledapp.es`:

1. En Vercel → Settings → Domains
2. Añade: `demo.walledapp.es`
3. Vercel te dará instrucciones de DNS
4. En Hostinger → DNS Management:
   - Añade registro **CNAME**:
     - Nombre: `demo`
     - Valor: `cname.vercel-dns.com`

---

## ✅ Después del Deploy

Tu demo estará disponible en:
- `https://TU-PROYECTO.vercel.app`
- O `https://demo.walledapp.es` (si configuraste el dominio)

**¡Ya no necesitas el servidor local!** 🎉

---

## 🆘 Si algo falla

1. Revisa los **Logs** en Vercel (pestaña "Deployments")
2. Verifica que todas las **Variables de Entorno** estén configuradas
3. Asegúrate de que la **base de datos** esté configurada correctamente

