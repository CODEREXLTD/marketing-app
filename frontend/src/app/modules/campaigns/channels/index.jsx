import { useDispatch, useSelector } from "react-redux";
import {setCampaign} from "../../../../redux/actions";
export const registerStepType = (stepType) => {
    const dispatch = useDispatch();
    dispatch(registerStepType(stepType));
};
