import { NotificationTypes } from '../consts/notification-types';

export interface NotificationModel {
    type: NotificationTypes | null;
    message: string;
    duration?: number;
}
