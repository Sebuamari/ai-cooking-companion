const axios = require('axios');

async function getRecipe(req, res) {
  const ingredients = req.body.ingredients;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `I have the following ingredients: ${ingredients}. Please suggest a single complete recipe using only these ingredients and at most 1–2 very common household items (like salt, sugar, pepper, or cooking oil). The response should include: 1. A clear title 2. A short description (optional) 3. A list of ingredients actually used 4. Step-by-step cooking instructions. Do not include ingredients not mentioned or assume anything too specific or exotic. Be concise and practical.`,
        }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const recipe = response.data.choices[0].message.content;
    console.log("Recipe response:", recipe);
    res.json({ recipe });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = { getRecipe };