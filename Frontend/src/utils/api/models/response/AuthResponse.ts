import {IUser} from "@utils/api/models/IUser";

export interface AuthResponse {
    accessToken:string;
    refreshToken:string;
    user: IUser
}