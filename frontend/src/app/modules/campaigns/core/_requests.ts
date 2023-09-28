import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const CAMPAIGN_CREATE_URL = `${API_URL}/campaign/`

export async function createCampaign( payload: any ) {  
    return await axios.post(CAMPAIGN_CREATE_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
}

