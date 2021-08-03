import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/dashboard"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <div>
      <div className="p-5 my-5 mx-5 rounded">
        <Toast style={{backgroundColor: "#61B521"}}>
          <ToastHeader>
            Login
          </ToastHeader>
          <ToastBody>
            <Form onSubmit={loginSubmit}>
              <fieldset>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Button style={{backgroundColor: "#4472CA"}}>Login</Button>
                </FormGroup>
                <em>
                  Not registered? <Link to="register">Register</Link>
                </em>
              </fieldset>
            </Form>
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}