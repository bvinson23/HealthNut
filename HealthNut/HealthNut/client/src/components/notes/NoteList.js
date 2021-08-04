import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import { NavbarToggler, NavbarBrand, Button, Toast, ToastHeader, ToastBody } from "reactstrap";
import { getAllNotes } from "../../modules/noteManager";
import Note from "./NoteCard";

const NoteList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [notes, setNotes] = useState([]);
    const history = useHistory();

    const getNotes = () => {
        getAllNotes().then(notes => setNotes(notes));
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
            <Toast >
                <ToastHeader color="light" light expand="md">
                    <NavbarBrand tag={RRNavLink} to="/notes">Notes</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                </ToastHeader>
                <ToastBody>
                    <Button style={{ backgroundColor: "#4472CA" }} onClick={() => history.push("/notes/add")}>New Note</Button>
                    {notes.map((note) => (
                        <Note note={note} key={note.id} getNotes={getNotes} />
                    ))}
                </ToastBody>
            </Toast>
    )
};

export default NoteList;