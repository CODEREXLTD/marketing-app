
import { Form, Formik, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSingleCampaign } from '../../../../redux/actions';
import { getCampaign, getStepsSequence } from '../../../../redux/selectors';
import { StepperComponent } from '../../../../_metronic/assets/ts/components';
import { KTIcon } from '../../../../_metronic/helpers';
import { useAuth } from '../../auth';
import { fetchCampaign, saveCampaignSequence } from '../core/_requests';
import { createAccountSchemas, ICreateAccount, inits } from './wizards/components/CreateAccountWizardHelper';
import { EmailChannel } from './wizards/components/steps/EmailChannel';

const CampaignDetails: FC = () => {
    const stepperRef = useRef<HTMLDivElement | null>(null);
    const stepper = useRef<StepperComponent | null>(null);
    const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0]);
    const [initValues] = useState<ICreateAccount>(inits);
    const [isSubmitButton, setSubmitButton] = useState(true);
    const getStepSequence = useSelector(getStepsSequence);
    const campaign = useSelector(getCampaign);
    
    const { auth, currentUser } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();    
    
    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement);
    };

  const goToStep = (stepIndex: number) => {
    if (!stepper.current) {
      return;
    }

    stepper.current.goto(stepIndex);
    setCurrentSchema(createAccountSchemas[stepIndex - 1]);
    setSubmitButton(
      stepper.current.currentStepIndex === stepper.current.totalStepsNumber
    );
  };

    const prevStep = () => {
        if (!stepper.current) {
            return;
        }        

    const currentStepIndex = stepper.current.currentStepIndex;
    if (currentStepIndex > 1) {
      goToStep(currentStepIndex - 1);
    }
  };

    const submitStep = (values: ICreateAccount, actions: FormikValues) => {
        if (!stepper.current) {
            return;
        }

        const response = saveCampaignSequence( getStepSequence, campaign, auth?.token );

        if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
            goToStep(stepper.current.currentStepIndex + 1);
        } else {
            goToStep(1);
            actions.resetForm();
        }
    };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  useEffect( () => {    
    // declare the data fetching function
    const fetchData = async () => {
        const response = await fetchCampaign(id, currentUser?.id);                           
        dispatch(setSingleCampaign(response));      
    }
    // call the function
    fetchData()
  }, [id])
  

  return (
    <div className="card">
      <div className="card-body">
        <div
          ref={stepperRef}
          className="stepper stepper-links d-flex flex-column pt-15"
          id="kt_create_account_stepper"
        >
          <div className="stepper-nav mb-5">
            <div
              className="stepper-item"
              data-kt-stepper-element="nav"
              onClick={() => goToStep(1)}
            >
              <h3 className="stepper-title">Sequences</h3>
            </div>
          </div>

          <Formik
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {() => (
              <Form
                className="mx-auto w-100 pt-15 pb-10"
                id="kt_create_account_form"
              >
                <div className="current" data-kt-stepper-element="content">
                  <EmailChannel />
                </div>

                <div className="d-flex flex-stack pt-15">
                  <div className="mr-2">
                    <button
                      onClick={prevStep}
                      type="button"
                      className="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                    >
                      <KTIcon iconName="arrow-left" className="fs-4 me-1" />
                      Back
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary me-3"
                    >
                      <span className="indicator-label">
                        {!isSubmitButton && "Continue"}
                        {isSubmitButton && "Submit"}
                        <KTIcon
                          iconName="arrow-right"
                          className="fs-3 ms-2 me-0"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export { CampaignDetails };
