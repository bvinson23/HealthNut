import React from "react";
import NoteList from "../notes/NoteList";
import MealList from "../meals/MealList";
import { Col, Container, Row } from "reactstrap";
import WorkoutList from "../workouts/WorkoutList";
import AddNewWeight from "../weights/WeightForm";

const DashboardWeighIn = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <WorkoutList />
                    </Col>
                    <Col>
                        <AddNewWeight />
                        <NoteList />
                    </Col>
                    <Col sm="5">
                        <MealList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardWeighIn;