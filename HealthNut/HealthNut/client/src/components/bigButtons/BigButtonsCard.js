import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../modules/authManager";

const BigButtons = () => {
    const history = useHistory();
    const [user, setUser] = useState({});

    const getUser = () => {
        getCurrentUser().then(user => setUser(user))
    };

    useEffect(() => {
        getUser();
    }, []);

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