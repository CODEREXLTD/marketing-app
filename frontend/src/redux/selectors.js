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