const express = require('express');
const { ObjectId } = require('mongodb');
const { client, connectDB, closeDB } = require('./src/mongodb');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * TODO: Middleware para inyectar la base de datos
 * 1. Agrega un middleware (app.use) que reciba (req, res, next).
 * 2. Asigna la base de datos 'MundialDB' a req.db usando client.db().
 * 3. Asigna la colección 'equipos' a req.collection usando req.db.collection().
 * 4. Llama a next().
 */
// Tu código aquí

/**
 * TODO: Implementar un endpoint GET /equipos
 * 1. Debe buscar y traer todos los documentos de la colección 'equipos'.
 * 2. Debe convertir el cursor obtenido a un arreglo (toArray).
 * 3. Debe retornar el arreglo con status 200.
 */
app.get('/equipos', async (req, res) => {
    // Tu código aquí
});

/**
 * TODO: Implementar un endpoint GET /equipos/buscar
 * 1. Debe obtener el parámetro de consulta 'tecnico' (req.query.tecnico).
 * 2. Debe usar expresiones regulares u operadores de MongoDB para buscar aquellos
 *    equipos cuyo 'tecnico' contenga el nombre buscado (insensible a mayúsculas: $regex / $options: 'i').
 * 3. Debe retornar el arreglo filtrado con status 200.
 * IMPORTANTE: ¡Esta ruta debe ir ANTES que la ruta GET /equipos/:id!
 */
app.get('/equipos/buscar', async (req, res) => {
    // Tu código aquí
});

/**
 * TODO: Implementar un endpoint GET /equipos/:id
 * 1. Debe obtener el id de los parámetros de la URL.
 * 2. Validar que el id sea un ObjectId válido usando ObjectId.isValid().
 *    Si no lo es, responde con status 400 y el mensaje { error: "ID inválido" }.
 * 3. Si es válido, conviértelo a ObjectId y busca ese documento en la colección.
 * 4. Si lo encuentra, retornarlo con status 200.
 * 5. Si no lo encuentra, retornar un status 404 y { error: "Equipo no encontrado" }.
 */
app.get('/equipos/:id', async (req, res) => {
    // Tu código aquí
});

/**
 * TODO: Implementar un endpoint POST /equipos
 * 1. Debe extraer equipo, tecnico, continente y campeonatos_mundiales del req.body.
 * 2. Debe validar que todos los campos existan y sean del tipo correcto.
 *    Si algún campo falla, retornar status 400.
 * 3. Debe utilizar insertOne para crear el documento en la base de datos.
 * 4. Debe retornar el nuevo equipo con su _id generado y status 201.
 */
app.post('/equipos', async (req, res) => {
    // Tu código aquí
});

/**
 * TODO: Implementar un endpoint PUT /equipos/:id
 * 1. Valida que el ID de los parámetros sea un ObjectId válido. Si no lo es, retorna 400.
 * 2. Extrae y valida todos los campos del req.body como en el POST.
 * 3. Utiliza updateOne con el operador $set para actualizar el documento.
 * 4. Si matchedCount === 0 (no se encontró el documento), retorna 404.
 * 5. Si fue exitoso, retorna status 200.
 */
app.put('/equipos/:id', async (req, res) => {
    // Tu código aquí
});

/**
 * TODO: Implementar un endpoint DELETE /equipos/:id
 * 1. Valida que el ID sea un ObjectId válido (400 si no).
 * 2. Utiliza deleteOne para eliminar el documento con ese ID.
 * 3. Si deletedCount === 0, retorna 404.
 * 4. Si se eliminó correctamente, retorna status 200.
 */
app.delete('/equipos/:id', async (req, res) => {
    // Tu código aquí
});

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    });
}

// Exportamos 'app', 'closeDB', 'client' y 'connectDB' para poder hacer testing
module.exports = { app, closeDB, client, connectDB };
