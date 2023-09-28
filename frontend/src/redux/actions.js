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