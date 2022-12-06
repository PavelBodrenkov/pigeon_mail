module.exports = class UserDto {
    email;
    id;
    isActivation

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivation = model.is_activation
    }
}