import React from "react";
import { deleteNotification, getCurrentNotifications } from '../LocalStorage';

import './ShowNotif.css';

import { BellIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from '@chakra-ui/react';

interface ShowNotifProps { }

const ShowNotif: React.FC<ShowNotifProps> = () => {
    const nofiticationString: string[][] = getCurrentNotifications();

    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <BellIcon />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    {nofiticationString.map((notification, index) => (
                        <Box key={`notification-${index}`} className="notification-box">

                            <Box className="box-close-icon">
                                <CloseIcon className="close-icon-duplica" />
                            </Box>

                            <p className="notification-text">{notification[1]}</p>

                            <Box className="box-close-icon">
                                <CloseIcon
                                    className="close-icon"
                                    onClick={() => deleteNotification(parseInt(notification[0]))}
                                />
                            </Box>

                        </Box>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default ShowNotif;
