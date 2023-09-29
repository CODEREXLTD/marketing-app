import { useDispatch } from "react-redux";
import { registerStepType } from "../../../../redux/actions";
import { step as Email } from "./email-channel/index";
// export const registerStep = (stepType) => {
//     const dispatch = useDispatch();
//     dispatch(registerStepType(stepType));
// };

export const Initialize = () => {
  const dispatch = useDispatch();
  dispatch(registerStepType(Email));
};
