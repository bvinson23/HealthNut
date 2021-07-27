import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/notes";

export const getAllNotes = () => {
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
                throw new Error("An unknnown error occured while getting the notes.");
            }
        });
    });
};

export const addNote = (note) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to add a note.");
            }
        });
    });
};

export const deleteNote = (noteId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${noteId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    });
};

export const editNote = (note) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${note.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }).then(res => {
            if (res.ok) {
                return;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to update your note.");
            }
        });
    });
};

export const getNoteById = (id) => {
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
                throw new Error("An unknown error occurred while trying to get your note.");
            }
        });
    });
};