import React from "react";
import GoalList from "../goals/GoalList";
import NoteList from "../notes/NoteList";
import MealList from "../meals/MealList";
import BigButtons from "../bigButtons/BigButtonsCard";
import { Col, Container, Row, Toast, ToastBody } from "reactstrap";

const Dashboard = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <Row>
                            <GoalList />
                        </Row>
                        <Row>
                            <NoteList />
                        </Row>
                    </Col>
                    <Col>
                        <Toast>
                            <ToastBody>
                                <BigButtons />
                            </ToastBody>
                        </Toast>
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