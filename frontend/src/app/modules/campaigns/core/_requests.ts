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

export async function deleteCampaign( campaignID: ID ): Promise<any> {  
    return await axios.delete(`${CAMPAIGN_URL}${campaignID}`);
}