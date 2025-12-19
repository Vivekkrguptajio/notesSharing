import apiClient from "./api.config";

/**
 * Signup API call
 * @param {Object} userData - User registration data
 * @param {string} userData.fullName - User's full name
 * @param {string} userData.registrationNumber - Registration number
 * @param {string} userData.branch - Branch/Department
 * @param {string} userData.semester - Semester
 * @param {string} userData.password - Password
 * @returns {Promise} API response
 */
export const signup = async (userData) => {
    try {
        const response = await apiClient.post("/auth/signup", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Network error. Please try again." };
    }
};

/**
 * Login API call
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.registrationNumber - Registration number
 * @param {string} credentials.password - Password
 * @returns {Promise} API response with token and user data
 */
export const login = async (credentials) => {
    try {
        const response = await apiClient.post("/auth/login", credentials);

        // Store token and user data in localStorage
        if (response.data.success && response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Network error. Please try again." };
    }
}


/**
 * Update Profile API call
 * @param {Object} userData - User data to update
 * @returns {Promise} API response
 */
export const updateProfile = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await apiClient.put("/auth/profile", userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Update local storage if successful
        if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            // Trigger Navbar update
            window.dispatchEvent(new Event("auth-change"));
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Network error. Please try again." };
    }
};

/**
 * Logout function
 */
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
};

/**
 * Get current user from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

/**
 * Get Auth Headers
 * @returns {Object} Headers object with Authorization token
 */
export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};
