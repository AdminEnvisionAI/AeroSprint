import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserStory from "./userStory";
import Settings from './Settings';
import GenerateUserStory from './GenerateUserStory';
import TestCase from "../TestCase/testCase";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";

const steps = ['BRD', 'Configure', 'Generate User Story'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if (isLastStep()) {
      window.location.href = './testcase';
      console.log("Navigating to UserStoryGeneration component");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <DashboardLayout height='250px'>
    <DashboardNavbar />
    <Box sx={{ width: '100%' }}>
    <Stepper nonLinear activeStep={activeStep} style={{ background: 'transparent', boxShadow: 'none' }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} style={{background:'transparent', width: '31%'}}>
            <StepButton color="inherit" onClick={handleStep(index)} style={{background:'transparent',flexDirection: 'column'}}>
              <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2} style={{margin:'5px 5px 5px 5px'}}>
        <MDBox
          variant="gradient"
          bgColor={'light'}
          color={'light' === "light" ? "dark" : "white"}
          coloredShadow={'light'}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
          style={{background:'lightblue'}}
        >
          <Icon fontSize="medium" color="inherit" style={{fontFamily: 'none', background:'lightblue'}}>
            {index+1}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25} style={{margin:'5px 5px 5px 5px'}}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {/* {title} */}
            {/* {index} */}
            {/* {label} */}
          </MDTypography>
          <MDTypography variant="h4" style={{margin: '0px',
            fontSize: '1.5rem !important',
            lineHeight: '1.375 !important',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: '700 !important',
            letterSpacing: '0.00735em !important',
            opacity: '1',
            color: 'rgb(52, 71, 103)'}}>
            {/* {count} */}
            {label}
            </MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            // color={percentage.color}
          >
            {/* {percentage.amount} */}
            {'                       '}
          </MDTypography>
          {/*
           &nbsp;{percentage.label} */}
           {'                       '}
        </MDTypography>
      </MDBox>
    </Card>
            </StepButton>
            {/* <Divider /> */}
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Card>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep === 0 && <UserStory />}
              {activeStep === 1 && <Settings />}
              {activeStep === 2 && <GenerateUserStory />}
              {activeStep !== 0 && activeStep !== 1 && activeStep !== 2 && <TestCase />}
            </Typography>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))} */}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
    </DashboardLayout>
  );
}