import {$api} from '../../core/index';
import {AxiosResponse} from "axios";
import {AuthResponse} from "@utils/api/models/response/AuthResponse";

// const dialogs = {
//     getAll: () => $api.get("/dialogs")
// }
// export default dialogs

export default class DialogsApi {
    static async getDialogs():Promise<AxiosResponse> {
        return $api.get<AuthResponse>('/api/dialog')
    }
}