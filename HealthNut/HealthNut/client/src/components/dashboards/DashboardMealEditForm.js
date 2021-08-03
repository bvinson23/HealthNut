import React from "react";
import GoalList from "../goals/GoalList";
import NoteList from "../notes/NoteList";
import MealList from "../meals/MealList";
import EditExistingMeal from "../meals/MealEditForm";
import { Col, Container, Row } from "reactstrap";

const DashboardMealEdit = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <GoalList />
                        <NoteList />
                    </Col>
                    <Col>
                        <EditExistingMeal />
                    </Col>
                    <Col sm="5">
                        <MealList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardMealEdit;