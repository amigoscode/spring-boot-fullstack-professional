import {notification} from "antd";

const openNotificationWithIcon = (type, message, description, placement) => {
    placement = placement || "topRight"
    notification[type]({message, description, placement});
}

export const successNotification = (message, description, placement) =>
    openNotificationWithIcon('success', message, description, placement);

export const errorNotification = (message, description, placement) =>
    openNotificationWithIcon('error', message, description, placement);

export const infoNotification = (message, description, placement) =>
    openNotificationWithIcon('info', message, description, placement);

export const warningNotification = (message, description, placement) =>
    openNotificationWithIcon('warning', message, description, placement);