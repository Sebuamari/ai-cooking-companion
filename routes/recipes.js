const express = require('express');
const router = express.Router();
const { getRecipe } = require('../controllers/aiController');
const pool = require('../db');

// Route to handle recipe request
router.post('/', getRecipe);

// Route to fetch all saved recipes
router.get('/saved', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipe_requests ORDER BY created_at DESC');
    res.json(result.rows);  // Send the recipes as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

module.exports = router;