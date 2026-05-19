export const apiKey = (req, res, next) => {
    const key = req.headers['x-api-key'] || req.headers['api-key'] || req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const expectedKey = process.env.API_KEY?.trim();

    if (!key || !expectedKey || key.trim() !== expectedKey) {
        return res.status(401).json({ error: 'API Key invalida ou ausente.' });
    }

    next();
};
