import { useContext } from "react";

import NotificationContext from "../../store/context/notification-context";
import classes from "./Notification.module.scss";

interface Props {
	title: string;
	message: string;
	status: string;
}

export enum NotifStatus {
	SUCCESS = "success",
	PENDING = "pending",
	ERROR = "error"
}

const Notification: React.FC<Props> = (props) => {
	const notificationCtx = useContext(NotificationContext);

	const { title, message, status } = props;

	const hideHandler = () => {
		// Allow notification to hide by click, after pending state
		if (status === NotifStatus.PENDING) return;
		notificationCtx.hideNotification();
	};

	let statusClasses = "";

	if (status === NotifStatus.SUCCESS) {
		statusClasses = classes.success;
	}
	if (status === NotifStatus.PENDING) {
		statusClasses = classes.pending;
	}
	if (status === NotifStatus.ERROR) {
		statusClasses = classes.error;
	}

	return (
		<div className={`${classes.notification} ${statusClasses}`} onClick={hideHandler}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
