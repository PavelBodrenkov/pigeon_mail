import {$api} from '../../core/index';
import {AxiosResponse} from "axios";
import {AuthResponse} from "@utils/api/models/response/AuthResponse";

export default class DialogsApi {
    static async getDialogs():Promise<AxiosResponse> {
        return $api.get<AuthResponse>('/api/dialog')
    }
}