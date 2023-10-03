export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const setCampaign = (campaigns) => {
  return {
    type: "SET_CAMPAIGN",
    payload: campaigns,
  };
};

export const setSequence = (sequence) => {
    return {
        type : 'SET_SEQUENCE',
        payload : sequence
    };
};

export const setSingleCampaign = (campaign) => {
    return {
        type : 'SET_SINGLE_CAMPAIGN',
        payload : campaign[0]
    };
};

export const addCampaign = (campaigns) => {
  return {
    type: "ADD_CAMPAIGN",
    payload: campaigns,
  };
};
export function registerStepType(stepType) {
  return {
    type: "REGISTER_STEP_TYPE",
    stepType,
  };
}
export function addSequence(step) {
  return {
    type: "ADD_SEQUENCE",
    payload: step,
  };
}

export function removeSequence(index) {
  return {
    type: "REMOVE_SEQUENCE",
    payload: index,
  };
}

export function selectStep(value, index) {
  return {
    type: "SET_SELECTED_STEP",
    value,
    index,
  };
}

export function updateEmailContent(selectedStep, data, selectedStepIndex) {
  return {
    type: "UPDATE_EMAIL_STEP",
    selectedStep,
    selectedStepIndex,
    data,
  };
}
export function updateEmailContentBody(selectedStep, data, selectedStepIndex) {
  return {
    type: "UPDATE_EMAIL_BODY_STEP",
    selectedStep,
    selectedStepIndex,
    data,
  };
}
