import express from 'express';
import HttpErrors from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';
import planetsRepository from '../repositories/planets-repository.js';


const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get('/', this.getAll); // Retrieve (GET) toutes les planètes
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    async getAll(req, res, next) {
        // Critères pour la BD
        const filter = {};
        
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }
        // Paramètres de transformation
        const transformOptions = {};
        if(req.query.unit) {
            if(req.query.unit === 'c'){
                transformOptions.unit = req.query.unit;
            } else {
                return next(HttpErrors.BadRequest('Le paramètre unit doit avoir la valeur c pour Celcius'));
            }
        }

        try {
            let planets = await planetsRepository.retrieveAll(filter);

            // Je veux un nouveau tableau des planètes transformées
            // map = loop
            planets = planets.map(p => {
                p = p.toObject({getters:true, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
            });

            res.status(200).json(planets);
        } catch(err){
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;


        const transformOptions = {};
        if(req.query.unit) {
            if(req.query.unit === 'c'){
                transformOptions.unit = req.query.unit;
            } else {
                return next(HttpErrors.BadRequest('Le paramètre unit doit avoir la valeur c pour Celcius'));
            }
        }

        try {
            let planet = await planetsRepository.retrieveById(idPlanet);
    
            if (!planet) {    
                return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
            } else {
                planet = planet.toObject({getters:true, virtuals:false});
                planet = planetsRepository.transform(planet, transformOptions);

                res.status(200).json(planet); // Content-Type & send la response
            }
        } catch(err) {
            return next(err);
        }
        
    }

    async post(req, res, next) {
        const newPlanet = req.body;

        //TODO: Validation rapide jusqu'à la semaine +/- 8

        try {
            let planetAdded = await planetsRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({getter:true, virtuals:false})
            planetAdded = planetsRepository.transform(planetAdded);
            res.status(201).json(planetAdded);
        } catch(err) {
            return next(err);
        }
    }

    async deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            const deleteResult = await planetsRepository.delete(idPlanet);
            if (!deleteResult) {
                return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
            } else {
                res.status(204).end();
            }
        } catch(err) {
            return next(err);
        }

    }

    patch(req, res, next) {
        return next(HttpErrors.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpErrors.NotImplemented());
    }
}

// Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;