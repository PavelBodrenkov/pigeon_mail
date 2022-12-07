export interface IUser {
    "id": number,
    "email": string,
    "avatar": null | string,
    "fullname": string,
    "is_admin": number,
    "confirmed": null | number,
    "confirmed_hash": null | string,
    "activation_link": null | number,
    "is_activation": null | number,
    "last_seen": null | string,
}