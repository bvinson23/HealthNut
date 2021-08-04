import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editNote, getNoteById } from "../../modules/noteManager";
import { Form, FormGroup, Button, Col, Input, Toast } from "reactstrap";

const EditExistingNote = () => {
    const [note, setNote] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedNote = { ...note }
        let selectedValue = evt.target.value
        editedNote[evt.target.id] = selectedValue
        setNote(editedNote)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editNote(note)
            .then(() => history.push("/dashboard"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    useEffect(() => {
        getNoteById(id).then(setNote)
    }, [id]);

    return (
        <Toast>
            <Form>
                <Col>
                    <h3>Edit A Note</h3>
                </Col>
                <FormGroup>
                    <label>Content</label>
                    <Input type="textarea"
                        id="content"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={note.content} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                style={{ backgroundColor: "#4472CA" }}
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                style={{ backgroundColor: "#4472CA" }}
                variant="warning"
                onClick={handleCancel}>Cancel</Button>
        </Toast>
    )
};

export default EditExistingNote;