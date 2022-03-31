import React, { useState, useContext } from 'react';

import Header from './Header';
import SideNav from './SideNav';
import Notification from '../ui/Notification';
import NotificationContext from '../../store/context/notification-context';
import classes from './Layout.module.scss';
import Footer from './Footer';

const Layout: React.FC = (props) => {
	const [ showSidebar, setShowSidebar ] = useState(true);
	const activeNotification = useContext(NotificationContext).notification;

	const toggleSidebarHandler = () => {
		setShowSidebar((prev) => !prev);
	};

	return (
		<div className={`${classes.app} ${!showSidebar ? classes['hide-side'] : ''}`}>
			<Header onToggleSidebar={toggleSidebarHandler} />
			<SideNav onToggleSidebar={toggleSidebarHandler} showSidebar={showSidebar} />
			<div className={`${classes.content}`}>{props.children}</div>
			{activeNotification && <Notification {...activeNotification} />}
			<Footer className={classes.footer} />
		</div>
	);
};

export default Layout;
