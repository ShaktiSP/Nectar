import apiClient from '../api/Apiclient';

/**
 * Login API call
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} - { accessToken, refreshToken, id, username, email, ... }
 */
export const loginUser = async (username, password) => {
  const response = await apiClient.post('/auth/login', {
    username,
    password,
  });
  return response.data;
};

