const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = 5000;

app.use(cors());  // Enable CORS to allow frontend to make requests to backend

app.get('/auth/github', async (req, res) => {
  const { code } = req.query; // Get the authorization code from query params

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' }); // If no code, return an error
  }

  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;  // Get client ID from env variables
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;  // Get client secret from env variables

  try {
    // Step 1: Exchange the authorization code for an access token
    const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const accessToken = response.data.access_token; // Get the access token

    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to get access token from GitHub' });
    }

    // Step 2: Use the access token to get user info from GitHub
    const userInfo = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass access token as Bearer token
      },
    });

    // Return the user info back to the frontend
    res.json({ user: userInfo.data });
  } catch (error) {
    console.error('Error during OAuth exchange:', error);
    res.status(500).json({ error: 'Internal server error during OAuth exchange' }); // Handle errors
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
