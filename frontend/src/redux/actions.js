export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT'
  };
};
export const setCampaign = (campaigns) => {
    return {
        type : 'SET_CAMPAIGN',
        payload : campaigns
    };
};
export const addCampaign = (campaigns) => {
    return {
        type : 'ADD_CAMPAIGN',
        payload : campaigns
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

export function selectStep(value,index) {
    return {
        type: "SET_SELECTED_STEP",
        value,
        index
    };
}