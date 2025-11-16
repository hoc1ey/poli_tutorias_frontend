# PoliTutorías Frontend

Sistema de gestión de tutorías desarrollado con Next.js 15, desplegado en Azure Static Web Apps.

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd poli_tutorias_frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus valores:
   ```bash
   NEXT_PUBLIC_BACKEND_URL="http://localhost:3001/api"
   IMAGE_PROTOCOL="http"
   IMAGE_HOSTNAME="127.0.0.1"
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   El servidor corre por defecto en [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run verify:azure # Verificar configuración de Azure
```

---

## 🌐 Despliegue en Azure

### Configuración Requerida

Este proyecto está optimizado para **Azure Static Web Apps** con configuración especial de autenticación.

### Variables de Entorno en Azure

Configura en Azure Portal > Static Web App > Configuration:

```bash
NEXT_PUBLIC_BACKEND_URL=https://tu-backend.azurewebsites.net/api
IMAGE_PROTOCOL=https
IMAGE_HOSTNAME=tu-storage.blob.core.windows.net
NODE_ENV=production
```

### Verificación antes de desplegar

```bash
npm run verify:azure
```

Este comando verifica que la configuración esté correcta para Azure.

### Documentación de Despliegue

- 📘 [**AZURE_DEPLOYMENT.md**](./AZURE_DEPLOYMENT.md) - Guía completa de despliegue en Azure
- 🔧 [**TROUBLESHOOTING_AUTH.md**](./TROUBLESHOOTING_AUTH.md) - Solución de problemas de autenticación
- 🔐 [**BACKEND_SETUP.md**](./BACKEND_SETUP.md) - Configuración del backend NestJS
- 📋 [**CHANGELOG_AUTH_FIX.md**](./CHANGELOG_AUTH_FIX.md) - Resumen de cambios recientes

---

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) con las siguientes características:

- ✅ Access Token (2 horas de validez)
- ✅ Refresh Token (7 días de validez)
- ✅ Rotación automática de tokens
- ✅ Server Actions de Next.js
- ✅ Cookies seguras con flags apropiados para Azure

### Flujo de Autenticación

1. Usuario hace login → Recibe access y refresh tokens
2. Tokens se guardan en cookies
3. Cada petición incluye el token en header `Authorization`
4. Si el access token expira, se usa refresh token automáticamente
5. Al hacer logout, se limpian todas las cookies

---

## 🏗️ Estructura del Proyecto

```
poli_tutorias_frontend/
├── src/
│   ├── actions/           # Server Actions
│   │   ├── auth/         # Autenticación
│   │   ├── offer/        # Ofertas de tutorías
│   │   └── fetchApi.ts   # Cliente API con auth
│   ├── app/              # App Router de Next.js
│   │   ├── auth/         # Páginas de autenticación
│   │   ├── student/      # Área de estudiantes
│   │   └── tutor/        # Área de tutores
│   ├── components/       # Componentes React
│   ├── hooks/            # Custom hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── store/            # Zustand stores
│   └── utils/            # Utilidades
├── public/               # Archivos estáticos
├── scripts/              # Scripts de utilidad
│   └── verify-azure-config.js
├── staticwebapp.config.json  # Config de Azure SWA
├── next.config.ts        # Config de Next.js
└── package.json
```

---

## 🛠️ Tecnologías

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Forms**: React Hook Form
- **State**: Zustand
- **Icons**: React Icons
- **Build**: Turbopack
- **Deployment**: Azure Static Web Apps
- **Backend**: NestJS (separado)

---

## 🐛 Troubleshooting

### Error: "User is inactive, talks to admin"

Este error indica problemas con la autenticación en Azure. Consulta:
- [TROUBLESHOOTING_AUTH.md](./TROUBLESHOOTING_AUTH.md)

### Cookies no funcionan en Azure

Verifica:
1. Variables de entorno configuradas correctamente
2. Backend con CORS habilitado (`credentials: true`)
3. `staticwebapp.config.json` presente en el root

### Build falla

```bash
# Limpiar cache y rebuildir
rm -rf .next node_modules
npm install
npm run build
```

---

## 📝 Convenciones de Código

- **Componentes**: PascalCase (`ProfileImage.tsx`)
- **Archivos de utilidad**: camelCase (`fetchApi.ts`)
- **Server Actions**: kebab-case (`set-auth-cookies.ts`)
- **Constantes**: UPPER_SNAKE_CASE
- **CSS**: Tailwind CSS (utilidades primero)

---

## 🤝 Contribuir

1. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit: `git commit -m 'Add: nueva funcionalidad'`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y pertenece a la Escuela Politécnica Nacional.

---

## 👥 Equipo

Desarrollado por estudiantes de DTIC - EPN

---

## 📞 Soporte

Para problemas o preguntas:
- Revisa la documentación en `/docs`
- Consulta [TROUBLESHOOTING_AUTH.md](./TROUBLESHOOTING_AUTH.md)
- Contacta al equipo de desarrollo

---

**Última actualización**: Noviembre 2025
