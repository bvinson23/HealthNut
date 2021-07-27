import React from "react";
import { Card, CardBody, Button } from "reactstrap";
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

    return (
        <Card>
            <CardBody>
                <div className="NoteList">
                    <label style={{width: "10em" }}>Date: {note.dateCreated}</label>
                    <label style={{width: "10em" }}>{note.content}</label>
                    <Button onClick={() => history.push(`/meals/edit/${note.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedNote} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Note;