# frontend Challenge Rimac - Seguro Salud Flexible

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web desarrollada para el frontend challenge de Rimac, que simula un proceso de cotización de seguros de salud. La aplicación permite a los usuarios ingresar sus datos personales, seleccionar un plan de seguro y obtener un resumen de la cotización.

## 🛠️ Tecnologías Utilizadas

### Frontend Framework

- **React 19.1.1** - Framework principal para la construcción de la interfaz de usuario
- **React Router 7.9.2** - Manejo de rutas y navegación en la aplicación
- **TypeScript 5.9.2** - Tipado estático para mayor robustez del código

### Gestión de Estado y Datos

- **@tanstack/react-query 5.90.5** - Manejo de estado del servidor y caché de datos
- **@tanstack/react-form 1.23.7** - Gestión avanzada de formularios con validaciones
- **React Context API** - Estado global de la aplicación para datos del usuario

### Estilos y UI

- **Tailwind CSS 4.1.13** - Framework de CSS utilitario para diseño responsivo
- **@tailwindcss/vite 4.1.13** - Integración de Tailwind con Vite

### Herramientas de Desarrollo

- **Vite 7.1.7** - Bundler y servidor de desarrollo rápido
- **@react-router/dev 7.9.2** - Herramientas de desarrollo para React Router
- **vite-tsconfig-paths 5.1.4** - Soporte para path mapping en TypeScript

### Servidor y Despliegue

- **@react-router/node 7.9.2** - Adaptador para Node.js
- **@react-router/serve 7.9.2** - Servidor de producción
- **isbot 5.1.31** - Detección de bots para SSR

## 🎯 Justificación de Tecnologías

### React Router v7

Se seleccionó React Router v7 por su enfoque moderno en el manejo de rutas, incluyendo:

- File-based routing
- Server-side rendering (SSR) nativo
- Optimizaciones automáticas de carga
- Mejor integración con herramientas de desarrollo

### TanStack Query

Elegido para el manejo de datos del servidor debido a:

- Caché inteligente y sincronización automática
- Estados de carga y error integrados
- Optimistic updates
- Mejor experiencia de usuario con datos asíncronos

### TanStack Form

Seleccionado para formularios por:

- Validaciones robustas y declarativas
- Manejo de estado de formularios complejos
- Integración perfecta con TypeScript
- Mejor rendimiento que alternativas como Formik

### Tailwind CSS

Elegido para estilos por:

- Desarrollo rápido con clases utilitarias
- Diseño responsivo nativo
- Consistencia visual
- Optimización automática de CSS

## 📁 Estructura del Proyecto

```
app/
├── components/           # Componentes reutilizables
│   ├── header.tsx        # Header de la aplicación
│   ├── icons.tsx         # Iconos SVG personalizados
│   └── logo.tsx          # Componente del logo de Rimac
├── routes/               # Páginas de la aplicación
│   ├── home.tsx          # Página principal con formulario
│   ├── step-one.tsx      # Selección de planes
│   ├── step-two.tsx      # Resumen de cotización
│   └── steps-layout.tsx  # Layout para pasos del proceso
├── context.tsx           # Context API para estado global
├── root.tsx              # Componente raíz de la aplicación
├── routes.ts             # Configuración de rutas
└── app.css               # Estilos globales
```

## 🔄 División de Tareas

### 1. Configuración Inicial

- Setup del proyecto con React Router v7
- Configuración de TypeScript y Vite
- Integración de Tailwind CSS
- Estructura básica de rutas

### 2. Desarrollo de Componentes Base

- Creación del sistema de iconos SVG
- Desarrollo del componente Logo
- Implementación del Header
- Estilos globales y tema

### 3. Página Principal (Home)

- Formulario de datos personales
- Validaciones de campos (DNI, RUC, CE, teléfono)
- Integración con API externa para datos del usuario
- Manejo de estado con Context API

### 4. Selección de Planes (Step One)

- Integración con TanStack Query para obtener planes
- Componente de selección de tipo de cotización
- Cards de planes con información detallada
- Filtrado por edad del usuario

### 5. Resumen (Step Two)

- Visualización de datos del usuario
- Resumen del plan seleccionado
- Información de contacto y pago

### 6. Optimizaciones y Pulimiento

- Responsive design
- Estados de carga y error
- Validaciones mejoradas
- Optimización de rendimiento

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Pasos para levantar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd code-challenge-rimac
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   # o
   bun install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   bun dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run typecheck` - Verificación de tipos TypeScript

## 🌐 APIs Externas Utilizadas

- **API de Usuario**: `https://rimac-front-end-challenge.netlify.app/api/user.json`
- **API de Planes**: `https://rimac-front-end-challenge.netlify.app/api/plans.json`

## 📱 Características Implementadas

### ✅ Funcionalidades Principales

- Formulario de datos personales con validaciones
- Selección de tipo de documento (DNI, RUC, CE)
- Validación de números de documento según tipo
- Validación de número de celular peruano
- Checkboxes de políticas de privacidad y comunicaciones
- Integración con APIs externas para datos del usuario
- Selección de planes de seguro filtrados por edad
- Resumen completo de la cotización

### ✅ Características Técnicas

- Diseño completamente responsivo
- Manejo de estados de carga y error
- Validaciones en tiempo real
- Navegación entre pasos del proceso
- Persistencia de datos con localStorage
- Optimización de imágenes y recursos
- SEO básico con meta tags

### ✅ UX/UI

- Interfaz moderna y limpia
- Animaciones suaves y transiciones
- Feedback visual para interacciones
- Mensajes de error claros y específicos
- Diseño mobile-first
- Accesibilidad básica implementada

## 🔧 Consideraciones Técnicas

### Manejo de Estado

- **Context API** para datos del usuario con persistencia en localStorage
- **TanStack Query** para datos del servidor
- **TanStack Form** para estado de formularios
- **localStorage** para persistencia automática de datos del usuario

### Validaciones

- Validaciones del lado del cliente para mejor UX
- Validación de formatos específicos para documentos peruanos
- Validación de longitud de números de celular

### Responsive Design

- Mobile-first approach
- Breakpoints optimizados para diferentes dispositivos
- Componentes adaptativos

### Performance

- Lazy loading de componentes
- Optimización de imágenes
- Caché inteligente con React Query

### Persistencia de Datos

- **localStorage automático**: Los datos del usuario se guardan automáticamente en localStorage
- **Recuperación automática**: Los datos se restauran al cargar la aplicación
- **Validación de datos**: Se valida la estructura de los datos al cargarlos desde localStorage
- **Manejo de errores**: Todas las operaciones de localStorage incluyen manejo de errores
- **Función de limpieza**: Disponible método para resetear completamente los datos

## 📝 Notas Adicionales

### Limitaciones Conocidas

- No hay validación del lado del servidor
- Las APIs externas son simuladas
- Los datos persisten solo en el navegador actual

### Mejoras Futuras

- Agregar más validaciones del lado del servidor
- Implementar tests unitarios y de integración
- Agregar animaciones más sofisticadas
- Implementar PWA capabilities
- Sincronización de datos entre dispositivos

### Consideraciones de Seguridad

- Validación de entrada del usuario
- Sanitización de datos
- Manejo seguro de información personal

## 👥 Contribución

Este proyecto fue desarrollado como parte del frontend challenge de Rimac. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del frontend challenge de Rimac y está destinado únicamente para fines de evaluación.

---

**Desarrollado con ❤️ para Rimac Seguros**
