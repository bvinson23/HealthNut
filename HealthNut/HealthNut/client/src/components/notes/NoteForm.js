import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addNote } from "../../modules/noteManager";
import { Form, FormGroup, Button, Container, Col, Input } from "reactstrap";

const AddNewNote = () => {
    const [note, setNote] = useState({
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
                .then(() => history.push("/dashboard"))
        };
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    return (
        <Container className="justified-content-center">
            <Form>
                <Col>
                    <h3>Add A New Note</h3>
                </Col>
                <FormGroup>
                    <Input type="textarea"
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