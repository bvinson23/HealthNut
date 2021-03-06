import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/meals";

export const getAllMeals = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occured while trying to get your meals.")
            }
        });
    });
};

export const addMeal = (meal) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a meal.");
            }
        });
    });
};

export const deleteMeal = (mealId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${mealId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    });
};

export const editMeal = (meal) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${meal.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
        }).then(res => {
            if (res.ok) {
                return;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to update your meal.");
            }
        });
    });
};

export const getMealById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get your meal.");
            }
        });
    });
};

export const getMealCategories = () => {
    return getToken().then((token) => {
        return fetch("/api/mealCategory", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get categories.");
            }
        });
    });
};