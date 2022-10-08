const request = require('supertest');
const faker = require('@faker-js/faker').faker;
const app = require('../app');
const Person = require('../models/person');
const db = require('../database');

describe('Test person controller', () => {
    let person;
    let id;

    beforeEach(() => {
        person = {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            age: faker.datatype.number(),
            address: faker.address.street(),
            work: faker.datatype.string(10)
        }
        id = person.id;
    });

    afterEach(() => {
        id = null;
        person = null;
    });

    describe('Get all person', () => {
        it('Should success', async() => {
            Person.findAll = jest.fn().mockResolvedValue([person]);
            await request(app)
                .get('/api/v1/persons')
                .send()
                .expect(200)
                .then(res => { expect(res.body == [person]) });
        })
    })

    describe('Create one person', () => {
        it('Should success', async() => {
            Person.create = jest.fn().mockResolvedValue(person);
            await request(app)
                .post('/api/v1/persons')
                .send({name: person.name, age: person.age})
                .expect(201)
                .then(res => { expect(res.header.Location == `/api/v1/persons/${person.id}`) });
        })

        it('Should fail', async() => {
            Person.create = jest.fn().mockRejectedValue(new Error());
            await request(app)
                .post('/api/v1/persons')
                .send({name: person.name, age: person.name})
                .send()
                .expect(400);
        })
    })

    describe('Get one person', () => {
        it('Should success', async() => {
            Person.findByPk = jest.fn().mockResolvedValue(person);
            await request(app)
                .get(`/api/v1/persons/${id}`)
                .send()
                .expect(200)
                .then(res => { expect(res.body == person) });
        })

        it('Should fail', async() => {
            Person.findByPk = jest.fn().mockResolvedValue(null);
            await request(app)
                .get(`/api/v1/persons/${id}`)
                .send()
                .expect(404);
        })
    })

    describe('Update one person', () => {
        it('Should success', async() => {
            let updated = {
                id: person.id,
                name: faker.name.fullName(),
                age: faker.datatype.number(),
                address: faker.address.street(),
                work: faker.datatype.string(10)
            }
            Person.findByPk = jest.fn().mockResolvedValue(person);
            Person.update = jest.fn().mockResolvedValue(updated);
            await request(app)
                .patch(`/api/v1/persons/${id}`)
                .send(updated)
                .expect(200)
                .then(res => { expect(res.body == updated) });
        })

        it('Should fail', async() => {
            Person.findByPk = jest.fn().mockResolvedValue(person);
            Person.update = jest.fn().mockRejectedValue(new Error());
            await request(app)
                .patch(`/api/v1/persons/${id}`)
                .send({name: person.name, age: person.name})
                .expect(400);
        })
        
        it('Should fail', async() => {
            Person.findByPk = jest.fn().mockResolvedValue(null);
            await request(app)
                .patch(`/api/v1/persons/${id}`)
                .send()
                .expect(404);
        })
    })

    describe('Delete one person', () => {
        it('Should success', async() => {
            Person.destroy = jest.fn().mockResolvedValue(true);
            await request(app)
                .delete(`/api/v1/persons/${id}`)
                .send()
                .expect(204);
        })
    })
})
