---
title: "Paso 4: Implementar GET /equipos/:id"
labels: "auto-issue"
---
Debes implementar el endpoint `GET /equipos/:id` en `server.js`.
- Valida si el `id` es un `ObjectId` válido. Si no lo es, devuelve status `400` y `{ error: "ID inválido" }`.
- Si es válido, utiliza `collection.findOne()` para buscar el equipo.
- Si lo encuentra, devuelve el equipo con status `200`.
- Si no lo encuentra, devuelve status `404` y `{ error: "Equipo no encontrado" }`.
