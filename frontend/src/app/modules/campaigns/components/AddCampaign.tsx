/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCampaign } from '../../../../redux/actions';
import { getAllCampaign } from '../../../../redux/selectors';
import { KTIcon } from '../../../../_metronic/helpers';
import { useAuth } from '../../auth';
import { createCampaign } from '../core/_requests';
const AddCampaign: FC = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser, auth} = useAuth();
    const campaigns = useSelector(getAllCampaign);
    const [name , setName] = useState('')
    const [isLoad, setLoad] = useState(false);

    const handleOnChange = (value) =>{
        setName(value)
    }
    /**
     * Handles the creation of a new campaign by sending a POST request to the server.
     * This function sets loading state, prepares the payload, sends the request, and
     * updates the application state accordingly.
     */
    const handleCreateCampaign = async () => {
        setLoad(true)
        const payload = JSON.stringify({
            "name": name,
            "description": "hello",
            "status": "running",
            "isActive": true,
            "scheduled_at": null,
            "user": currentUser?.id
        });

        if (!name) {
            // Handle the case where 'name' is empty (you can add your own validation logic here)
            console.error('Name is required.');
            return;
        }

        // Send the POST request
        const response = await createCampaign(payload, auth?.token);
                
        dispatch( addCampaign(response?.data));
        navigate(`/campaign/${response?.data?.id}`);
        setLoad(false);
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
                        <button className='btn btn-sm btn-light-primary' data-bs-toggle='modal' data-bs-target='#kt_modal_add_campaign'  onClick={(e) => {e.preventDefault();handleCreateCampaign();}}> Create Campaign</button>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AddCampaign };
