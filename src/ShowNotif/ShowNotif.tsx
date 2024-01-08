import React from "react";
import { deleteNotification, getCurrentNotifications } from '../LocalStorage';

import './ShowNotif.css';

import { BellIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Box,
} from '@chakra-ui/react'

interface ShowNotifProps { }

const ShowNotif: React.FC<ShowNotifProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const placement = "top";

    const nofiticationString: string[][] = getCurrentNotifications();

    return (
        <>
            <BellIcon onClick={onOpen}></BellIcon>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent style={{ padding: '5px' }}>
                    <DrawerBody>
                        {nofiticationString.map((notification, index) => (
                            <Box className="notification-box" id={`notification-${index}`}>

                                <Box className="box-close-icon">
                                    <CloseIcon
                                        className="close-icon-duplica"
                                    />
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ShowNotif;
