import React from "react";
import { Card, CardBody, Button, Row, Toast, ToastBody } from "reactstrap";
import { useHistory } from "react-router-dom";

const Goal = ({ user, weight }) => {
    const history = useHistory();

    return (
        <Toast style={{backgroundColor: "#61B521"}}>
            <ToastBody>
                <div className="GoalList">
                    <Row>Weight Goal: {user.goalWeight} lbs</Row>
                    <Row>Current Weight: {weight?.currentWeight} lbs</Row>
                    <Button onClick={() => history.push(`/goals/edit/${user.id}`)} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Update Goal</Button>
                    <Button onClick={() => history.push("/weight/add")} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Weigh In</Button>
                </div>
            </ToastBody>
        </Toast>
    )
};

export default Goal;