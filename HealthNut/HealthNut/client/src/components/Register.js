import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, ToastHeader, ToastBody, Toast } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [goalWeight, setGoalWeight] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { name, email, goalWeight };
      register(userProfile, password)
        .then(() => history.push("/dashboard"));
    }
  };

  return (
    <div className="p-5 my-5 mx-5 rounded">
      <Toast style={{ backgroundColor: "#91D260" }}>
        <ToastHeader>
          Register
        </ToastHeader>
        <ToastBody>
          <Form onSubmit={registerClick}>
            <fieldset>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" autoFocus onChange={e => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="goal">Goal Weight</Label>
                <Input id="goal" type="text" onChange={e => setGoalWeight(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Button style={{ backgroundColor: "#4472CA" }}>Register</Button>
              </FormGroup>
            </fieldset>
          </Form>
        </ToastBody>
      </Toast>
    </div>
  );
}