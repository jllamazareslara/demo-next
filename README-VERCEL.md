# 🚀 Desplegar en Vercel (Solución al Problema Local)

## ✅ Por qué Vercel es mejor:

- ✅ **No necesitas servidor local** - Todo funciona en la nube
- ✅ **URL pública inmediata** - Comparte con cualquiera
- ✅ **Gratis** para proyectos personales
- ✅ **Despliegue en 2 minutos**

---

## 📋 Pasos Rápidos:

### 1. Ejecuta el script preparador:
```bash
preparar-vercel.bat
```

### 2. Sube a GitHub:

**Si tienes Git instalado:**
```bash
git init
git add .
git commit -m "Demo Walled"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/walled-demo.git
git push -u origin main
```

**Si no tienes Git:**
- Ve a https://github.com/new
- Crea un repositorio nuevo
- Sigue las instrucciones para subir archivos

### 3. Despliega en Vercel:

1. Ve a: **https://vercel.com/new**
2. Haz clic en **"Import Git Repository"**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `walled-demo`
5. Vercel detectará automáticamente Next.js
6. **Añade estas variables de entorno:**

```
DATABASE_URL = file:./dev.db
NEXTAUTH_URL = https://TU-PROYECTO.vercel.app
NEXTAUTH_SECRET = (genera uno: openssl rand -base64 32)
GOOGLE_CLIENT_ID = (opcional, déjalo vacío)
GOOGLE_CLIENT_SECRET = (opcional, déjalo vacío)
```

7. Haz clic en **"Deploy"**
8. Espera 2-3 minutos
9. ¡Listo! Tendrás una URL como: `https://walled-demo.vercel.app`

---

## ⚠️ IMPORTANTE: Base de Datos

SQLite (`file:./dev.db`) **NO funciona en Vercel** porque es un sistema de archivos efímero.

**Solución: Usa Supabase (PostgreSQL gratuito)**

1. Ve a: https://supabase.com
2. Crea cuenta y proyecto nuevo
3. Ve a Settings → Database
4. Copia la **Connection String** (URI)
5. En Vercel, cambia `DATABASE_URL` a esa URI
6. Actualiza `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambia de "sqlite" a "postgresql"
  url      = env("DATABASE_URL")
}
```

7. Ejecuta migraciones (en Vercel se harán automáticamente en el build)

---

## 🌐 Conectar con tu Dominio

Para usar `demo.walledapp.es`:

1. En Vercel → Tu Proyecto → Settings → Domains
2. Añade: `demo.walledapp.es`
3. Vercel te dará instrucciones de DNS
4. En Hostinger → DNS Management:
   - Tipo: **CNAME**
   - Nombre: `demo`
   - Valor: `cname.vercel-dns.com` (o lo que indique Vercel)

---

## ✅ Resultado Final

Tu demo estará disponible en:
- `https://TU-PROYECTO.vercel.app` (URL de Vercel)
- O `https://demo.walledapp.es` (si configuraste el dominio)

**¡Ya no necesitas preocuparte por el servidor local!** 🎉

---

## 🆘 Ayuda

Si algo falla:
1. Revisa los **Logs** en Vercel (pestaña "Deployments")
2. Verifica las **Variables de Entorno**
3. Asegúrate de que la **base de datos** esté configurada

Lee `DEPLOY-VERCEL.md` para más detalles.

