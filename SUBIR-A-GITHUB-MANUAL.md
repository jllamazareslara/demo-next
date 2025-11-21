# 📤 Cómo Subir la Carpeta a GitHub (Manual)

## Opción 1: Usando el Script Automático (Recomendado)

1. **Ejecuta:** `subir-a-github.bat`
2. Sigue las instrucciones en pantalla
3. ¡Listo!

---

## Opción 2: Usando GitHub Desktop (Más Fácil)

### Si NO tienes Git instalado:

1. **Descarga GitHub Desktop:**
   - Ve a: https://desktop.github.com
   - Instala GitHub Desktop

2. **Crea repositorio en GitHub:**
   - Ve a: https://github.com/new
   - Nombre: `walled-demo`
   - NO marques "Initialize with README"
   - Haz clic en "Create repository"

3. **Abre GitHub Desktop:**
   - File → Add Local Repository
   - Selecciona la carpeta: `C:\Users\juanl\OneDrive\Documentos\Walled\Landing\demo-next`
   - Haz clic en "Add repository"

4. **Publica el repositorio:**
   - Haz clic en "Publish repository"
   - Selecciona tu cuenta de GitHub
   - Nombre: `walled-demo`
   - Haz clic en "Publish repository"

5. **¡Listo!** Tu código está en GitHub

---

## Opción 3: Usando la Web de GitHub (Sin Git)

1. **Crea repositorio en GitHub:**
   - Ve a: https://github.com/new
   - Nombre: `walled-demo`
   - Marca "Initialize with README" (opcional)
   - Haz clic en "Create repository"

2. **Sube archivos manualmente:**
   - En la página del repositorio, haz clic en "uploading an existing file"
   - Arrastra TODA la carpeta `demo-next` (o selecciona todos los archivos)
   - Escribe un mensaje de commit: "Initial commit - Demo Walled"
   - Haz clic en "Commit changes"

3. **¡Listo!** Tu código está en GitHub

---

## Opción 4: Usando Git por Línea de Comandos

Si tienes Git instalado, abre una terminal en la carpeta `demo-next` y ejecuta:

```bash
# Inicializar repositorio
git init

# Añadir todos los archivos
git add .

# Crear commit
git commit -m "Demo de Walled - Dashboard financiero automático"

# Crear rama main
git branch -M main

# Añadir repositorio remoto (reemplaza TU_URL con tu URL de GitHub)
git remote add origin https://github.com/TU_USUARIO/walled-demo.git

# Subir a GitHub
git push -u origin main
```

---

## ⚠️ IMPORTANTE: Archivos que NO se suben

Estos archivos están en `.gitignore` y NO se subirán (está bien):
- `node_modules/` (se instalan automáticamente)
- `.env` (tus credenciales, no las subas)
- `dev.db` (base de datos local)
- `.next/` (carpeta de build)

---

## ✅ Después de Subir

Una vez que tu código esté en GitHub:

1. Ve a: https://vercel.com/new
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `walled-demo`
4. Vercel detectará Next.js automáticamente
5. Configura las variables de entorno
6. ¡Deploy!

---

## 🆘 Problemas Comunes

**"Repository not found"**
- Verifica que el repositorio existe en GitHub
- Verifica que tienes permisos para escribir

**"Authentication failed"**
- GitHub ya no acepta contraseñas
- Usa un Personal Access Token:
  1. GitHub → Settings → Developer settings → Personal access tokens
  2. Generate new token
  3. Usa ese token como contraseña

**"Large files"**
- GitHub tiene límite de 100MB por archivo
- Si `node_modules` es muy grande, está bien (no se sube por .gitignore)

