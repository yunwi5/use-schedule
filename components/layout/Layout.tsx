import React, { useState, useContext } from 'react';

import SideNav from './sidebar/SideNav';
import Header from './header/Header';
import Footer from './footer/Footer';
import Notification from '../ui/Notification';
import NotificationContext from '../../store/context/notification-context';
import FullScreenNavigation from './full-screen-navigation/FullScreenNavigation';
import classes from './Layout.module.scss';
import useWindowInnerWidth from '../../hooks/useWindowInnerWidth';

// 1100px is the point to switch the layout of the navigation
// But set the break point to 1250px, because screen width needs to be at least 1250px to look good with the sidebar.
const NAV_BREAK_POINT = 1250;

const Layout: React.FC = (props) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const activeNotification = useContext(NotificationContext).notification;

    useWindowInnerWidth({
        breakPoint: NAV_BREAK_POINT,
        belowBreakPointCallback: () => setShowSidebar(false),
        aboveBreakPointCallback: () => setShowSidebar(true),
    });

    const toggleSidebarHandler = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className={`${classes.app} ${!showSidebar ? classes['hide-side'] : ''}`}>
            <Header onToggleSidebar={toggleSidebarHandler} />
            <SideNav onToggleSidebar={toggleSidebarHandler} showSidebar={showSidebar} />
            <div className={`${classes.content}`}>{props.children}</div>
            <Footer className={classes.footer} />
            <FullScreenNavigation
                onToggleSidebar={toggleSidebarHandler}
                showSidebar={showSidebar}
            />
            {activeNotification && <Notification {...activeNotification} />}
        </div>
    );
};

export default Layout;
