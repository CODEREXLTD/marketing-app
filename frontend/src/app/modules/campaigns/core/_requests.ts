import axios from "axios";
import { ID } from "../../../../_metronic/helpers";

const API_URL = process.env.REACT_APP_API_URL

export const CAMPAIGN_URL = `${API_URL}/campaigns/`;

/**
 * Creates a new campaign by sending a POST request to the specified endpoint with the provided payload.
 *
 * @param {any} payload - The data payload containing information about the campaign to be created.
 *
 * @returns {Promise} A Promise that resolves with the response data when the request is successful,
 *                    or rejects with an error if the request fails.
 */
export async function createCampaign( payload: any ): Promise<any> {  
    return await axios.post(CAMPAIGN_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
}

/**
 * Fetches a list of all campaigns by sending a GET request to the specified endpoint.
 *
 * @returns {Promise<any>} A Promise that resolves with the campaign data when the request is successful,
 *                        or rejects with an error if the request fails.
 */
export async function fetchAllCampaigns(): Promise<any> {  
    const response = await axios.get(CAMPAIGN_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response?.data;
}

/**
 * Deletes a campaign by sending a DELETE request to the campaign's endpoint.
 *
 * @param {ID} campaignID - The unique identifier of the campaign to be deleted.
 *
 * @returns {Promise<any>} A Promise that resolves when the campaign is successfully deleted,
 *                        or rejects with an error if the deletion request fails.
 */
export async function deleteCampaign( campaignID: ID ): Promise<any> {  
    return await axios.delete(`${CAMPAIGN_URL}${campaignID}`);
}

/**
 * Saves a campaign sequence by sending a PUT request to update the campaign's details,
 * including its sequence steps.
 *
 * @param {object} getStepSequence - A function that retrieves the campaign's sequence steps.
 * @param {object} campaignData - An object containing the campaign's data, including id, name, description, status, isActive,
 *                                scheduled_at, and user.
 * @param {string} token - The authentication token used for authorization.
 *
 * @returns {Promise<any>} A Promise that resolves when the campaign sequence is successfully saved,
 *                        or rejects with an error if the request fails.
 */
export async function saveCampaignSequence( getStepSequence: object, { id, name, description, status, isActive, scheduled_at, user }: any, token: string | undefined ): Promise<any> {
    const response = await axios.put(`http://127.0.0.1:8000/api/campaigns/${id}/`, {
            sequences: getStepSequence,
            name,
            description,
            status,
            isActive,
            scheduled_at,
            user,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(token)
            },
        });
        
    return response.data;
}

/**
 * Fetches details of a specific campaign by sending a GET request to the campaign's endpoint.
 *
 * @param {any} campaignID - The unique identifier of the campaign to be fetched.
 *
 * @returns {Promise<any>} A Promise that resolves with the campaign details when the request is successful,
 *                        or rejects with an error if the request fails.
 */
export async function fetchCampaign( campaignID: any ): Promise<any> {  
    const response = await axios.get(`${CAMPAIGN_URL}${campaignID}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    return response?.data;
}