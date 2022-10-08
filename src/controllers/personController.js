const Person = require('../models/person');

class PersonController {
    static getAll = async(req, res, next) => {
        const persons = await Person.findAll();
        return res.status(200).json(persons);
    }
    
    static createOne = async(req, res, next) => {
        const PERSON_MODEL = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            work: req.body.work
          };
        try {
            const person = await Person.create(PERSON_MODEL);
            res.setHeader('Location', `/api/v1/persons/${person.id}`);
            return res.status(201).json();
        } catch (error) {
            return res.status(400).json({message: "Invalid data", errors: error});
        }
    }

    static getOne = async(req, res, next) => {
        const person = await Person.findByPk(req.params.id);
        if(person) {
            return res.status(200).json(person);
        } else {
            return res.status(404).json({message: "Person not found"});
        }
    }

    static updateOne = async(req, res, next) => {
        const person = await Person.findByPk(req.params.id);
        if(person) {      
            const PERSON_MODEL = {
                name: req.body.name ?? person.name,
                age: req.body.age ?? person.age,
                address: req.body.address ?? person.address,
                work: req.body.work ?? person.work
            };      
            try {
                await Person.update(PERSON_MODEL, { where: { id: req.params.id } });
                const updated = await Person.findByPk(req.params.id);
                return res.status(200).json(updated);
            } catch (error) {
                return res.status(400).json({message: "Invalid data", errors: error});
            }
        } else {
            return res.status(404).json({message: "Person not found"});
        }        
    }

    static deleteOne = async(req, res, next) => {
        await Person.destroy({ where: { id: req.params.id } });
        return res.status(204).json();
    }
}

module.exports = PersonController;