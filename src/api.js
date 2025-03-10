// src/api/api.js
const API_BASE_URL = 'http://localhost:5000'; // Adjust if needed

export const getCampaigns = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/campaigns`);
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return null;
  }
};
