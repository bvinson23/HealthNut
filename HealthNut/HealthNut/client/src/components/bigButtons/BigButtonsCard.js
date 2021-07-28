import React from "react";
import { Card, CardBody, Button, Jumbotron, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

const BigButtons = () => {
    const history = useHistory();

    return (
        <div>
            <Jumbotron>
                <div className="space-between">
                    <br></br>
                    <Col>
                        <h3>What would you like to do?</h3>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => history.push("/meals/add")}
                            size="lg">
                            Add A Meal
                        </Button>
                    </Col>
                    <br></br>
                    <Col>
                        <Button
                            onClick={() => history.push("/workouts/add")}
                            size="lg">
                            Add A Workout
                        </Button>
                    </Col>
                </div>
            </Jumbotron>
        </div>
    )
};

export default BigButtons;