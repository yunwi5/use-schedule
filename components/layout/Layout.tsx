import React, { useState, useContext } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/context/notification-context";

const Layout: React.FC = (props) => {
	const [ showSidebar, setShowSidebar ] = useState(true);
	const activeNotification = useContext(NotificationContext).notification;

	return (
		<div className="app">
			<Header onToggleSidebar={() => setShowSidebar((prev) => !prev)} />
			<div>
				<SideNav
					onToggleSidebar={() => setShowSidebar((prev) => !prev)}
					showSidebar={showSidebar}
				/>
				{props.children}
			</div>
			{activeNotification && <Notification {...activeNotification} />}
		</div>
	);
};

export default Layout;
