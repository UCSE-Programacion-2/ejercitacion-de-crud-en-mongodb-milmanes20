---
title: "Paso 3: Implementar GET /equipos/buscar"
labels: "auto-issue"
---
Debes implementar el endpoint `GET /equipos/buscar` en `server.js`.
El endpoint recibe el parámetro de consulta `tecnico` (`req.query.tecnico`).
Utiliza el operador `$regex` para filtrar los equipos por nombre de técnico de forma insensible a mayúsculas (`$options: 'i'`). Devuelve el resultado con status `200`.
