import 'date-fns';
import React, { useState, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import pmmTheme from '../../ui-components/theme';
import firebase, { setFirestoreQuery } from '../../firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    form: {
      padding: '48px 36px 0'
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

function StepOne({ values, handleChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <TextField
            label='Title'
            placeholder='Add title...'
            fullWidth={true}
            value={values.title}
            onChange={handleChange('title')}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <DateTimePicker
            autoOk={true}
            ampm={false}
            disableFuture={true}
            value={values.date}
            onChange={handleChange('date')}
            label='Date'
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            label='Summary'
            multiline={true}
            fullWidth={true}
            value={values.summary}
            onChange={handleChange('summary')}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

function getSteps() {
  return ['Overview', 'Root Causes', 'Action Items', 'Timeline'];
}

function getStepContent(
  stepIndex: number,
  values: any,
  handleChange: (name: keyof any) => void
) {
  switch (stepIndex) {
    case 0:
      return <StepOne values={values} handleChange={handleChange} />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

export default function CreatePM() {
  const classes = useStyles(pmmTheme);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [values, setValues] = useState<any>({
    title: '',
    date: new Date()
  });

  const handleChange = (name: keyof any) => (
    data: ChangeEvent<HTMLInputElement> | any
  ) => {
    setValues({
      ...values,
      [name]: data.target ? data.target.value : data
    });
  };

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      const date = new Date().getTime().toString();
      setFirestoreQuery(firebase.firestore().collection('pm'), date, {
        id: date,
        ...values
      });
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel={true}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Post Mortem is completed!
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div className={classes.form}>
            {getStepContent(activeStep, values, handleChange)}
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
