import { Box } from '@chakra-ui/react';
import React, { FC } from 'react'

interface CalendarProps {
    selectDate: Date;
}

export const Calendar: FC<CalendarProps> = (props: CalendarProps) => {

    const firstDay = new Date(props.selectDate.getDate() - props.selectDate.getDay() + (props.selectDate.getDay() === 0 ? -6 : 1));
    const lastDay = new Date(props.selectDate.getDate() - props.selectDate.getDay() + 7);

    console.log(firstDay);
    console.log(lastDay);

    return (
        <Box>
            <h1>{props.selectDate.getMonth()}</h1>
            <Box>
                
            </Box>
        </Box>
    )
}