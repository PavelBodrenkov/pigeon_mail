import {AxiosResponse} from "axios";
import {AuthResponse} from "@utils/api/models/response/AuthResponse";
import {$api} from "@core/index";

export default class UsersApi {
    static async getUsers():Promise<AxiosResponse> {
        return $api.get<AuthResponse>('/api/user', )
    }
}