const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, closeDB, client, connectDB;

jest.setTimeout(60000); // Dar tiempo para descargar los binarios de MongoDB en memoria la primera vez

let mongoServer;

beforeAll(async () => {
    // Inicializar servidor en memoria
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    process.env.MONGO_URI = mongoUri;
    process.env.PORT = 0; // random port para evitar colisiones
    
    // Cargar el servidor DESPUÉS de configurar la URI de memoria para que use el entorno correcto
    const server = require('../server');
    app = server.app;
    closeDB = server.closeDB;
    client = server.client;
    connectDB = server.connectDB;

    // Ejecutar connectDB manualmente para inicializar las variables
    await connectDB();
    
    const db = client.db('MundialDB');
    const collection = db.collection('equipos');
    
    // Poblamos la DB con datos iniciales
    await collection.insertMany([
        { _id: require('mongodb').ObjectId.createFromHexString('5f9b3b3b3b3b3b3b3b3b3b31'), equipo: 'Argentina', tecnico: 'Lionel Scaloni', continente: 'Sudamérica', campeonatos_mundiales: 3 },
        { _id: require('mongodb').ObjectId.createFromHexString('5f9b3b3b3b3b3b3b3b3b3b32'), equipo: 'Francia', tecnico: 'Didier Deschamps', continente: 'Europa', campeonatos_mundiales: 2 },
        { _id: require('mongodb').ObjectId.createFromHexString('5f9b3b3b3b3b3b3b3b3b3b33'), equipo: 'México', tecnico: 'Lionel Perez', continente: 'Norteamérica', campeonatos_mundiales: 0 },
    ]);
});

afterAll(async () => {
    if (closeDB) await closeDB();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('Endpoints de Equipos con MongoDB', () => {

    describe('GET /equipos', () => {
        it('debería retornar 200 y una lista de equipos', async () => {
            const res = await request(app).get('/equipos');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('GET /equipos/buscar', () => {
        it('debería filtrar correctamente (case-insensitive)', async () => {
            const res = await request(app).get('/equipos/buscar?tecnico=lionel');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('debería retornar lista vacía si no hay coincidencias', async () => {
            const res = await request(app).get('/equipos/buscar?tecnico=inexistente');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        });
    });

    describe('GET /equipos/:id', () => {
        it('debería retornar 200 y el equipo con ID válido existente', async () => {
            const res = await request(app).get('/equipos/5f9b3b3b3b3b3b3b3b3b3b31');
            expect(res.status).toBe(200);
            expect(res.body.equipo).toBe('Argentina');
        });

        it('debería retornar 404 con ID válido inexistente', async () => {
            const res = await request(app).get('/equipos/5f9b3b3b3b3b3b3b3b3b3b34');
            expect(res.status).toBe(404);
            expect(res.body.error).toBeDefined();
        });

        it('debería retornar 400 con ID inválido', async () => {
            const res = await request(app).get('/equipos/123');
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('POST /equipos', () => {
        it('debería retornar 201 y crear un equipo nuevo', async () => {
            const nuevoEquipo = {
                equipo: 'España',
                tecnico: 'Luis de la Fuente',
                continente: 'Europa',
                campeonatos_mundiales: 1
            };
            const res = await request(app).post('/equipos').send(nuevoEquipo);
            expect(res.status).toBe(201);
            expect(res.body._id).toBeDefined();
            expect(res.body.equipo).toBe('España');
        });

        it('debería retornar 400 si faltan campos o son inválidos', async () => {
            const equipoInvalido = {
                equipo: 'España'
            };
            const res = await request(app).post('/equipos').send(equipoInvalido);
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('PUT /equipos/:id', () => {
        it('debería actualizar un equipo y retornar 200', async () => {
            const actualizacion = {
                equipo: 'Argentina',
                tecnico: 'Lionel Scaloni Renovado',
                continente: 'Sudamérica',
                campeonatos_mundiales: 4
            };
            const res = await request(app).put('/equipos/5f9b3b3b3b3b3b3b3b3b3b31').send(actualizacion);
            expect(res.status).toBe(200);

            // Verificamos que realmente impactó en la DB
            const verify = await request(app).get('/equipos/5f9b3b3b3b3b3b3b3b3b3b31');
            expect(verify.body.campeonatos_mundiales).toBe(4);
            expect(verify.body.tecnico).toBe('Lionel Scaloni Renovado');
        });

        it('debería retornar 400 si faltan campos o son inválidos', async () => {
            const actualizacionMala = {
                equipo: 'Argentina' // Falta lo demás
            };
            const res = await request(app).put('/equipos/5f9b3b3b3b3b3b3b3b3b3b31').send(actualizacionMala);
            expect(res.status).toBe(400);
        });

        it('debería retornar 404 si el equipo a actualizar no existe', async () => {
            const actualizacion = {
                equipo: 'Fantasma',
                tecnico: 'Nadie',
                continente: 'Ninguno',
                campeonatos_mundiales: 0
            };
            const res = await request(app).put('/equipos/5f9b3b3b3b3b3b3b3b3b3b39').send(actualizacion);
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /equipos/:id', () => {
        it('debería retornar 200 y eliminar el equipo', async () => {
            const res = await request(app).delete('/equipos/5f9b3b3b3b3b3b3b3b3b3b32');
            expect(res.status).toBe(200);
            
            // Verificamos que ya no existe en la DB
            const verify = await request(app).get('/equipos/5f9b3b3b3b3b3b3b3b3b3b32');
            expect(verify.status).toBe(404);
        });

        it('debería retornar 404 si se intenta eliminar un equipo inexistente', async () => {
            const res = await request(app).delete('/equipos/5f9b3b3b3b3b3b3b3b3b3b32'); // Ya fue eliminado
            expect(res.status).toBe(404);
        });

        it('debería retornar 400 si el ID es inválido', async () => {
            const res = await request(app).delete('/equipos/invalido');
            expect(res.status).toBe(400);
        });
    });

});
