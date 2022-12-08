import {$api} from '../../core/index';

import {AxiosResponse} from "axios";
import {MessageResponse} from "@utils/api/models/response/messageResponse";

export default class MessagesApi {
    static async getMessages(partner:number):Promise<AxiosResponse<MessageResponse>> {
        console.log('partner', partner)
        return $api.get<MessageResponse>('/api/message' + '/' +  partner, {data:partner})
    }
}