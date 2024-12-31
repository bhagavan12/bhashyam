import React from "react";
import { Form, Formik, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/schoolApi";

function Login() {
  var [loginFn] = useLoginMutation();
  var navigate = useNavigate();
  var initialValues = {
    empid: "",
    password: "",
  };
  var onSubmit = (values) => {
    console.log(values);
    loginFn(values).then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.msg == "success") {
        if (res.data.role == "principal") {
          navigate("/principal");
        } else if(res.data.role=="Customercare"){
          
          navigate("/allcomplaints");
        } else if(res.data.role=="Admin"){
          navigate("/home");
        }else {
          navigate("/zonals");
        }
      } 
    });
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {
          () => {
                return (
                  <div className="row justify-content-center" style={{ marginTop: "140px" }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                      <div className="border border-light p-4 rounded shadow">
                        <h3 className="text-center mb-4">LOGIN</h3>
                        <Form>
                          <Field name="empid" className="form-control p-2 mb-2" placeholder="Empid"/>
                          <br />
                          <Field name="password" type="password" className="form-control p-2" placeholder="Password"/>
                          <br />
                          <button className="btn btn-info w-100 mb-2">Login</button>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
        }}
      </Formik>
    </div>
  );
}

export default Login;
