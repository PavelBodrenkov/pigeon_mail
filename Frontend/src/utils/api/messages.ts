import {$api} from '../../core/index';

import {AxiosResponse} from "axios";
import {MessageResponse} from "@utils/api/models/response/messageResponse";

export default class MessagesApi {
    static async getMessages(partner:number):Promise<AxiosResponse<MessageResponse>> {
        return $api.get<MessageResponse>('/api/message' + '/' +  partner)
    }

    static async sendMessage(conv_id:number, message:string, partner:number) {
        return $api.post('/api/message', {conv_id, message, partner})
    }

    static async deleteMessage(message_id:number) {
        return $api.put('/api/message', {message_id})
    }
}