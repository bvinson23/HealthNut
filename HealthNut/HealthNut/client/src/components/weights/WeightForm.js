import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addWeight } from "../../modules/weightManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

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
            .then(() => history.push("/goals"))
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/goals")
    };

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Current Weight</label>
                    <input type="text"
                        id="currentWeight"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Current Weight..."
                        value={weight.currentWeight} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>Cancel</Button>
        </Container>
    )
};

export default AddNewWeight;