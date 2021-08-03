import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addWeight } from "../../modules/weightManager";
import { Form, FormGroup, Button, Container, Toast } from "reactstrap";

const AddNewWeight = () => {
    const [weight, setWeight] = useState({
        currentWeight: "",
    });

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newWeight = { ...weight }
        let selectedValue = evt.target.value
        newWeight[evt.target.id] = selectedValue
        setWeight(newWeight)
    };

    const handleSave = (click) => {
        click.preventDefault();
        addWeight(weight)
            .then(() => history.push("/dashboard"))
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    return (
        <Toast className="justified-content-center">
            <Form>
                <FormGroup>
                    <h5>Current Weight</h5>
                    <input type="text"
                        id="currentWeight"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Current Weight (lbs)..."
                        value={weight.currentWeight} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                style={{backgroundColor:"#4472CA"}}
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                style={{backgroundColor:"#4472CA"}}
                variant="warning"
                onClick={handleCancelSave}>Cancel</Button>
        </Toast>
    )
};

export default AddNewWeight;