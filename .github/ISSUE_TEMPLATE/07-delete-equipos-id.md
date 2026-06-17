---
name: "Paso 7: Implementar DELETE /equipos/:id"
about: Criterio de corrección automático
title: "Implementar DELETE /equipos/:id"
labels: ["auto-issue"]
assignees: ''
---

## Objetivo
Implementar la ruta `DELETE /equipos/:id` en `server.js`.

### Requisitos
1. Debe extraer el ID de la URL y validar que sea un `ObjectId` válido (retornar status `400` en caso contrario).
2. Debe utilizar `deleteOne` para borrar el documento en la colección.
3. Debe retornar status `404` si el ID no existe en la base de datos (`deletedCount === 0`).
4. Debe retornar status `200` y un mensaje de éxito si se eliminó correctamente.

Si el test asociado falla, revisa los logs en la pestaña Actions para identificar el problema.
