import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
import { useHistory } from "react-router-dom";

const Goal = ({ user, weight }) => {
    const history = useHistory();

    return (
        <Card>
            <CardBody>
                <div className="GoalList">
                    <Row>Weight Goal: {user.goalWeight} lbs</Row>
                    <Row>Current Weight: {weight?.currentWeight} lbs</Row>
                    <Button onClick={() => history.push(`/goals/edit/${user.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Update Goal</Button>
                    <Button onClick={() => history.push("/weight/add")} style={{width: "5em", marginLeft: ".5rem"}}>Weigh In</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Goal;