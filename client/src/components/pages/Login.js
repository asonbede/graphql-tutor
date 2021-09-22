import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import { AuthContext } from "../../context/Auth";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";
function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  // const [values,setValues]= useState({
  //     username:"",
  //     email:"",
  //     password:"",
  //     confirmPassword:""
  // })
  console.log("inerror", errors);
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  // const onChange= (event)=>{
  //     setValues({...values,[event.target.name]:event.target.value})
  // }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      //console.log("myErrors",err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  // const onSPubmit= (event)=>{
  //     event.preventDefault()
  //     addUser()
  // }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login Page </h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          type="password"
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message}">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username

      password: $password
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Login;
