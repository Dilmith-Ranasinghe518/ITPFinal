const express = require('express');
const axios = require('axios');
const router = express.Router();

const BLYNK_AUTH_TOKEN = 'MTsyYkH8o_vN21tBJZykc_9ZErs0OyEo';
const BLYNK_API_URL = `https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&V0`; // Replace Vx

router.get('/waste-level', async (req, res) => {
    try {
        const response = await axios.get(BLYNK_API_URL);
        res.json({ wasteLevel: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch waste level' });
    }
});

module.exports = router;
