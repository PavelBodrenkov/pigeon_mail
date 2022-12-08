import {NotificationPlacement} from "antd/es/notification/interface";

export const openNotification = (placement: NotificationPlacement, api) => {
    api.info({
        message: `Возникла ошибка при регистрации`,
        description: "Попробуйте позднее или обратитесь в поддержку",
        placement,
    });
};