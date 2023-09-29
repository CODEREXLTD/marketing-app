import { step as Email } from '../app/modules/campaigns/channels/email-channel';
import { step as Linkedin } from '../app/modules/campaigns/channels/linkedin';

const initialState = {
  counter: 0,
  campaignStep: [
      Email,
      // Linkedin
  ],
  sequence: []

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      };
    case 'SET_CAMPAIGN':

      return {
        ...state,
        campaigns: action.payload
      };
    case 'ADD_CAMPAIGN':

      return {
        ...state,
        campaigns: [...state.campaigns, action.payload]
      };
      case 'ADD_SEQUENCE':
      let seqStep = state.sequence
      const currentStep = action.payload
      if(seqStep.length > 0){
          seqStep[seqStep.length -1].next_step = currentStep.step_id
      }
      return {
        ...state,
        sequence: [...state.sequence, action.payload]
      };
      case 'SET_SELECTED_STEP':
        return {
            ...state,
            selectedStep: action.value,
            selectedStepIndex: action.index,
        };
      case 'UPDATE_EMAIL_STEP':
         let inputData = action.data;
         let iname = inputData.target.name;
          let selectedStep = action.selectedStep;
          let selectedStepIndex = action.index; // Assuming action.index holds the correct index
          let allSeqStep = [...state.sequence]; // Create a shallow copy of the sequence array

          if (selectedStep && selectedStep.channel ) {
              selectedStep.channel[iname] = inputData.target.value; // Assuming inputData.subject holds the value you want to set
          }
          if( selectedStepIndex !== undefined){
              allSeqStep[selectedStepIndex] = selectedStep;
          }
          return {
              ...state,
              selectedStep: selectedStep,
              selectedStepIndex: selectedStepIndex, // Update selectedStepIndex with the correct value
              sequence: allSeqStep,
          };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default rootReducer;
