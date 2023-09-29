import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const CAMPAIGN_CREATE_URL = `${API_URL}/campaigns/`
export const CAMPAIGNS_FETCH_URL = `${API_URL}/campaigns/`

/**
 * Creates a new campaign by sending a POST request to the specified endpoint with the provided payload.
 *
 * @param {any} payload - The data payload containing information about the campaign to be created.
 *
 * @returns {Promise} A Promise that resolves with the response data when the request is successful,
 *                    or rejects with an error if the request fails.
 */
export async function createCampaign( payload: any ): Promise<any> {  
    return await axios.post(CAMPAIGN_CREATE_URL, payload, {
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
    const response = await axios.get(CAMPAIGNS_FETCH_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response?.data;
}