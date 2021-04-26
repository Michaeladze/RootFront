import React from 'react';
import { IFeedback, IUser } from '../../../../types/projects.types';
import './FeedbackPopup.scss';
export interface IFeedbackPopupProps {
    user: IUser;
    sendFeedback: (data: IFeedback) => void;
    onClose?: () => void;
    serviceManagerUrl?: string;
}
declare const FeedbackPopup: React.FC<IFeedbackPopupProps>;
export default FeedbackPopup;
