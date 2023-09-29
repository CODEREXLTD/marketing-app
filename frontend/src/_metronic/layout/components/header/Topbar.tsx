/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { KTIcon } from '../../../helpers'

const Topbar: FC = () => (
  <div className='d-flex flex-shrink-0'>
    {/* begin::Invite user */}
    <div className='d-flex ms-3'>
      <a
        href='#'
        className='btn btn-flex flex-center bg-body btn-color-gray-700 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6'
        data-bs-toggle='modal'
        data-bs-target='#kt_modal_invite_friends'
      >
        <KTIcon iconName='plus' className='fs-2 text-primary me-0 me-md-2' />
        <span className='d-none d-md-inline'>New Member</span>
      </a>
    </div>
    {/* end::Invite user */}

    {/* begin::Create app */}
    <div className='d-flex ms-3'>
      <a
        href='#'
        className='btn btn-flex flex-center bg-body btn-color-gray-700 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6'
        id='kt_toolbar_primary_button'
        data-bs-toggle='modal'
        data-bs-target='#kt_modal_create_app'
      >
        <KTIcon iconName='document' className='fs-2 text-primary me-0 me-md-2' />
        <span className='d-none d-md-inline'>New App</span>
      </a>
    </div>
    {/* end::Create app */}
  </div>
)

export { Topbar }

