import { Button, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import * as yup from "yup";
import { toast } from "react-toastify";


const Deposit = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const {user, setUser, savings, setSavings} = useUserContext();
  const [balance, setBalance] = useState(savings);

  const validationSchema = yup.object({
    depositAmount: yup
      .number()
      .min(1, "Must be greater or equal than $1")
      .required("Deposit Amount is required")
      .typeError("The deposit amount must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      depositAmount: "",
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      const u = user; // creo una variable local u, donde guardo la lista de usuarios
      const depAmount = parseFloat(formik.values.depositAmount); // leo el monto que han ingresado para depositar
      u[0].savings += depAmount; // actualizo en mi variable local el nuevo balance
      setSavings(u[0].savings);
      setUser(u); // actualizo la lista de usuarios, con el balance actualizado
      formik.resetForm();
      toast.success("Deposit successful");
      return;
    },
  });


  // Listen for changes on deposit amount; when it changes, and if there's a value on the deposit textbox the button enables
  useEffect(() => {
    const { depositAmount } = formik.values;

    if (depositAmount.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]); // this includes formik.values.depositAmount


  // Listen to any change on users array to see if it is necessary to update the balance value
  useEffect(() => {
    setBalance(savings);
  }, [savings]); // this includes formik.values.withdrawAmount


  return (
    <>
        <div className="card-container">
          <div className="card" id="cardDeposit">
            <h5 className="card-title">Deposit</h5>
            <img src="/images/savings.png" className="card-img-top" alt="..." />
            <h4 className="card-text" id="balance">
              Balance: <span>${savings}</span>
            </h4>
            <Box m={2}>
              <TextField
                className="text-box"
                id="depositAmount"
                label="Please enter amount"
                name="depositAmount"
                variant= "outlined"
                value={formik.values.depositAmount}  // TextField value will be considered among formik.values */
                onChange={formik.handleChange}
                error={
                  formik.touched.depositAmount &&      /* ??? */
                  Boolean(formik.errors.depositAmount) /* ??? */
                }
                helperText={
                  formik.touched.depositAmount && formik.errors.depositAmount  /* ??? */
                }
              />
              <Button
                variant="contained"
                onClick={formik.handleSubmit} /* Entiendo que solo es el aviso: "escuchar al final, al click del botón DEPOSIT" */
                disabled={isDisabled}
              >
                Deposit
              </Button>
            </Box>
          </div>
        </div>
    </>
  );
};

export default Deposit;
