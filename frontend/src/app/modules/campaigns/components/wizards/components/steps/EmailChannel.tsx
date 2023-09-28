import { FC } from 'react'

const EmailChannel: FC = () => {
  return (
    <div className='w-100'>
									<div className="d-flex flex-column flex-lg-row">
										<div className="d-none d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-275px" data-kt-drawer="true" data-kt-drawer-name="inbox-aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_inbox_aside_toggle">
											<div className="card card-flush mb-0" data-kt-sticky="false" data-kt-sticky-name="inbox-aside-sticky" data-kt-sticky-offset="{default: false, xl: '100px'}" data-kt-sticky-width="{lg: '275px'}" data-kt-sticky-left="auto" data-kt-sticky-top="100px" data-kt-sticky-animation="false" data-kt-sticky-zindex="95">
												<div className="card-body">
													<a href="../../demo31/dist/apps/inbox/compose.html" className="btn btn-primary fw-bold w-100 mb-8">New Message</a>
													<div className="menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary mb-10">
														<div className="menu-item mb-3">
															<span className="menu-link active">
																<span className="menu-icon">
																	<i className="ki-outline ki-sms fs-2 me-3"></i>
																</span>
																<span className="menu-title fw-bold">Inbox</span>
																<span className="badge badge-light-success">3</span>
															</span>
														</div>
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-abstract-23 fs-2 me-3"></i>
																</span>
																<span className="menu-title fw-bold">Marked</span>
															</span>
														</div>
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-file fs-2 me-3"></i>
																</span>
																<span className="menu-title fw-bold">Draft</span>
																<span className="badge badge-light-warning">5</span>
															</span>
														</div>
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-send fs-2 me-3"></i>
																</span>
																<span className="menu-title fw-bold">Sent</span>
															</span>
														</div>
														<div className="menu-item">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-trash fs-2 me-3"></i>
																</span>
																<span className="menu-title fw-bold">Trash</span>
															</span>
														</div>
													</div>
													<div className="menu menu-column menu-rounded menu-state-bg menu-state-title-primary">
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-abstract-8 fs-5 text-danger me-3 lh-0"></i>
																</span>
																<span className="menu-title fw-semibold">Custom Work</span>
																<span className="badge badge-light-danger">6</span>
															</span>
														</div>
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-abstract-8 fs-5 text-success me-3 lh-0"></i>
																</span>
																<span className="menu-title fw-semibold">Partnership</span>
															</span>
														</div>
														<div className="menu-item mb-3">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-abstract-8 fs-5 text-info me-3 lh-0"></i>
																</span>
																<span className="menu-title fw-semibold">In Progress</span>
															</span>
														</div>
														<div className="menu-item">
															<span className="menu-link">
																<span className="menu-icon">
																	<i className="ki-outline ki-plus fs-2 me-3 lh-0"></i>
																</span>
																<span className="menu-title fw-semibold">Add Label</span>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
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
															<div className="d-flex align-items-center border-bottom px-8 min-h-50px">
																<div className="text-dark fw-bold w-75px">To:</div>
																<input type="text" className="form-control form-control-transparent border-0" name="compose_to" data-kt-inbox-form="tagify" />
																<div className="ms-auto w-75px text-end">
																	<span className="text-muted fs-bold cursor-pointer text-hover-primary me-2" data-kt-inbox-form="cc_button">Cc</span>
																	<span className="text-muted fs-bold cursor-pointer text-hover-primary" data-kt-inbox-form="bcc_button">Bcc</span>
																</div>
															</div>
															<div className="d-none align-items-center border-bottom ps-8 pe-5 min-h-50px" data-kt-inbox-form="cc">
																<div className="text-dark fw-bold w-75px">Cc:</div>
																<input type="text" className="form-control form-control-transparent border-0" name="compose_cc" data-kt-inbox-form="tagify" />
																<span className="btn btn-clean btn-xs btn-icon" data-kt-inbox-form="cc_close">
																	<i className="ki-outline ki-cross fs-5"></i>
																</span>
															</div>
															<div className="d-none align-items-center border-bottom inbox-to-bcc ps-8 pe-5 min-h-50px" data-kt-inbox-form="bcc">
																<div className="text-dark fw-bold w-75px">Bcc:</div>
																<input type="text" className="form-control form-control-transparent border-0" name="compose_bcc" data-kt-inbox-form="tagify" />
																<span className="btn btn-clean btn-xs btn-icon" data-kt-inbox-form="bcc_close">
																	<i className="ki-outline ki-cross fs-5"></i>
																</span>
															</div>
															<div className="border-bottom">
																<input className="form-control form-control-transparent border-0 px-8 min-h-45px" name="compose_subject" placeholder="Subject" />
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
									</div>
    </div>
  )
}

export { EmailChannel }

