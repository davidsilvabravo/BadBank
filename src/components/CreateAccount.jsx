import { useState, useEffect } from "react";
import { useFormik } from "formik";
import useUserContext from "../hooks/useUserContext";
import { toast } from "react-toastify";
import User from "../models/userModel";
import * as yup from "yup";
import { ref } from "yup";
import { Button, TextField, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const CreateAccount = () => {
  //Users context
  const {user, setUser} = useUserContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [otherAccount, setOtherAccount] = useState(false);

  //Registration validation schema using yup
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      userPic: "/images/Avatar0.png",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      const isDuplicate = user.find(
        (user) => user.email === formik.values.email
      );

      if (isDuplicate) {
        toast.error("Email already in use");
        return;
      }

      //Using a custom class as a model / schema
      const persona = new User();
      persona.name = formik.values.name;
      let nombre = persona.name ;
      persona.email = formik.values.email;
      persona.password = formik.values.password;
      persona.savings = 0;
      persona.transactionHistory = [];

      setUser((prev) => [...prev, persona]);
      console.log("Se agregó a la persona: ");
      console.log(nombre);
      formik.resetForm();
      // setOtherAccount((prev) => !prev);
      setOtherAccount(true);
      toast.success("Successful user registration");
      return;
    }
  });

  //Listen for Form inputs
  useEffect(() => {
    const { name, email, password, confirmPassword } = formik.values;

    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);


  const handleClickYes = () => {
    setOtherAccount(false);
  };

  return (
    <>
      <div className="card-container">
        {otherAccount ? (
            <div className="card"  id="cardCreateAccount">
              <div className="card-body">
                <p>Would you like to add another account?</p>
                <Box m={2} className="custom-btn-group">
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    <NavLink to="/allData" id="idNo">
                      No
                    </NavLink>
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleClickYes}
                  >
                    Yes
                  </Button>
                </Box>
              </div>
            </div>
          ) : (
            <div className="card" id="cardCreateAccount">
                <h5 className="card-title">Register</h5>
                <img src="/images/linea8.jpg" className="card-img-top" alt="..." id="lineadegrade"/>
                <div id="registerForm">

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box no-padding-right"
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box no-padding-right"
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box no-padding-right"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Box>

                  <Box m={2}>
                    <TextField
                      className="text-box custom-input-box no-padding-right"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                  </Box>

                </div>
                
                <img src="/images/linea8.jpg" className="card-img-top" alt="..." id="lineadegrade"/>

                <Box m={2} className="custom-btn-group">
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={formik.handleSubmit}
                      disabled={isDisabled}
                    >
                      Register
                    </Button>
                  </Box>
            </div>
          )
        }
      </div>
      <br />
    </>
  );
};

export default CreateAccount;
