import api from './api';

export const userService = {
  // Login user
  login: async (userData) => {
    try {
      const response = await api.post('/user/login', userData);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // userService.js
logout: async () => {
  try {
    const response = await api.post('/user/logout');
    console.log("Logout response:", response.data);
    return { success: true, message: response.data.message || "Logged out successfully" };
  } catch (error) {
    console.error("Logout failed:", error);

    const message = error.response?.data?.message || "Logout failed";
    return { success: false, message };
  }
},

  // Get user profile
  getme: async () => {
    try {
      const response = await api.get('/user/me');
      return {success: true, data: response.data};
      //return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  
  // Reset password
  resetPassword: async ( token, newPassword) => {
    try {
      const response = await api.post('/user/reset-password',{
        token,
        newPassword
      });
        return {success: true, data: response.data};
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/user/forgot-password', { email });
         return {success: true, data: response.data};
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/user/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default userService;