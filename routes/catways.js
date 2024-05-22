const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middlewares/auth');

router.post('/', auth, catwayController.createCatway);
router.get('/', auth, catwayController.getCatways);
router.get('/:id', auth, catwayController.getCatway);
router.put('/:id', auth, catwayController.updateCatway);
router.delete('/:id', auth, catwayController.deleteCatway);

module.exports = router;