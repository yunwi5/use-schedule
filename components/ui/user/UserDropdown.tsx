import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faHouseDay, faRightFromBracket } from '@fortawesome/pro-duotone-svg-icons';
import { getLogoutLink, getTodayScheduleLink } from '../../../utilities/link-utils';

const UserDropDown: React.FC = () => {
    return (
        <div className={'absolute top-[120%] !right-0 shadow-md hover:shadow-lg'}>
            <List
                className="rounded-sm"
                sx={{
                    width: '100%',
                    minWidth: 190,
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem button>
                    <Link href={getTodayScheduleLink()}>
                        <a className={'flex items-center'}>
                            <FontAwesomeIcon icon={faHouseDay} className={'mr-1'} />
                            <ListItemText primary="Today Schedules" />
                        </a>
                    </Link>
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <Link href={getLogoutLink()}>
                        <a className="flex items-center">
                            <FontAwesomeIcon icon={faRightFromBracket} className={'mr-2'} />
                            <ListItemText primary="Logout" />
                        </a>
                    </Link>
                </ListItem>
            </List>
        </div>
    );
};

export default UserDropDown;
