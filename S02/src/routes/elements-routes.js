import express from 'express';
import HttpErrors from 'http-errors';
import HttpStatus from 'http-status';

import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);
    }

    getAll(req, res, next) {
        res.status(200).json(ELEMENTS);
    }

    getOne(req, res, next) {
       const symbolElement = req.params.symbol;

       const element = ELEMENTS.find(e => e.symbol == symbolElement);
       console.log(element);

        if(!element) {
            return next(HttpErrors.NotFound(`L'élément ${symbol} n'existe pas.`))
        } else {
            res.status(200).json(element);
        }

    }

    post(req, res, next) {
        const newElement = req.body;

        const element = ELEMENTS.find(e => e.symbol == newElement.symbolElement);

        if(element) {
            return next(HttpErrors.Conflict(`Un élément avec l'identifiant ${idElement.id} existe déjà.`))
        } else {
            ELEMENTS.push(newElement);
            res.status(201);
            res.json(newElement);
        }
    }
    
    delete(req, res, next) {
        const symbolElement = req.params.symbol;

        const index = ELEMENTS.findIndex(e => e.symbol == symbolElement);

        if (index === -1) {
            return next(HttpErrors.NotFound(`fff`))
        } else {
            ELEMENTS.splice(index, 1);
            res.status(204).end();
        }
     
    }
}

new ElementsRoutes();

export default router;