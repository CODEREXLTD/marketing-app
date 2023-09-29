export const selectCounter = state => state.counter;
export function getAllCampaign(state){
    return state.campaigns;
}
export function getSteps(state){
    return state.campaignStep;
}
export function getStepsSequence(state){
    return state.sequence;
}

export function getSelectedStep(state){
    return state.selectedStep;
}

export function getStepType(state, key){
    const emailChannel = state.campaignStep.find(channel => channel.key === key);
    return emailChannel ?? undefined;
}

export function getSelectedStepType(state){
    return getStepType(state, state.selectedStep?.key);
}
