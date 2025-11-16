#!/usr/bin/env node

/**
 * Script de verificación para validar la configuración de Azure Static Web Apps
 * Ejecuta: node scripts/verify-azure-config.js
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

console.log(`${BLUE}🔍 Verificando configuración para Azure Static Web Apps...${RESET}\n`);

let hasErrors = false;
let hasWarnings = false;

// 1. Verificar que existe staticwebapp.config.json
console.log('1️⃣  Verificando staticwebapp.config.json...');
const swaConfigPath = path.join(process.cwd(), 'staticwebapp.config.json');
if (fs.existsSync(swaConfigPath)) {
  console.log(`${GREEN}   ✓ staticwebapp.config.json existe${RESET}`);

  try {
    const swaConfig = JSON.parse(fs.readFileSync(swaConfigPath, 'utf8'));

    if (swaConfig.globalHeaders?.['Access-Control-Allow-Credentials'] === 'true') {
      console.log(`${GREEN}   ✓ CORS credentials configurado${RESET}`);
    } else {
      console.log(`${YELLOW}   ⚠ Falta configuración de CORS credentials${RESET}`);
      hasWarnings = true;
    }
  } catch (error) {
    console.log(`${RED}   ✗ Error al leer staticwebapp.config.json: ${error.message}${RESET}`);
    hasErrors = true;
  }
} else {
  console.log(`${RED}   ✗ staticwebapp.config.json no existe${RESET}`);
  hasErrors = true;
}

// 2. Verificar next.config.ts
console.log('\n2️⃣  Verificando next.config.ts...');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  console.log(`${GREEN}   ✓ next.config.ts existe${RESET}`);

  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

  if (nextConfigContent.includes('headers()')) {
    console.log(`${GREEN}   ✓ Headers CORS configurados en next.config.ts${RESET}`);
  } else {
    console.log(`${YELLOW}   ⚠ No se encontró configuración de headers en next.config.ts${RESET}`);
    hasWarnings = true;
  }

  if (nextConfigContent.includes('output: "standalone"')) {
    console.log(`${GREEN}   ✓ Output standalone configurado${RESET}`);
  } else {
    console.log(`${RED}   ✗ Falta output: "standalone" en next.config.ts${RESET}`);
    hasErrors = true;
  }
} else {
  console.log(`${RED}   ✗ next.config.ts no existe${RESET}`);
  hasErrors = true;
}

// 3. Verificar configuración de cookies
console.log('\n3️⃣  Verificando configuración de cookies...');
const setAuthCookiesPath = path.join(process.cwd(), 'src/actions/auth/set-auth-cookies.ts');
if (fs.existsSync(setAuthCookiesPath)) {
  const cookiesContent = fs.readFileSync(setAuthCookiesPath, 'utf8');

  if (cookiesContent.includes('httpOnly: false')) {
    console.log(`${GREEN}   ✓ Cookies configuradas con httpOnly: false (correcto para Azure)${RESET}`);
  } else if (cookiesContent.includes('httpOnly: true')) {
    console.log(`${RED}   ✗ Cookies con httpOnly: true (no funciona en Azure)${RESET}`);
    hasErrors = true;
  }

  if (cookiesContent.includes("path: '/'")) {
    console.log(`${GREEN}   ✓ Path configurado en cookies${RESET}`);
  } else {
    console.log(`${YELLOW}   ⚠ Se recomienda agregar path: '/' a las cookies${RESET}`);
    hasWarnings = true;
  }
} else {
  console.log(`${RED}   ✗ set-auth-cookies.ts no encontrado${RESET}`);
  hasErrors = true;
}

// 4. Verificar fetchApi
console.log('\n4️⃣  Verificando fetchApi.ts...');
const fetchApiPath = path.join(process.cwd(), 'src/actions/fetchApi.ts');
if (fs.existsSync(fetchApiPath)) {
  const fetchContent = fs.readFileSync(fetchApiPath, 'utf8');

  if (fetchContent.includes("credentials: 'include'")) {
    console.log(`${GREEN}   ✓ credentials: 'include' configurado${RESET}`);
  } else {
    console.log(`${RED}   ✗ Falta credentials: 'include' en fetch${RESET}`);
    hasErrors = true;
  }

  if (fetchContent.includes("cache: 'no-store'") || fetchContent.includes('cache: options.cache ||')) {
    console.log(`${GREEN}   ✓ Cache configurado correctamente${RESET}`);
  } else {
    console.log(`${YELLOW}   ⚠ Se recomienda configurar cache: 'no-store'${RESET}`);
    hasWarnings = true;
  }
} else {
  console.log(`${RED}   ✗ fetchApi.ts no encontrado${RESET}`);
  hasErrors = true;
}

// 5. Verificar variables de entorno
console.log('\n5️⃣  Verificando variables de entorno...');
const envExamplePath = path.join(process.cwd(), '.env.example');
if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf8');

  const requiredVars = [
    'NEXT_PUBLIC_BACKEND_URL',
    'IMAGE_PROTOCOL',
    'IMAGE_HOSTNAME'
  ];

  let missingVars = [];
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`${GREEN}   ✓ ${varName} definida${RESET}`);
    } else {
      console.log(`${RED}   ✗ ${varName} falta en .env.example${RESET}`);
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    hasErrors = true;
  }
} else {
  console.log(`${YELLOW}   ⚠ .env.example no encontrado${RESET}`);
  hasWarnings = true;
}

// 6. Verificar documentación
console.log('\n6️⃣  Verificando documentación...');
const docs = [
  'AZURE_DEPLOYMENT.md',
  'TROUBLESHOOTING_AUTH.md'
];

docs.forEach(doc => {
  const docPath = path.join(process.cwd(), doc);
  if (fs.existsSync(docPath)) {
    console.log(`${GREEN}   ✓ ${doc} existe${RESET}`);
  } else {
    console.log(`${YELLOW}   ⚠ ${doc} no encontrado${RESET}`);
    hasWarnings = true;
  }
});

// Resumen
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log(`${RED}❌ Se encontraron errores críticos${RESET}`);
  console.log(`${RED}   La aplicación puede no funcionar correctamente en Azure${RESET}`);
  process.exit(1);
} else if (hasWarnings) {
  console.log(`${YELLOW}⚠️  Se encontraron advertencias${RESET}`);
  console.log(`${YELLOW}   La aplicación debería funcionar, pero revisa las advertencias${RESET}`);
  process.exit(0);
} else {
  console.log(`${GREEN}✅ Configuración correcta para Azure Static Web Apps${RESET}`);
  console.log(`${GREEN}   La aplicación está lista para desplegar${RESET}`);
  process.exit(0);
}
