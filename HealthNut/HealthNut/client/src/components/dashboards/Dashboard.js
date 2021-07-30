import React from "react";
import GoalList from "../goals/GoalList";
import NoteList from "../notes/NoteList";
import MealList from "../meals/MealList";
import BigButtons from "../bigButtons/BigButtonsCard";
import { Col, Container, Row } from "reactstrap";

const Dashboard = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <GoalList />
                        <NoteList />
                    </Col>
                    <Col>
                        <BigButtons />
                    </Col>
                    <Col sm="5">
                        <MealList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;