import { Injectable } from "@nestjs/common";
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class QnaService {
    constructor() { }

    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    async qna(body) {
        try {
            const apiUrl = process.env.QNA_PREDICT_URL+'/chat';
            console.log(apiUrl)
            console.log(body)
            const response = await axios.post(apiUrl, body, { httpsAgent: this.httpsAgent });
            console.log(response.data)
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    
}