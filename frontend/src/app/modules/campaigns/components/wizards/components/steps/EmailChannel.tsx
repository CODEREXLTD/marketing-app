import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSteps,
  getStepsSequence,
} from "../../../../../../../redux/selectors";
import { addSequence, removeSequence, selectStep } from "../../../../../../../redux/actions";
import { StepContent } from "../../../../channels/content";

const EmailChannel: FC = () => {
  const getAllStep = useSelector(getSteps);
  const getStepSequence = useSelector(getStepsSequence);
  // console.log(getStepSequence)
  const dispatch = useDispatch();
  const onInsert = (step) => {
    let stepData = {
      step_id: (Math.random() + 1).toString(36).substring(7),
      key: step.key,
      type: step.type,
      title: step.title,
      channel: {},
      next_step: "",
    };

    if (step.key === "email") {
      stepData = {
        ...stepData,
        channel: {
          subject: "",
          sender_email: "",
          body: "",
        },
      };
    }

    dispatch(addSequence(stepData));
  };


  const onRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeSequence(index));
  };

  useEffect(() => {
    if (getStepSequence.length > 0) {
      let lastIndex = getStepSequence[getStepSequence.length - 1];
      dispatch(selectStep(lastIndex, getStepSequence.length - 1));
    } else {
      let lastIndex = getStepSequence[0];
      dispatch(selectStep(lastIndex, 0));
    }
  }, [getStepSequence]);
  return (
    <div className="w-100 email-channels">
      <div className="d-flex flex-column flex-lg-row">
        <div
          className="d-none d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-275px"
          data-kt-drawer="true"
          data-kt-drawer-name="inbox-aside"
          data-kt-drawer-activate="{default: true, lg: false}"
          data-kt-drawer-overlay="true"
          data-kt-drawer-width="225px"
          data-kt-drawer-direction="start"
          data-kt-drawer-toggle="#kt_inbox_aside_toggle"
        >
          <div
            className="card card-flush mb-0"
            data-kt-sticky="false"
            data-kt-sticky-name="inbox-aside-sticky"
            data-kt-sticky-offset="{default: false, xl: '100px'}"
            data-kt-sticky-width="{lg: '275px'}"
            data-kt-sticky-left="auto"
            data-kt-sticky-top="100px"
            data-kt-sticky-animation="false"
            data-kt-sticky-zindex="95"
          >
            <div className="card-body">
              <ul className="steps-wrapper">
                {getStepSequence.map((step, index) => (
                  <li className="single-step" key={index}>
                    <div className="step-card">
                      <div className="step-name">
                        <p>{step.title}</p>
                        <div style={{ flexGrow: 1 }}></div>
                        <a href="#" className="step-delete" onClick={(e) => onRemove(e, index)}>
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                      <div className="step-body">`Email Subject`</div>
                    </div>
                  </li>
                ))}
              </ul>

              {getAllStep.map((step, index) => (
                <div key={index}>
                  <span className="menu-title fw-semibold"> </span>
                  <div
                    className="menu menu-column menu-rounded menu-state-bg menu-state-title-primary"
                    onClick={() => onInsert(step)}
                  >
                    <div className="menu-item">
                      <span className="menu-link">
                        <span className="menu-icon">
                          <i className="ki-outline ki-plus fs-2 me-3 lh-0"></i>
                        </span>
                        <span className="menu-title fw-semibold">
                          Add {step.title}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <StepContent />
      </div>
    </div>
  );
};

export { EmailChannel };
