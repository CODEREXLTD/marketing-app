import { step as Email } from '../app/modules/campaigns/channels/email-channel';
import { step as Linkedin } from '../app/modules/campaigns/channels/linkedin';

const initialState = {
  counter: 0,
  campaignStep: [
      Email,
      Linkedin
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
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default rootReducer;
