import expressValidator from 'express-validator';
const { body } = expressValidator;

class PlanetValidator {

    complete() {
        // POST et PUT
        return [
            body('name').exists().withMessage('Le nom de la planète est requis'),
            body('discoveryDate').exists().withMessage('La date découverte est requise'),
            body('temperature').exists().withMessage('La valeur de la température est requise'),
            body('position.x').exists().withMessage('La position en x est requise'),
            body('position.y').exists().withMessage('La position en y est requise'),
            body('position.z').exists().withMessage('La position en z est requise'),
            ... this.partial(),
        ];
    }

    partial() {
        // PATCH
        return [
            body('discoveryDate').optional()
                .isISO8601().withMessage('Doit être une date').bail()
                .isBefore(new Date().toISOString()).withMessage('Doit être dans le passé'),
            body('temperature').optional()
                .isNumeric().withMessage('La valeur de la température doit ête numérique'),
            body('satellites').optional()
                .isArray().withMessage('Les satellites doivent être un tableau'),
                body('position.x').optional()
                .isFloat({min: -1000, max:1000}).withMessage('La position n x doit être comprise entre -1000 et 1000'),
                body('position.y').optional()
                .isFloat({min: -1000, max:1000}).withMessage('La position n y doit être comprise entre -1000 et 1000'),
                body('position.z').optional()
                .isFloat({min: -1000, max:1000}).withMessage('La position n z doit être comprise entre -1000 et 1000')
        ];
    }

}

export default new PlanetValidator();