const express = require('express');
const router = express.Router();
const { getRecipe } = require('../controllers/aiController');

router.post('/', getRecipe);

module.exports = router;