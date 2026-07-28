# Menusclic - Plataforma de Menús Digitales

Menusclic es una plataforma SaaS (Software as a Service) diseñada para crear menús digitales interactivos para restaurantes, cafeterías, taquerías y bares. Permite a los negocios tener una presencia web moderna y recibir pedidos directamente a través de WhatsApp sin intermediarios ni comisiones.

## 🚀 Características Principales

- **Menús Interactivos:** Catálogos de productos organizados por categorías.
- **Carrito de Compras Integrado:** Los clientes pueden agregar productos, modificar cantidades y ver el total de su cuenta.
- **Pedidos por WhatsApp:** Envío de órdenes estructuradas directamente al número del restaurante (incluyendo opciones para "Comer Aquí", "Para Llevar", o "A Domicilio").
- **Cero Comisiones:** Alternativa directa a plataformas de delivery de terceros.
- **Panel de Administración (Firebase):** Gestión en tiempo real de productos, categorías, configuración del restaurante, banners y horarios.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Estilos:** Tailwind CSS
- **Base de Datos y Backend:** Firebase (Firestore)
- **Despliegue:** GitHub Pages (`gh-pages`)

## ⚙️ Configuración y Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Firebase:**
   Asegúrate de que tus credenciales de Firebase estén correctamente configuradas en el archivo `src/firebase.js`.

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible localmente (usualmente en `http://localhost:5173`).

## ☁️ Despliegue a Producción

El proyecto está configurado para desplegarse automáticamente en GitHub Pages.

Para subir los cambios a producción, simplemente ejecuta en tu terminal:
```bash
npm run deploy
```
Este comando construirá la versión optimizada de la aplicación (`npm run build`) y la publicará en la rama `gh-pages` de tu repositorio.

## 📦 Estructura del Proyecto

- `/src`: Código fuente de la aplicación React.
  - `/components`: Componentes reutilizables.
  - `RestaurantDemo.jsx`: La vista principal del menú para el cliente final (carrito, categorías, modificadores).
  - `AdminDashboard.jsx`: El panel de administración protegido para gestionar el menú.
  - `firebase.js`: Configuración de conexión a la base de datos Firestore.

---
*Desarrollado para modernizar y agilizar la operación de negocios gastronómicos locales.*
