import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user and token from localStorage on component mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        const decodedToken = jwtDecode(storedToken);

        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser)); // Parse the stored user object
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // Remove expired user details
        }
      }
    } catch (e) {
      console.error("Error loading user and token:", e);
    }
  }, []);

  // Function to handle sign-up
  const signUp = async (userData, userType) => {
    try {
      setLoading(true);
      setError(null);

      const path =
        userType === "organization"
          ? "/auth/organizations/register"
          : "/auth/users/register";

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}${path}`, // Fixed usage of VITE_ environment variables
        userData
      );

      return response.data.message;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Sign-up failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, userType) => {
    try {
      setLoading(true);
      setError(null);

      const path =
        userType === "organization"
          ? "/auth/organizations/login"
          : "/auth/users/login";

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}${path}`,
        userData
      );

      const { token: receivedToken } = response.data;
      const decodedToken = jwtDecode(receivedToken);

      // Create user object
      const userDetails = {
        id: decodedToken.id,
        type: userType,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      // Save user details and token in state and localStorage
      setUser(userDetails);
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(userDetails)); // Stringify user details

      return response.data.message;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const navigate = useNavigate();
    navigate("/");
  };

  // Check token expiration
  const isTokenExpired = () => {
    try {
      if (!token) return true;
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 <= Date.now();
    } catch (e) {
      console.error("Error checking token expiration:", e);
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        signUp,
        login,
        logout,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
