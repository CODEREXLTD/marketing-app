import React, {FC, useCallback, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSteps,
  getStepsSequence,
  getStepIndex
} from "../../../../../../../redux/selectors";
import { addSequence, removeSequence, selectStep } from "../../../../../../../redux/actions";
import { StepContent } from "../../../../channels/content";

const EmailChannel: FC = () => {
  const getAllStep = useSelector(getSteps);
  const getStepSequence = useSelector(getStepsSequence);
  const selectedStepIndex = useSelector(getStepIndex);
  const [inserted, setInserted] = useState(false)
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
    setInserted(!inserted)
  };


  const onRemove = (e, index) => {
    e.preventDefault();
    dispatch(removeSequence(index));
    if(getStepSequence[index + 1]){
       let data = getStepSequence[index+1];
      dispatch(selectStep(data, index));
    }else{
      if(getStepSequence[index - 1 ]){
        let data = getStepSequence[index-1];
      dispatch(selectStep(data, index));
      }
    }

  };

  /**
   * Active the current step
   * 
   * 
   * @param step 
   * @param key 
   */
  const handleStep =(step, key) =>{
      dispatch(selectStep(step, key));
  }

  useEffect(() => {
    if (getStepSequence.length > 0) {
      let lastIndex = getStepSequence[getStepSequence.length - 1];
      dispatch(selectStep(lastIndex, getStepSequence.length - 1));
    } else {
      let lastIndex = getStepSequence[0];
      if(lastIndex){
        dispatch(selectStep(lastIndex, 0));
      }
    }
  }, [inserted]);

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
                    <div key={index} className={`single-step ${selectedStepIndex == index ? "active" : ""}`}>
                       <a href="#" className="step-delete" onClick={(e) => onRemove(e, index)}>
                            <i className="fa fa-trash" style={{ color: 'red' }}></i>
                       </a>
                      <div  onClick={() => handleStep(step,index)}>
                        <div className="step-card">
                            <div className="step-name">
                              <p>{step.title}</p>
                              <div style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="step-body">{ step.channel.subject !== '' ? step.channel.subject : '<Empty Subject>' }</div>
                        </div>
                      </div>
                    </div>

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
