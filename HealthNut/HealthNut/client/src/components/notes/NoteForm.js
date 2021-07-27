import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addNote } from "../../modules/noteManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewNote = () => {
    const [note, setNote] = useState({
        dateCreated: new Date().toLocaleString(),
        content: ""
    });

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newNote = { ...note }
        let selectedValue = evt.target.value
        newNote[evt.target.id] = selectedValue
        setNote(newNote)
    };

    const handleSave = (click) => {
        click.preventDefault();
        if (note.content === "") {
            window.alert("Please fill in all fields")
        } else {
            addNote(note)
                .then(() => history.push("/notes"))
        };
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/notes")
    };

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <input
                        type="hidden"
                        id="dateCreated"
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        value={note.dateCreated} />
                </FormGroup>
                <FormGroup>
                    <label>Content</label>
                    <input type="text"
                        id="content"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Write a note..."
                        value={note.content} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>Cancel</Button>
        </Container>
    )
};

export default AddNewNote;