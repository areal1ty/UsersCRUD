const request = require('supertest');
const express = require('express');
const userController = require('../controller/userController');
const userService = require('../service/inMemoryUserService');


const app = express();
app.use(express.json());
app.post('/', userController.create);

    describe('POST /', () => {
        it('should create a new user and return it', async () => {
            const newUser = {name: 'John Doe', email: 'john@example.com'};
            const response = await request(app)
                .post('/')
                .send(newUser)
                .expect(201);

            expect(response.body).toMatchObject(newUser);

            const savedUser = userService.getById(response.body.id);
            expect(savedUser).toMatchObject(newUser);
        });
    });

app.get('/', userController.getAll);

    describe('GET /', () => {
        it('should return all users', async () => {
        const response = request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userService.getAll());
    });
});

app.get('/:id', userController.getById);
describe('GET /:id', () => {
    it('should return the user with the given id', async () => {
        const user = userService.create({name: 'John Doe', email: 'testdoe@gmail.com'});
        const response = request(app).get(`/${user.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
    });

    it('should return 404 if user not found', async () => {
        const response = request(app).get('/nonexistid');
        expect(response.status).toBe(404);
    });
});

app.put('/:id', userController.update);

describe('PUT /:id', () => {
    it('should update the user with the given id', async () => {
        const user = userService.create({name: 'John Doe', email: 'doe@gmail.com'});
        const updatedData = {name: 'Doe John', email: 'john@gmail.com'};
        const response = request(app).put(`/${user.id}`).send(user);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({...user, ...updatedData});
    });

    it('should return 404 if user not found', async () => {
        const updatedData = {name: 'Doe Doe', email: 'doejohns@gmail.com'};
        const response = request(app).put('/nonexistid').send(updatedData);
        expect(response.status).toBe(404);
    });
});

app.delete('/:id', userController.delete);

describe('DELETE /:id', () => {
    it('should delete the user with the given id', async () => {
        const user = userService.create({name : 'John Doe', email: 'doe@gmail.com'});
        const response = await request(app).delete(`/${user.id}`);
        expect(response.status).toBe(204);
    });
    it('should return 404 if user does not exist', async () => {
        const response = await request(app).delete('/nonexistid');
        expect(response.status).toBe(404);
    })

})


