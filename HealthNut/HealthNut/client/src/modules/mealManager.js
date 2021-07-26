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