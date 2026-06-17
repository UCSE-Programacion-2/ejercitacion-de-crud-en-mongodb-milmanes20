---
name: "Paso 5: Implementar POST /equipos"
about: Criterio de corrección automático
title: "Implementar POST /equipos"
labels: ["auto-issue"]
assignees: ''
---

## Objetivo
Implementar la ruta `POST /equipos` en `server.js`.

### Requisitos
1. Debe extraer los campos `equipo`, `tecnico`, `continente` y `campeonatos_mundiales` del `req.body`.
2. Debe validar que los campos existan y tengan el tipo correcto. Si fallan las validaciones, retorna status `400`.
3. Debe utilizar `insertOne` para agregar el nuevo equipo.
4. Debe retornar el equipo recién creado (junto con su nuevo `_id`) y código de estado `201`.

Si el test asociado falla, revisa los logs en la pestaña Actions para identificar el problema.
