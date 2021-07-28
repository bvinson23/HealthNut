import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteGoal } from "../../modules/goalManager";

const Goal = ({ goal, getGoals }) => {
    const history = useHistory();
    const deleteSelectedGoal = (evt) => {
        evt.preventDefault();
        let result = window.confirm("Are you sure you want to delete this goal?")
        if (result) {
            deleteGoal(goal.id).then(() => getGoals());
        }
    }

    return (
        <Card>
            <CardBody>
                <div className="GoalList">
                    <label style={{width: "10em" }}>Weight Goal: {goal.weight}</label>
                    <label style={{width: "10em" }}>Current Weight: </label>
                    <Button onClick={() => history.push(`/goals/edit/${goal.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedGoal} style={{width: "5em", marginLeft: ".5rem"}}>Weigh In</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Goal;