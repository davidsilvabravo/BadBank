import { Button, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import * as yup from "yup";
import { toast } from "react-toastify";


const Withdraw = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const {user, setUser, savings, setSavings} = useUserContext();
  const [balance, setBalance] = useState(savings);

  const validationSchema = yup.object({
    withdrawAmount: yup
      .number()
      .min(1, "Must be greater or equal than $1")
      .max(balance, "Insufficient Funds")
      .required("Withdraw Amount is required")
      .typeError("The withdraw amount must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      withdrawAmount: "",
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      const u = user; // creo una variable local u, donde guardo la lista de usuarios
      const witAmount = parseFloat(formik.values.withdrawAmount);
      u[0].savings -= witAmount; // actualizo en mi variable local el nuevo balance
      setSavings(u[0].savings);
      setUser(u); // actualizo la lista de usuarios, con el balance actualizado
      formik.resetForm();
      toast.success("Withdraw successful");
      return;
    },
  });
 

  // Listen for changes on withdraw amount; when it changes, and if there's a value on the withdraw textbox the button enables
  useEffect(() => {
    const { withdrawAmount } = formik.values;

    if (withdrawAmount.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]); // this includes formik.values.withdrawAmount

  // Listen to any change on users array to see if it is necessary to update the balance value
  useEffect(() => {
    setBalance(savings);
  }, savings); // this includes formik.values.withdrawAmount


  return (
    <>
        <div className="card-container">
          <div className="card" id="cardWithdraw">
            <h5 className="card-title">Withdraw</h5>
            <img src="/images/retiro.jpg" className="card-img-top" alt="..." />
            <h4 className="card-text" id="balance">
              Balance: <span>${savings}</span>
            </h4>
            <Box m={2}>
              <TextField
                className="text-box"
                id="withdrawAmount"
                name="withdrawAmount"
                label="Please enter amount"
                value={formik.values.withdrawAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.withdrawAmount &&
                  Boolean(formik.errors.withdrawAmount)
                }
                helperText={
                  formik.touched.withdrawAmount &&
                  formik.errors.withdrawAmount
                }
              />
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={isDisabled}
              >
                Withdraw
              </Button>
            </Box>
          </div>
        </div>
    </>
  );
};

export default Withdraw;
