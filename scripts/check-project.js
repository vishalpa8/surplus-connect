#!/usr/bin/env node

/**
 * Project Health Check Script
 * Validates project structure, dependencies, and configuration
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`)
};

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} exists`);
    return true;
  } else {
    log.error(`${description} missing: ${filePath}`);
    return false;
  }
}

function checkDirectoryStructure() {
  log.header('📁 Checking Directory Structure');
  
  const requiredDirs = [
    'src/app',
    'src/components',
    'src/components/ui',
    'src/components/landing',
    'src/components/layout',
    'src/components/dashboard',
    'src/components/forms',
    'src/components/charts',
    'src/components/map',
    'src/components/providers',
    'src/context',
    'src/hooks',
    'src/lib',
    'src/types',
    'public'
  ];

  let allExist = true;
  requiredDirs.forEach(dir => {
    if (!checkFileExists(dir, `Directory ${dir}`)) {
      allExist = false;
    }
  });

  return allExist;
}

function checkConfigFiles() {
  log.header('⚙️ Checking Configuration Files');
  
  const configFiles = [
    { path: 'package.json', desc: 'Package configuration' },
    { path: 'tsconfig.json', desc: 'TypeScript configuration' },
    { path: 'tailwind.config.mjs', desc: 'Tailwind configuration' },
    { path: 'next.config.js', desc: 'Next.js configuration' },
    { path: 'postcss.config.js', desc: 'PostCSS configuration' },
    { path: '.eslintrc.json', desc: 'ESLint configuration' },
    { path: '.env', desc: 'Environment variables' }
  ];

  let allExist = true;
  configFiles.forEach(file => {
    if (!checkFileExists(file.path, file.desc)) {
      allExist = false;
    }
  });

  return allExist;
}

function checkCoreComponents() {
  log.header('🧩 Checking Core Components');
  
  const coreComponents = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/components/providers/ClientProviders.tsx',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/ui/Button.tsx',
    'src/components/ui/Input.tsx',
    'src/components/ui/Card.tsx',
    'src/components/ui/ErrorBoundary.tsx',
    'src/context/AuthContext.tsx',
    'src/lib/utils.ts',
    'src/types/index.ts'
  ];

  let allExist = true;
  coreComponents.forEach(component => {
    if (!checkFileExists(component, `Component ${path.basename(component)}`)) {
      allExist = false;
    }
  });

  return allExist;
}

function checkHooks() {
  log.header('🪝 Checking Custom Hooks');
  
  const hooks = [
    'src/hooks/useResponsive.ts',
    'src/hooks/useLocalStorage.ts',
    'src/hooks/useDebounce.ts',
    'src/hooks/useAsync.ts',
    'src/hooks/useForm.ts',
    'src/hooks/useApi.ts',
    'src/hooks/index.ts'
  ];

  let allExist = true;
  hooks.forEach(hook => {
    if (!checkFileExists(hook, `Hook ${path.basename(hook)}`)) {
      allExist = false;
    }
  });

  return allExist;
}

function checkUtilities() {
  log.header('🛠️ Checking Utility Libraries');
  
  const utilities = [
    'src/lib/validations.ts',
    'src/lib/api.ts',
    'src/lib/geolocation.ts',
    'src/lib/performance.ts',
    'src/lib/errorHandling.ts',
    'src/lib/accessibility.ts',
    'src/lib/env.ts',
    'src/lib/constants.ts',
    'src/lib/index.ts'
  ];

  let allExist = true;
  utilities.forEach(util => {
    if (!checkFileExists(util, `Utility ${path.basename(util)}`)) {
      allExist = false;
    }
  });

  return allExist;
}

function checkPackageJson() {
  log.header('📦 Checking Package Dependencies');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = [
      'next',
      'react',
      'react-dom',
      'typescript',
      '@types/react',
      '@types/node',
      'tailwindcss',
      'zod',
      'clsx',
      'lucide-react'
    ];

    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    let allPresent = true;
    requiredDeps.forEach(dep => {
      if (allDeps[dep]) {
        log.success(`Dependency ${dep} found`);
      } else {
        log.error(`Missing dependency: ${dep}`);
        allPresent = false;
      }
    });

    return allPresent;
  } catch (error) {
    log.error('Failed to read package.json');
    return false;
  }
}

function checkEnvironmentVariables() {
  log.header('🌍 Checking Environment Configuration');
  
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    
    const requiredVars = [
      'NEXT_PUBLIC_APP_URL',
      'NEXT_PUBLIC_API_URL'
    ];

    let allPresent = true;
    requiredVars.forEach(varName => {
      if (envContent.includes(varName)) {
        log.success(`Environment variable ${varName} configured`);
      } else {
        log.warning(`Environment variable ${varName} not found (may be optional)`);
      }
    });

    return allPresent;
  } catch (error) {
    log.error('Failed to read .env file');
    return false;
  }
}

function generateReport(results) {
  log.header('📊 Project Health Report');
  
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  const score = Math.round((passedChecks / totalChecks) * 100);

  console.log(`\nOverall Score: ${score}% (${passedChecks}/${totalChecks} checks passed)\n`);

  if (score === 100) {
    log.success('🎉 Perfect! Your project is fully optimized and ready for development.');
  } else if (score >= 80) {
    log.success('✨ Great! Your project is well-structured with minor issues to address.');
  } else if (score >= 60) {
    log.warning('⚡ Good foundation, but some important components are missing.');
  } else {
    log.error('🔧 Significant setup required. Please address the missing components.');
  }

  console.log('\nNext steps:');
  console.log('1. Run `npm install` to install dependencies');
  console.log('2. Run `npm run dev` to start development server');
  console.log('3. Check DEVELOPMENT.md for detailed setup instructions');
  console.log('4. Review any missing components listed above\n');
}

function main() {
  console.log(`${colors.bold}${colors.blue}🚀 SurplusConnect Project Health Check${colors.reset}\n`);
  
  const results = {
    directoryStructure: checkDirectoryStructure(),
    configFiles: checkConfigFiles(),
    coreComponents: checkCoreComponents(),
    hooks: checkHooks(),
    utilities: checkUtilities(),
    packageDependencies: checkPackageJson(),
    environmentVariables: checkEnvironmentVariables()
  };

  generateReport(results);
}

// Run the health check
main();