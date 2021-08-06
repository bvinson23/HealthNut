import React from "react";
import { Button, Jumbotron, Col } from "reactstrap";
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
                            style={{backgroundColor:"#4472CA"}}
                            onClick={() => history.push("/meals/add")}
                            size="lg">
                            Add A Meal
                        </Button>
                    </Col>
                    <br></br>
                    <Col>
                        <Button
                            style={{backgroundColor:"#4472CA"}}
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