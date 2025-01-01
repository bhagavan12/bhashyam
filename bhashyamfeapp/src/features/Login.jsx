import React from "react";
import { Form, Formik, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/schoolApi";
import zonalRoutes from "../routes/zonalRoutes";
import principalRoutes from "../routes/principalRoutes";
import customercareRoutes from "../routes/customerCareRoutes";
import adminRoutes from "../routes/adminRoutes"
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
          // window.localStorage.setItem("routes",principalRoutes);
          // console.log("principalRoutes in login page",principalRoutes);
          navigate("/principal");
          
        } else if(res.data.role=="Customercare"){
          // window.localStorage.setItem("routes",customercareRoutes);
          // console.log("customercareRoutes in login page",customercareRoutes);
          navigate("/allcomplaints");
        } else if(res.data.role=="Admin"){
          // window.localStorage.setItem("routes",adminRoutes)
          // console.log("adminRoutes in login page",adminRoutes);
          navigate("/home");
        }else {
          // window.localStorage.setItem("routes",zonalRoutes);
          // console.log("zonalRoutes in login page",zonalRoutes);
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
