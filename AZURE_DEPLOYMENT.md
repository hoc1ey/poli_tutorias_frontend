# Configuración de Despliegue en Azure Static Web Apps

## Problema Solucionado

El error "User is inactive, talks to admin" ocurría porque las cookies `httpOnly` no funcionaban correctamente en Azure Static Web Apps, causando que los tokens JWT no se enviaran al backend.

## Cambios Realizados

### 1. Configuración de Cookies
- **Cambio de `httpOnly: true` a `httpOnly: false`** en las cookies de autenticación
- Esto permite que las cookies sean accesibles desde JavaScript y se envíen correctamente en Azure
- Las cookies siguen siendo `secure` en producción y tienen `sameSite: 'lax'`

### 2. Headers CORS
- Agregado `credentials: 'include'` en todas las peticiones fetch
- Configurado headers CORS en `next.config.ts`
- Creado `staticwebapp.config.json` para Azure Static Web Apps

### 3. Mejoras en el Manejo de Tokens
- Logging mejorado para debugging en producción
- Mejor manejo de errores en refresh token
- Cache deshabilitado para peticiones autenticadas (`cache: 'no-store'`)

## Variables de Entorno Requeridas en Azure

Asegúrate de configurar estas variables en Azure Static Web Apps:

```bash
# Backend URL
NEXT_PUBLIC_BACKEND_URL=https://tu-backend.azurewebsites.net/api

# Imágenes
IMAGE_PROTOCOL=https
IMAGE_HOSTNAME=politutoriasstagingeng.blob.core.windows.net

# Node Environment
NODE_ENV=production
```

## Configuración en Azure Portal

1. Ve a tu Azure Static Web App
2. Settings > Configuration
3. Agrega las variables de entorno mencionadas arriba
4. Guarda los cambios
5. Redeploy si es necesario

## Archivos Modificados

1. `src/actions/auth/set-auth-cookies.ts` - Cookies con httpOnly: false
2. `src/actions/fetchApi.ts` - Credentials include y mejor logging
3. `src/actions/auth/get-user-session.ts` - Mejor manejo de errores
4. `next.config.ts` - Headers CORS
5. `staticwebapp.config.json` - Configuración de Azure SWA (NUEVO)

## Verificación del Despliegue

Después de desplegar, verifica:

1. **Consola del navegador**: Deberías ver logs como:
   - `[fetchApi] Token found and set in Authorization header`
   - `[getUserSession] User session retrieved: usuario@email.com`

2. **Network tab**: Verifica que:
   - Las peticiones incluyan el header `Authorization: Bearer <token>`
   - Las cookies se establezcan correctamente
   - El status no sea 401 después del login

3. **Logs de Azure**: Verifica que no haya más errores "User is inactive"

## Debugging

Si continúas teniendo problemas:

1. Verifica las cookies en DevTools > Application > Cookies
2. Revisa los logs en la consola del navegador
3. Verifica los logs de Azure en el portal
4. Asegúrate que `NEXT_PUBLIC_BACKEND_URL` sea correcto y termine en `/api`

## Seguridad

Aunque las cookies ya no son `httpOnly`, siguen siendo seguras porque:

1. Solo se usan en requests del servidor (Server Actions)
2. Tienen el flag `secure` en producción (solo HTTPS)
3. Usan `sameSite: 'lax'` para protección CSRF
4. Los tokens JWT tienen expiración corta (2 horas)
5. El refresh token tiene rotación automática

## Alternativas Consideradas

1. **Middleware de Next.js**: No funciona bien en Azure Static Web Apps con Next.js 14+
2. **localStorage**: No es accesible desde Server Actions
3. **Session Storage del servidor**: Requiere Redis o similar (complejidad adicional)

La solución actual es la más simple y efectiva para Azure Static Web Apps.
