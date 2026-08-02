# Contexto del Proyecto: Menusclic (Malosa House)

Este documento contiene el contexto local y las reglas de negocio específicas para el proyecto "Menusclic", enfocado en la implementación de Malosa House.

## Integración del Carrito de Compras (WhatsApp)

### 1. Generación de IDs (cartId)
Para evitar que productos de diferentes categorías se agrupen erróneamente en el carrito si comparten el mismo ID numérico, el identificador único del carrito (`cartId`) se forma de manera estricta usando el `docId` de Firebase.
- Lógica en `addToCart`: `const cartId = ${item.docId || getDisplayName(item)}-${notes.trim().toLowerCase()};`
- Los items se extraen de Firebase asegurando que se mapea el `docId`: `doc => ({ docId: doc.id, id: doc.data().id || doc.id, ...doc.data() })`.

### 2. Formato de Productos (getDisplayName)
Los nombres de los productos siempre deben mostrarse junto a su categoría para evitar confusiones (ej. "Alitas - 5 PIEZAS" vs "Boneless - 5 PIEZAS"). Esto se logra con la función `getDisplayName(item)`.

### 3. Selector de Salsas Obligatorio
Para las categorías `Alitas`, `Boneless` y `Costillas`, se requiere obligatoriamente que el usuario seleccione una salsa desde un menú desplegable `<select>`.
- El botón de "Añadir al Pedido" debe permanecer deshabilitado hasta que se elija una salsa.
- La selección de salsa se añade como un prefijo en las notas del item (ej. `Salsa: Lemon Pepper. Sin cebolla`).

### 4. Toggle del Carrito (Admin)
En el panel de administración (`ContactSettingsModal` dentro de `AdminDashboard.jsx`), existe un checkbox llamado `whatsappOrdersEnabled`.
- Si está en `true` o no existe (por defecto), la vista de cliente en `MalosaHouseDemo.jsx` muestra los botones de agregar al carrito y habilita los pedidos.
- Si está en `false`, la vista pasa a modo solo lectura (informativo).

### 5. Formato del Mensaje de WhatsApp
El texto enviado por WhatsApp fue diseñado para ser amigable en dispositivos móviles:
- No usa bullets tipo guion (`-`) ni emojis problemáticos para evitar el espaciado y sangría automáticos de WhatsApp y caracteres corruptos.
- Se utilizan negritas para la cantidad y nombre del producto: `*1x Alitas - 5 PIEZAS* - $85`.
- Las notas van en el renglón de abajo, alineadas a la izquierda sin sangría.
- Hay un salto de línea en blanco entre cada producto.
