import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/weight";

export const getAllWeights = () => {
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
                throw new Error("An unknnown error occured while getting the weights.");
            }
        });
    });
};

export const addWeight = (weight) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(weight)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to add a weight.");
            }
        });
    });
};

export const deleteWeight = (weightId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${weightId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    });
};

export const editWeight = (weight) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${weight.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(weight)
        }).then(res => {
            if (res.ok) {
                return;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to update your weight.");
            }
        });
    });
};

export const getWeightById = (id) => {
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
                throw new Error("An unknown error occurred while trying to get your weight.");
            }
        });
    });
};