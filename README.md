# Zen Habit Tracker - Proyecto Final Lenguajes Visuales II

Este proyecto es una aplicación web para el seguimiento de hábitos diarios, diseñada con un enfoque minimalista y funcional. Permite a los usuarios registrar, monitorear y analizar sus hábitos para mejorar su productividad y bienestar.

**Alumno:** [Tu Nombre] (Número 13 en lista)
**Tema:** 13 - Rastreador de Hábitos

## Características Principales

*   **Gestión de Hábitos (CRUD):** Crear nuevos hábitos con categorías y frecuencia.
*   **Seguimiento Diario:** Marcar hábitos como completados con un solo clic.
*   **Visualización de Progreso:** Gráfico de barras interactivo que muestra el porcentaje de cumplimiento de los últimos 7 días.
*   **Filtrado:** Alternar entre hábitos activos y archivados para mantener la lista limpia.
*   **Persistencia de Datos:** Los datos se guardan automáticamente en el almacenamiento local del navegador (LocalStorage), simulando una base de datos persistente.
*   **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

*   **React:** Biblioteca principal para la construcción de la interfaz de usuario.
*   **TypeScript:** Para un código más robusto y seguro.
*   **Vite:** Entorno de desarrollo rápido y optimizado.
*   **Tailwind CSS:** Framework de utilidades para un diseño moderno y responsivo.
*   **Recharts:** Biblioteca para la visualización de datos (gráficos).
*   **Lucide React:** Iconografía moderna.

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd lenguajesvisuales-final
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener Node.js instalado.
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    La aplicación estará disponible generalmente en `http://localhost:5173`.

## Estructura del Proyecto

*   `src/components`: Componentes reutilizables de la interfaz (Lista, Formulario, Gráfico).
*   `src/hooks`: Lógica de negocio y manejo de estado (`useHabits`).
*   `src/data`: Datos iniciales simulados (`initialHabits.json`).
*   `src/types`: Definiciones de tipos TypeScript.

## Cumplimiento de Requerimientos (Rúbrica)

*   **Funcionalidad (10 pts):** Implementa CRUD completo, filtros, gráficos y persistencia simulada.
*   **Calidad del Código (5 pts):** Uso de Hooks personalizados, componentes modulares y TypeScript.
*   **Interfaz y Diseño (5 pts):** Diseño limpio usando Tailwind CSS.
*   **Uso de Datos (3 pts):** Carga inicial desde JSON y persistencia en LocalStorage.
*   **Documentación (7 pts):** Este archivo README detalla el uso y la instalación.
