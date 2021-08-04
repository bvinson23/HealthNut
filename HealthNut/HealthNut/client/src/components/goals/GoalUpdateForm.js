import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../../modules/authManager";
import { Form, FormGroup, Button, Toast, ToastBody } from "reactstrap";

const UpdateGoal = () => {
    const [user, setUser] = useState({});

    const history = useHistory();

    const getUser = () => {
        getCurrentUser().then(user => setUser(user));
    };

    const handleInputChange = (evt) => {
        const editedUser = { ...user }
        let selectedValue = evt.target.value
        editedUser[evt.target.id] = selectedValue
        setUser(editedUser)
    };

    const handleSave = (click) => {
        click.preventDefault();
        updateCurrentUser(user)
            .then(() => history.push("/dashboard"))
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    useEffect(() => {
        getUser()
    }, []);

    return (
        <Toast className="mt-5" style={{backgroundColor: "#61B521"}}>
            <ToastBody>
                <Form>
                    <FormGroup>
                        <label>Weight Goal</label>
                        <input type="text"
                            id="goalWeight"
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="form-control"
                            defaultValue={user.goalWeight} />
                    </FormGroup>
                </Form>
                <Button className="article-btn"
                    style={{backgroundColor: "#4472CA"}}
                    onClick={handleSave}>Save</Button>
                <Button className="article-btn"
                    style={{backgroundColor: "#4472CA"}}
                    variant="warning"
                    onClick={handleCancelSave}>Cancel</Button>
            </ToastBody>
        </Toast>
    )
};

export default UpdateGoal;