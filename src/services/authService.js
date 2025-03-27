import axios from 'axios';

const BASE_URL = 'https://reqres.in';

class AuthService {
  // Login method
  static async login(email, password) {
    try {
        console.log("hii")
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password
      });

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Logout method
  static logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !token;
  }

  // Get token from localStorage
  static getToken() {
    return localStorage.getItem('token');
  }

  // Decode token (if needed)
  static decodeToken(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;