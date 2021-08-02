import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteNote } from "../../modules/noteManager";

const Note = ({ note, getNotes }) => {
    const history = useHistory();

    const deleteSelectedNote = (evt) => {
        evt.preventDefault();
        let result = window.confirm("Are you sure you want to delete this note?")
        if (result) {
            deleteNote(note.id).then(() => getNotes());
        }
    }

    const handleDate = () => {
        let date = new Date(note.dateCreated).toDateString();
        return date;
    };

    return (
        <Card>
            <CardBody>
                <div className="NoteList">
                    <Row>Date: {handleDate()}</Row>
                    <Row>{note.content}</Row>
                    <Button onClick={() => history.push(`/notes/edit/${note.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedNote} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Note;