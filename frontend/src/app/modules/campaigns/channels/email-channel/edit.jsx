import { useDispatch, useSelector } from "react-redux";
import { updateEmailContent } from "../../../../../redux/actions";
import { getSelectedStep, getSelectedStepType, getStepIndex } from "../../../../../redux/selectors";

export default function Edit(){
    const dispatch = useDispatch();
    const selectedStep = useSelector(getSelectedStep);
    const selectedStepType = useSelector(getSelectedStepType);
    const selectedStepIndex = useSelector(getStepIndex);
    const inputChangeHandle = (data) =>{
        if (selectedStep && selectedStep.channel) {
                dispatch(updateEmailContent(selectedStep,data,selectedStepIndex));
        }
    }
      return (
          <>
              <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between py-3">
                        <h2 className="card-title m-0">Compose Message</h2>
                        <a href="#" className="btn btn-sm btn-icon btn-color-primary btn-light btn-active-light-primary d-lg-none" data-bs-toggle="tooltip" data-bs-dismiss="click" data-bs-placement="top" title="Toggle inbox menu" id="kt_inbox_aside_toggle">
                            <i className="ki-outline ki-burger-menu-2 fs-3 m-0"></i>
                        </a>
                    </div>
                    <div className="card-body p-0">
                        <div id="kt_inbox_compose_form">
                            <div className="d-block">
                                <div className="border-bottom">
                                    <input className="form-control form-control-transparent border-0 px-8 min-h-45px" name="subject" value={selectedStep?.channel.subject} onChange={(e) => inputChangeHandle(e)} placeholder="Subject" />
                                </div>
                                <div id="kt_inbox_form_editor" className="bg-transparent border-0 h-350px px-3">
                                    <textarea
                                    className="form-control form-control-transparent border-0 px-8 min-h-45px"
                                    name="body"
                                    onChange={(e) => inputChangeHandle(e)}
                                    value={selectedStep?.channel.body}
                                    placeholder="Write text here"
                                    rows={4}
                                    cols={40}
                                  />
                                </div>
                            </div>
                            <div className="d-flex flex-stack flex-wrap gap-2 py-5 ps-8 pe-5 border-top">
                                <div className="d-flex align-items-center me-3">
                                    <div className="btn-group me-4">
                                        <span className="btn btn-primary fs-bold px-6" data-kt-inbox-form="send">
                                            <span className="indicator-label">Send Test Email</span>
                                            <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                        </span>
                                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">
                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3">Schedule send</a>
                                            </div>
                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3">Save & archive</a>
                                            </div>
                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3">Cancel</a>
                                            </div>
                                        </div>
                                    </div>
                                {/* <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary me-2" id="kt_inbox_reply_attachments_select" data-kt-inbox-form="dropzone_upload">
                                    <i className="ki-outline ki-paper-clip fs-2 m-0"></i>
                                </span>
                                <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary">
                                    <i className="ki-outline ki-geolocation fs-2 m-0"></i>
                                </span> */}
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary me-2" data-toggle="tooltip" title="More actions">
                                    <i className="ki-outline ki-setting-2 fs-2"></i>
                                </span>
                                <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary" data-inbox="dismiss" data-toggle="tooltip" title="Dismiss reply">
                                    <i className="ki-outline ki-trash fs-2"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}