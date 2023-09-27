/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
const AddCampaign: FC = () => {
  return (
    <div className='modal fade' id='kt_modal_add_campaign' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTIcon iconName='cross' className='fs-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Add Campaign</h1>

              <div className='text-muted fw-bold fs-5'>
                If you need more info, please check out
                <a href='#' className='link-primary fw-bolder'>
                  {' '}
                  FAQ Page
                </a>
                .
              </div>
            </div>

            <div className='separator d-flex flex-center mb-8'>
              <span className='text-uppercase bg-body fs-7 fw-bold text-muted px-3'>or</span>
            </div>
            <input type="text" className='form-control form-control-solid mb-8'  placeholder='Type Campaign Name'/>

            <div className='d-flex flex-stack'>
                  <div
                      className='card-toolbar'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      data-bs-trigger='hover'
                      title='Click to add a user'
                    >
                    <a
                        href='#'
                        className='btn btn-sm btn-light-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_add_campaign'
                      >
                      Create Campaign
                    </a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {AddCampaign}
