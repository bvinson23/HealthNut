import React from "react";
import { Button, Row, Toast, ToastBody } from "reactstrap";
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
        <Toast style={{backgroundColor: "#61B521"}}>
            <ToastBody>
                <div className="NoteList">
                    <Row>Date: {handleDate()}</Row>
                    <Row>{note.content}</Row>
                    <Button onClick={() => history.push(`/notes/edit/${note.id}`)} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Edit</Button>
                    <Button onClick={deleteSelectedNote} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Delete</Button>
                </div>
            </ToastBody>
        </Toast>
    )
};

export default Note;