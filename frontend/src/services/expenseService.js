
import axios from "axios";

const API_URL = "http://localhost:8080/api/expenses";

export const getAllExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getTotalExpenses = async () => {
    const response = await axios.get(`${API_URL}/total`);
    return response.data;
};

export const getMonthlyExpenses = async (year, month) => {
    const response = await axios.get(`${API_URL}/monthly`, {
        params: { year, month }
    });
    return response.data;
};

export const getCategorySummary = async () => {
    const response = await axios.get(`${API_URL}/category-summary`);
    return response.data;
};

export const addExpense = async (expense) => {
    const response = await axios.post(API_URL, expense);
    return response.data;
};

export const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateExpense = async (id, expense) => {
    const response = await axios.put(`${API_URL}/${id}`, expense);
    return response.data;
};
