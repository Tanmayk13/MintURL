import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minturl-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Shorten a URL
 * @param {string} url - The original URL
 * @param {number|null} expiryDays - Optional expiry in days
 * @returns {Promise<{shortUrl: string}>}
 */
export const shortenUrl = async (url, expiryDays = null) => {
  const payload = { url };
  if (expiryDays !== null && expiryDays !== '') {
    payload.expiryDays = Number(expiryDays);
  }
  const response = await api.post('/shorten', payload);
  return response.data;
};

/**
 * Get analytics for a short code
 * @param {string} shortCode
 * @returns {Promise<{shortCode, originalUrl, clickCount, createdAt, expiryAt}>}
 */
export const getStats = async (shortCode) => {
  const response = await api.get(`/stats/${shortCode}`);
  return response.data;
};

export default api;
