const router = require('express').Router();
const { alternatives, criteria, model } = require('../controllers');

router.get('/alternatives', alternatives.getAllAlternatives);
router.get('/alternatives/:id', alternatives.getAlternativeById);
router.post('/alternatives', alternatives.addAlternative);
router.put('/alternatives/:id', alternatives.updateAlternative);
router.delete('/alternatives/:id', alternatives.deleteALternatives);


router.get('/criteria', criteria.getAllCriterias);
router.get('/criteria/:id', criteria.getCriteriaById);

router.get('/topsis', model.getTopsisModelResult);

module.exports = router;