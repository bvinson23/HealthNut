import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editNote, getNoteById } from "../../modules/noteManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditExistingNote = () => {
    const [note, setNote] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedNote = { ...note }
        let selectedValue = evt.target.value
        editedNote[evt.target.id] = selectedValue
        setMeal(editedNote)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editNote(note)
            .then(() => history.push("/notes"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/notes")
    };

    useEffect(() => {
        getNoteById(id).then(setNote)
    }, [id]);

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
                        defaultValue={note.dateCreated} />
                </FormGroup>
                <FormGroup>
                    <label>Content</label>
                    <input type="text"
                        id="content"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={note.content} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancel}>Cancel</Button>
        </Container>
    )
};

export default EditExistingNote;