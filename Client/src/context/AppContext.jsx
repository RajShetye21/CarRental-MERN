import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const Rupees = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cars, setCars] = useState([]);

    async function fetchUser() {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            } else {
                setUser(null);
                setIsOwner(false);
                toast.error(data.message || "Please log in again.");
            }
        } catch (e) {
            setUser(null);
            setIsOwner(false);
            toast.error(e.response?.data?.message || e.message);
        }
    }

    async function fetchCars() {
        try {
            const { data } = await axios.get("/api/user/cars");
            if (data.success) {
                setCars(data.cars);
            }
            else {
                toast.error(data.message);
            }

        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
        }
    }

    async function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        delete axios.defaults.headers.common.Authorization;
        setShowLogin(false);
        toast.success("You have been logged out!");
        navigate('/');
    }

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common.Authorization = token;
            fetchUser();
        } else {
            delete axios.defaults.headers.common.Authorization;
        }
    }, [token]);

    const value = {
        navigate, Rupees, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser, showLogin,
        setShowLogin, fetchCars, cars, setCars,
        pickupDate, setPickupDate, returnDate, setReturnDate, logout
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
