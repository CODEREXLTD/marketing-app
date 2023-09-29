import {useSelector} from "react-redux";
import {getSelectedStep, getSteps,getSelectedStepType} from "../../../../redux/selectors";

export function StepContent() {

    const getAllStep = useSelector(getSteps);
    const selectedStep = useSelector(getSelectedStep);
    const selectedStepType = useSelector(getSelectedStepType);

        if (!selectedStep) {
        return <div className="no-step-selected message"><p>No step selected.</p></div>
    }

    if (!selectedStepType) {
        return <div className="no-step-selected">Unknown step type.</div>
    }

    const Edit = selectedStepType.edit;
    return(
        <>

            <>
                <Edit/>
            </>

        </>
    )
}