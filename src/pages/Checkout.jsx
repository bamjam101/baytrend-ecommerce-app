import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import ReviewForm from "../components/ReviewForm";
import { clearCart } from "../feature/cart-slice";
import { clearCheckoutInformation } from "../feature/checkout-slice";

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const getStepContent = (activeStep) => {
  switch (activeStep) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <ReviewForm />;
    default:
      throw new Error("Unknown Step");
  }
};

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === steps.length) {
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  }, [activeStep]);

  function handleNext() {
    setActiveStep(activeStep + 1);
  }
  function handleBack() {
    setActiveStep(activeStep !== 0 ? activeStep - 1 : activeStep);
  }
  return (
    <Container component={"section"} maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component={"h1"} variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{
            pt: 3,
            pb: 5,
          }}
        >
          {steps?.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your order number is {Math.random()}. We have shared the details
              of the order and dispatch on your registered email.
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              fullWidth
            >
              <Link to="/">Shop more...</Link>
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {activeStep !== 0 ? (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              ) : null}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
