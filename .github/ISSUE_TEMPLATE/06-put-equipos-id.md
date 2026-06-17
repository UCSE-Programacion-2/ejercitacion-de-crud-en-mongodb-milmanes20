---
name: "Paso 6: Implementar PUT /equipos/:id"
about: Criterio de corrección automático
title: "Implementar PUT /equipos/:id"
labels: ["auto-issue"]
assignees: ''
---

## Objetivo
Implementar la ruta `PUT /equipos/:id` en `server.js`.

### Requisitos
1. Debe extraer el ID de la URL y validar que sea un `ObjectId` válido (retornar status `400` en caso contrario).
2. Debe validar los datos del `req.body` de la misma forma que en el `POST`.
3. Debe utilizar `updateOne` para modificar el documento en la colección.
4. Debe retornar status `404` si el ID no existe en la base de datos (`matchedCount === 0`).
5. Debe retornar status `200` y un mensaje de éxito si se actualizó correctamente.

Si el test asociado falla, revisa los logs en la pestaña Actions para identificar el problema.
