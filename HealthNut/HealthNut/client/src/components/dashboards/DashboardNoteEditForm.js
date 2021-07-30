import React from "react";
import GoalList from "../goals/GoalList";
import MealList from "../meals/MealList";
import WorkoutList from "../workouts/WorkoutList";
import { Col, Container, Row } from "reactstrap";
import EditExistingNote from "../notes/NoteEditForm";

const DashboardNoteEdit = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        {GoalList()}
                        {WorkoutList()}
                    </Col>
                    <Col>
                        {EditExistingNote()}
                    </Col>
                    <Col sm="5">
                        {MealList()}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardNoteEdit;