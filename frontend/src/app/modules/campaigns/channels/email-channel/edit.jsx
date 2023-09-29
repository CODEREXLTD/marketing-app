import React, {useEffect} from "react";
import Dropzone from 'dropzone';
import Quill from 'quill';
import {useDispatch, useSelector} from "react-redux";
import {getSelectedStep, getSelectedStepType, getStepIndex} from "../../../../../redux/selectors";
import {updateEmailContent} from "../../../../../redux/actions";

export default function Edit(){
        useEffect(() => {
                // Class definition
            var KTAppInboxCompose = function () {
            // Private functions
            // Init reply form
            const initForm = () => {
                // Set variables
                const form = document.querySelector('#kt_inbox_compose_form');
                // Handle CC and BCC
                // Handle submit form
                handleSubmit(form);

                // Init quill editor
                initQuill(form);

                // Init dropzone
                initDropzone(form);
            }

            // Handle submit form
            const handleSubmit = (el) => {
                const submitButton = el.querySelector('[data-kt-inbox-form="send"]');

                // Handle button click event
                submitButton.addEventListener("click", function () {
                    // Activate indicator
                    submitButton.setAttribute("data-kt-indicator", "on");

                    // Disable indicator after 3 seconds
                    setTimeout(function () {
                        submitButton.removeAttribute("data-kt-indicator");
                    }, 3000);
                });
            }

            // Init quill editor
            const initQuill = (el) => {
                var quill = new Quill('#kt_inbox_form_editor', {
                    modules: {
                        toolbar: [
                            [{
                                header: [1, 2, false]
                            }],
                            ['bold', 'italic', 'underline'],
                            ['image', 'code-block']
                        ]
                    },
                    placeholder: 'Type your text here...',
                    theme: 'snow' // or 'bubble'
                });

                // Customize editor
                const toolbar = el.querySelector('.ql-toolbar');

                if (toolbar) {
                    const classes = ['px-5', 'border-top-0', 'border-start-0', 'border-end-0'];
                    toolbar.classList.add(...classes);
                }
            }

            // Init dropzone
            const initDropzone = (el) => {
                // set the dropzone container id
                const id = '[data-kt-inbox-form="dropzone"]';
                const dropzone = el.querySelector(id);
                const uploadButton = el.querySelector('[data-kt-inbox-form="dropzone_upload"]');

                // set the preview element template
                var previewNode = dropzone.querySelector(".dropzone-item");
                previewNode.id = "";
                var previewTemplate = previewNode.parentNode.innerHTML;
                previewNode.parentNode.removeChild(previewNode);

                var myDropzone = new Dropzone(id, { // Make the whole body a dropzone
                    url: "https://preview.keenthemes.com/api/dropzone/void.php", // Set the url for your upload script location
                    parallelUploads: 20,
                    maxFilesize: 1, // Max filesize in MB
                    previewTemplate: previewTemplate,
                    previewsContainer: id + " .dropzone-items", // Define the container to display the previews
                    clickable: uploadButton // Define the element that should be used as click trigger to select files.
                });


                myDropzone.on("addedfile", function (file) {
                    // Hookup the start button
                    const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
                    dropzoneItems.forEach(dropzoneItem => {
                        dropzoneItem.style.display = '';
                    });
                });

                // Update the total progress bar
                myDropzone.on("totaluploadprogress", function (progress) {
                    const progressBars = dropzone.querySelectorAll('.progress-bar');
                    progressBars.forEach(progressBar => {
                        progressBar.style.width = progress + "%";
                    });
                });

                myDropzone.on("sending", function (file) {
                    // Show the total progress bar when upload starts
                    const progressBars = dropzone.querySelectorAll('.progress-bar');
                    progressBars.forEach(progressBar => {
                        progressBar.style.opacity = "1";
                    });
                });

                // Hide the total progress bar when nothing"s uploading anymore
                myDropzone.on("complete", function (progress) {
                    const progressBars = dropzone.querySelectorAll('.dz-complete');

                    setTimeout(function () {
                        progressBars.forEach(progressBar => {
                            progressBar.querySelector('.progress-bar').style.opacity = "0";
                            progressBar.querySelector('.progress').style.opacity = "0";
                        });
                    }, 300);
                });
            }


            // Public methods
            return {
                init: function () {
                    initForm();
                }
            };
        }();

        // On document ready
        KTAppInboxCompose.init();
        }, []);
         const dispatch = useDispatch();
        const selectedStep = useSelector(getSelectedStep);
        const selectedStepType = useSelector(getSelectedStepType);
        const selectedStepIndex = useSelector(getStepIndex);
        const inputChangeHandle = (data) =>{
            if (selectedStep && selectedStep.channel) {
                 dispatch(updateEmailContent(selectedStep,data,selectedStepIndex));
            }
        }
        // console.log(selectedStep)
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
                                <div id="kt_inbox_form_editor" className="bg-transparent border-0 h-350px px-3"></div>
                                <div className="dropzone dropzone-queue px-8 py-4" id="kt_inbox_reply_attachments" data-kt-inbox-form="dropzone">
                                    <div className="dropzone-items">
                                        <div className="dropzone-item" style={{display:'none'}}>
                                            <div className="dropzone-file">
                                                <div className="dropzone-filename" title="some_image_file_name.jpg">
                                                    <span data-dz-name="">some_image_file_name.jpg</span>
                                                    <strong>(
                                                    <span data-dz-size="">340kb</span>)</strong>
                                                </div>
                                                <div className="dropzone-error" data-dz-errormessage=""></div>
                                            </div>
                                            <div className="dropzone-progress">
                                                <div className="progress bg-gray-300">
                                                    <div className="progress-bar bg-primary" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} data-dz-uploadprogress={''}></div>
                                                </div>
                                            </div>
                                            <div className="dropzone-toolbar">
                                                <span className="dropzone-delete" data-dz-remove="">
                                                    <i className="ki-outline ki-cross fs-2"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-stack flex-wrap gap-2 py-5 ps-8 pe-5 border-top">
                                <div className="d-flex align-items-center me-3">
                                    <div className="btn-group me-4">
                                        <span className="btn btn-primary fs-bold px-6" data-kt-inbox-form="send">
                                            <span className="indicator-label">Send</span>
                                            <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                        </span>
                                        <span className="btn btn-primary btn-icon fs-bold w-30px pe-0" role="button">
                                            <span className="lh-0" data-kt-menu-trigger="click" data-kt-menu-placement="top-start">
                                                <i className="ki-outline ki-down fs-4 m-0"></i>
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
                                        </span>
                                    </div>
                                    <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary me-2" id="kt_inbox_reply_attachments_select" data-kt-inbox-form="dropzone_upload">
                                        <i className="ki-outline ki-paper-clip fs-2 m-0"></i>
                                    </span>
                                    <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary">
                                        <i className="ki-outline ki-geolocation fs-2 m-0"></i>
                                    </span>
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