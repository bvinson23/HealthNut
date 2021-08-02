import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand, Button, Row } from "reactstrap";
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
        <div className="container">
            <Row>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={RRNavLink} to="/notes">Notes</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                </Navbar>
            </Row>
            <Row>
                <Button onClick={() => history.push("/notes/add")}>New Note</Button>
                {notes.map((note) => (
                    <Note note={note} key={note.id} getNotes={getNotes} />
                ))}
            </Row>
        </div>
    )
};

export default NoteList;