/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {AddCampaign} from "./AddCampaign";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCampaign } from '../../../../redux/actions';
import { getAllCampaign } from '../../../../redux/selectors';
import { formatDistanceToNow } from 'date-fns';
import {Link} from "react-router-dom";
type Props = {
  className: string
}
const CampaignTable: React.FC<Props> = ({className}) => {

  const campaigns = useSelector(getAllCampaign);
  const dispatch = useDispatch();
  const [isLoad, setLoad] = useState(false);

  const fetchCampaign = async () => {
    try {
      setLoad(true);
      const response = await axios.get("http://127.0.0.1:8000/api/campaigns/");
      const getData = response.data;
      dispatch(setCampaign(getData));
    } catch (error) {
      // Handle errors here
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, []); // Add the empty dependency array
  const timeDifferance =(time) =>{
    const date = new Date(time);

    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>All Campaign</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 members</span>
        </h3>
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
            <KTIcon iconName='plus' className='fs-3' />
            New Campaign
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Title</th>
                <th className='min-w-140px'>Status</th>
                <th className='min-w-120px'>Progress</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
            {campaigns !== undefined && campaigns.length > 0 && campaigns.map(campaign => (
              <tr key={campaign.id}>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value={campaign.id} />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <Link to={`/campaign/${campaign.id}`} className='text-dark fw-bold text-hover-primary fs-6'>
                        {campaign.name}
                      </Link>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {timeDifferance(campaign.created_at)}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    {campaign.isActive ? "Active" : "Deactive"}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                   {timeDifferance(campaign.updated_at)}
                  </span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{width: '50%'}}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='switch' className='fs-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='trash' className='fs-3' />
                    </a>
                  </div>
                </td>
              </tr>

           ))}

            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
      <AddCampaign/>
    </div>
  )
}

export {CampaignTable}
