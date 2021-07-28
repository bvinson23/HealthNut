import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Goal = ({ goal, weight }) => {
    const history = useHistory();

    return (
        <Card>
            <CardBody>
                <div className="GoalList">
                    <label style={{width: "10em" }}>Weight Goal: {goal.weight}</label>
                    <label style={{width: "10em" }}>Current Weight: {weight.currentWeight}</label>
                    <Button onClick={() => history.push(`/goals/edit/${goal.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Update Goal</Button>
                    <Button onClick={() => history.push("/weight/add")} style={{width: "5em", marginLeft: ".5rem"}}>Weigh In</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Goal;