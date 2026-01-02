# Módulo de Gestión de Asistentes IA
## Contexto

Funnelhot está desarrollando un sistema de asistentes IA para automatizar interacciones con leads. Este módulo permite gestionar asistentes, incluyendo creación, edición, eliminación y entrenamiento, con persistencia local.

## Objetivo

Crear una aplicación web responsive usando Next.js con TypeScript que permita:

Crear, listar, editar y eliminar asistentes

Configurar respuestas y entrenamiento

Simular un chat con respuestas predefinidas

Persistencia de datos en localStorage

Características Implementadas

Página principal con listado de asistentes en tarjetas

Modal de creación/edición en 2 pasos con validaciones

### Página de entrenamiento con:

 Área de prompts

Botón guardar con persistencia en localStorage

Chat simulado con delay de respuesta

Eliminación de asistentes con confirmación y feedback

Diseño responsive y moderno

Componentes reutilizables en TypeScript

Manejo de estados de carga y error claros

# Decisiones Técnicas

Framework: Next.js con App Router → permite rutas dinámicas y SSR si se requiere

Lenguaje: TypeScript → tipado seguro y autocompletado

Persistencia: localStorage → evita dependencias externas y cumple con los requisitos de entrega

UI: uso de CSS modular y librerías de íconos (Heroicons) para consistencia y claridad

Estado: React useState y useEffect para manejar cambios y sincronizar con localStorage

Funcionalidades omitidas y motivos

Integración real con IA → se simula con respuestas predefinidas para cumplir con la entrega rápida

Testing unitario → priorizado funcionalidad y diseño responsive



## Datos de Ejemplo
Asistentes

```
[
{
"id": "1",
"name": "Asistente de Ventas",
"language": "Español",
"tone": "Profesional",
"responseLength": {"short":30,"medium":50,"long":20},
"audioEnabled": true,
"rules": "Eres un asistente especializado en ventas..."
},
{
"id": "2",
"name": "Soporte Técnico",
"language": "Inglés",
"tone": "Amigable",
"responseLength": {"short":20,"medium":30,"long":50},
"audioEnabled": false,
"rules": "Ayudas a resolver problemas técnicos..."
}
]
```

## Respuestas simuladas

```
[
"Entendido, ¿en qué más puedo ayudarte?",
"Esa es una excelente pregunta. Déjame explicarte...",
"Claro, con gusto te ayudo con eso.",
"¿Podrías darme más detalles sobre tu consulta?",
"Perfecto, he registrado esa información."
]
```

# Instrucciones para correr el proyecto

## Clonar el repositorio
```
git clone www.github.com/lalo-argoti/chat
cd chat
```

## Instalar dependencias
```
npm install

o

yarn install
```

## Correr la aplicación en modo desarrollo
```
npm run dev

o

yarn dev
```

## Pruebas

```
node tests/endpoints.test.js
```


Abrir la aplicación en el navegador

URL por defecto: http://localhost:3000

Probar funcionalidades

Crear, editar y eliminar asistentes

Entrenar un asistente y ver la persistencia en localStorage

Simular chat y revisar respuestas predefinidas

Validaciones de formularios y pasos del modal

Build para producción
```
npm run build
npm run start

o con yarn

yarn build
yarn start
```

Estructura de Carpetas

```
/app
/components # Componentes reutilizables
/pages # Páginas principales y rutas dinámicas
/styles # Estilos globales y módulos CSS
/data # Datos de ejemplo y JSON de respuestas
/public # Archivos estáticos
```

Tiempo aproximado de dedicación

Desarrollo: 12-15 horas

Diseño responsive: 3 horas

Validaciones y pruebas: 2-3 horas

Criterios de Evaluación Cubiertos

Funcionalidad: todas las funcionalidades requeridas implementadas y testeadas

Código: estructura clara, TypeScript tipado, componentes reutilizables

UI/UX: diseño responsive, limpio, intuitivo, con feedback visual

Extras: README detallado y ejemplos de datos incluidos
