import React, { useState, useContext } from 'react';

import SideNav from './sidebar/SideNav';
import Header from './header/Header';
import Footer from './footer/Footer';
import Notification from '../ui/Notification';
import NotificationContext from '../../store/context/notification-context';
import FullScreenNavigation from './full-screen-navigation/FullScreenNavigation';
import classes from './Layout.module.scss';
import useWindowInnerWidth from '../../hooks/useWindowInnerWidth';

const Layout: React.FC = (props) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const activeNotification = useContext(NotificationContext).notification;

    useWindowInnerWidth({
        breakPoint: 1150,
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
            {activeNotification && <Notification {...activeNotification} />}
            <Footer className={classes.footer} />
            <FullScreenNavigation
                onToggleSidebar={toggleSidebarHandler}
                showSidebar={showSidebar}
            />
        </div>
    );
};

export default Layout;
