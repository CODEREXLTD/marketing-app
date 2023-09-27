/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import { useDispatch, useSelector } from "react-redux";
import {addCampaign, setCampaign} from '../../../../redux/actions';
import { getAllCampaign } from '../../../../redux/selectors';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddCampaign: FC = () => {
     let navigate = useNavigate();
 const dispatch = useDispatch();
  const campaigns = useSelector(getAllCampaign);
  const [name , setName] = useState('')
   const [isLoad, setLoad] = useState(false);
  const handleOnChange = (value) =>{
    setName(value)
  }
  const handleCreateCampaign = (e) =>{
    setLoad(true)
    var data = JSON.stringify({
      "name": name,
      "description": "hello",
      "status": "draft",
      "isActive": true,
      "scheduled_at": null,
      "user": 1
    });

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/campaigns/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    if(name !== ''){
      axios(config)
        .then(function (response) {
          setLoad(false);
          dispatch( addCampaign(response.data));
          navigate(`/campaign/${response.data.id}`)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setLoad(false)


  }
  return (
    <div className='modal fade' id='kt_modal_add_campaign' aria-hidden="true">
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
            </div>
          <input
            type="text" className='form-control form-control-solid mb-8' value={name} onChange={(e) => handleOnChange(e.target.value)} placeholder='Type Campaign Name'
          />

            <div className='d-flex flex-stack'>
                  <div
                      className='card-toolbar'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      data-bs-trigger='hover'
                      title='Click to add a user'
                    >
                    {/*<button type="button" className="btn btn-sm btn-light-primary" onClick={(e) => {handleCreateCampaign(e)}} >{isLoad ? "Creating..." : "Create Campaign"}</button>*/}

                    <button className='btn btn-sm btn-light-primary' data-bs-toggle='modal' data-bs-target='#kt_modal_add_campaign'  onClick={(e) => {e.preventDefault();handleCreateCampaign(e);}}>   Create Campaign</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {AddCampaign}
