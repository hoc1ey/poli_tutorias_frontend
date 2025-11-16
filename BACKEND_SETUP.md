# Configuración del Backend (NestJS) para Compatibilidad con Azure

## ⚠️ IMPORTANTE

Este frontend requiere configuración específica en el backend NestJS para funcionar correctamente en Azure Static Web Apps.

---

## 1. Configuración CORS

### En `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS con credenciales habilitadas
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://tu-frontend.azurestaticapps.net',
      // Agrega todas tus URLs de Azure SWA
    ],
    credentials: true, // ⭐ CRÍTICO
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
  });

  // Prefijo global
  app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
```

---

## 2. Estrategia JWT (jwt.strategy.ts)

### Verificación del usuario activo:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // ⭐ IMPORTANTE: Verificar que el usuario esté activo
    if (!user.isActive) {
      console.warn(`[JWT] Usuario inactivo intentó acceder: ${user.email}`);
      throw new UnauthorizedException('User is inactive, talks to admin');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
```

---

## 3. Estrategia Refresh Token (refresh-jwt.strategy.ts)

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // ⭐ También verificar en refresh
    if (!user.isActive) {
      console.warn(`[Refresh] Usuario inactivo intentó refrescar token: ${user.email}`);
      throw new UnauthorizedException('User is inactive, talks to admin');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
```

---

## 4. Controlador de Autenticación (auth.controller.ts)

### Login Endpoint:

```typescript
@Post('login')
async login(@Body() loginDto: LoginDto) {
  try {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.role,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ⭐ Verificar estado activo
    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talks to admin');
    }

    const tokens = await this.authService.generateTokens(user);

    return {
      success: true,
      message: 'Login successful',
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        // ... otros campos necesarios
      },
    };
  } catch (error) {
    throw error;
  }
}
```

### Refresh Endpoint:

```typescript
@Post('refresh')
@UseGuards(JwtRefreshAuthGuard)
async refresh(@Request() req) {
  const user = req.user;

  // ⭐ Doble verificación
  if (!user.isActive) {
    throw new UnauthorizedException('User is inactive, talks to admin');
  }

  const tokens = await this.authService.generateTokens(user);

  return {
    success: true,
    message: 'Token refreshed',
    data: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  };
}
```

---

## 5. Servicio de Autenticación (auth.service.ts)

```typescript
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, role: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    // Verificar rol
    if (user.role !== role) {
      return null;
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2h', // ⭐ Sincronizado con frontend
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // ⭐ Sincronizado con frontend
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
```

---

## 6. Variables de Entorno (.env)

```bash
# JWT Configuration
JWT_SECRET=tu-secreto-super-seguro-aqui
JWT_REFRESH_SECRET=tu-refresh-secret-diferente-aqui

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db

# CORS Origins (separados por coma)
ALLOWED_ORIGINS=http://localhost:3000,https://tu-frontend.azurestaticapps.net

# Azure Storage (si usas blob storage)
AZURE_STORAGE_CONNECTION_STRING=...
AZURE_STORAGE_CONTAINER=...
```

---

## 7. Guards Personalizados

### jwt-auth.guard.ts:

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Logging para debugging
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      console.warn('[JwtAuthGuard] No authorization header found');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('[JwtAuthGuard] Auth failed:', info?.message || err?.message);
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
```

---

## 8. Exception Filter Global

### all-exceptions.filter.ts:

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // ⭐ Logging detallado para errores de auth
    if (status === 401) {
      this.logger.warn(
        `[AUTH-401-001] Error de Cliente: ${message}`,
      );
      this.logger.warn({
        timestamp: new Date().toISOString(),
        errorCode: 'AUTH-401-001',
        path: request.url,
        method: request.method,
        statusCode: status,
        message,
        stack: exception instanceof Error ? exception.stack : undefined,
        params: request.params,
        query: request.query,
        user: request.user?.email || 'anonymous',
      });
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errorCode: status === 401 ? 'AUTH-401-001' : undefined,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

---

## 9. Checklist de Verificación Backend

- [ ] CORS configurado con `credentials: true`
- [ ] Origins incluyen URL de Azure SWA
- [ ] JWT secret configurado y seguro
- [ ] Refresh token secret diferente al access token
- [ ] Validación de `isActive` en ambas estrategias
- [ ] Expiración de tokens sincronizada con frontend
- [ ] Exception filter con logging adecuado
- [ ] Guards aplicados correctamente a rutas protegidas

---

## 10. Testing de Endpoints

### Usando cURL:

```bash
# Login
curl -X POST https://tu-backend.azurewebsites.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@test.com",
    "password": "password123",
    "role": "tutor"
  }'

# Usar el access token
curl -X GET https://tu-backend.azurewebsites.net/api/offer/user/?limit=10&offset=0 \
  -H "Authorization: Bearer TU_ACCESS_TOKEN_AQUI"

# Refresh token
curl -X POST https://tu-backend.azurewebsites.net/api/auth/refresh \
  -H "Authorization: Bearer TU_REFRESH_TOKEN_AQUI"
```

---

## 11. Despliegue en Azure

### Variables de Entorno en Azure App Service:

1. Ve a tu App Service en Azure Portal
2. Configuration > Application settings
3. Agrega:
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `DATABASE_URL`
   - `ALLOWED_ORIGINS` (incluye tu Azure SWA URL)

### Verificar CORS en Producción:

1. Ve a Azure App Service
2. Settings > CORS
3. ⚠️ NO uses la configuración de CORS de Azure, usa la de NestJS

---

## 📊 Diagnóstico de Problemas

### Usuario aparece como "anonymous"

**Causa**: El token no llega al backend  
**Solución**: 
- Verificar CORS credentials
- Verificar que el frontend envíe `Authorization` header

### "User is inactive, talks to admin"

**Causa**: El usuario realmente está inactivo en la BD  
**Solución**:
```sql
UPDATE users SET "isActive" = true WHERE email = 'usuario@email.com';
```

### Token expirado constantemente

**Causa**: Desincronización de tiempos  
**Solución**: Aumentar expiración o verificar zona horaria del servidor

---

**Autor**: Equipo de Desarrollo  
**Última actualización**: 10 de noviembre de 2025
