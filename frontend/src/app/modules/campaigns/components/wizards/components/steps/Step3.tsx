import React, { FC, useCallback } from "react";
import { Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCampaign,
  getSteps,
  getStepsSequence,
} from "../../../../../../../redux/selectors";
import { addSequence } from "../../../../../../../redux/actions";

const Step3: FC = () => {
  const getAllStep = useSelector(getSteps);
  const getStepSequence = useSelector(getStepsSequence);
  console.log(getStepSequence);
  const dispatch = useDispatch();
  const onInsert = useCallback(
    (step) => {
      let stepData = {
        step_id: (Math.random() + 1).toString(36).substring(7),
        key: step.key,
        type: step.type,
        channel: {},
        next_step: "",
      };
      // Assuming step is the item you want to pass to addSequence action creator
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
      dispatch(addSequence(stepData)); // Dispatch your action with the 'step' as argument
    },
    [dispatch] // Make sure to include dispatch as a dependency
  );

  return (
    <div className="w-100">
      <div>
        {getAllStep.map((step, index) => (
          <li key={index} onClick={() => onInsert(step)}>
            {step.title}
          </li>
        ))}
      </div>
      <div className="pb-10 pb-lg-12">
        <h2 className="fw-bolder text-dark">Business Details</h2>

        <div className="text-gray-400 fw-bold fs-6">
          If you need more info, please check out
          <a href="/dashboard" className="link-primary fw-bolder">
            {" "}
            Help Page
          </a>
          .
        </div>
      </div>

      <div className="fv-row mb-10">
        <label className="form-label required">Business Name</label>

        <Field
          name="businessName"
          className="form-control form-control-lg form-control-solid"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="businessName" />
        </div>
      </div>

      <div className="fv-row mb-10">
        <label className="d-flex align-items-center form-label">
          <span className="required">Shortened Descriptor</span>
        </label>

        <Field
          name="businessDescriptor"
          className="form-control form-control-lg form-control-solid"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="businessDescriptor" />
        </div>

        <div className="form-text">
          Customers will see this shortened version of your statement descriptor
        </div>
      </div>

      <div className="fv-row mb-10">
        <label className="form-label required">Corporation Type</label>

        <Field
          as="select"
          name="businessType"
          className="form-select form-select-lg form-select-solid"
        >
          <option></option>
          <option value="1">S Corporation</option>
          <option value="1">C Corporation</option>
          <option value="2">Sole Proprietorship</option>
          <option value="3">Non-profit</option>
          <option value="4">Limited Liability</option>
          <option value="5">General Partnership</option>
        </Field>
        <div className="text-danger mt-2">
          <ErrorMessage name="businessType" />
        </div>
      </div>

      <div className="fv-row mb-10">
        <label className="form-label">Business Description</label>

        <Field
          as="textarea"
          name="businessDescription"
          className="form-control form-control-lg form-control-solid"
          rows={3}
        ></Field>
      </div>

      <div className="fv-row mb-0">
        <label className="fs-6 fw-bold form-label required">
          Contact Email
        </label>

        <Field
          name="businessEmail"
          className="form-control form-control-lg form-control-solid"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="businessEmail" />
        </div>
      </div>
    </div>
  );
};

export { Step3 };
