import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react'
import { getEvents } from '../LocalStorage';

interface CalendarProps {
    selectDate: Date;
    setSelectDate: (date: Date) => void;
    iconSize?: string;
}

export const Calendar: FC<CalendarProps> = (props: CalendarProps) => {


    const tasks = getEvents();

    const equalsDay = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() 
        && date1.getMonth() === date2.getMonth() 
        && date1.getFullYear() === date2.getFullYear();
    }

    const getWeekDates = (startingDate: Date): Date[] => {
        const currentDayOfWeek = startingDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      
        const firstDay = new Date(startingDate);
        firstDay.setDate(startingDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));
      
        const weekDates: Date[] = [];
      
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(firstDay);
          currentDate.setDate(firstDay.getDate() + i);
          weekDates.push(currentDate);
        }
      
        return weekDates;
    }

    const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(props.selectDate));

    const iconSize = props.iconSize ?? "50px";

    const formatDay = (date: Date) => {
        switch (date.getDay()) {
            case 0:
                return "Dim"
            case 1:
                return "Lun"
            case 2:
                return "Mar"
            case 3:
                return "Mer"
            case 4:
                return "Jeu"
            case 5:
                return "Ven"
            case 6:
                return "Sam"
            default:
                return ""
        }
    }

    const formatMonth = (date: Date) => {
        switch (date.getMonth()) {
            case 0:
                return "Janvier"
            case 1:
                return "Février"
            case 2:
                return "Mars"
            case 3:
                return "Avril"
            case 4:
                return "Mai"
            case 5:
                return "Juin"
            case 6:
                return "Juillet"
            case 7:
                return "Août"
            case 8:
                return "Septembre"
            case 9:
                return "Octobre"
            case 10:
                return "Novembre"
            case 11:
                return "Décembre"
            default:
                return ""
        }
    }

    const forwardWeek = () => {
        const newDates: Date[] = [];
        weekDates.forEach(date => {
            const newDate = new Date(date);
            newDate.setDate(date.getDate() + 7);
            newDates.push(newDate);
        });
        setWeekDates(newDates);
    }

    const backwardWeek = () => {
        const newDates: Date[] = [];
        weekDates.forEach(date => {
            const newDate = new Date(date);
            newDate.setDate(date.getDate() - 7);
            newDates.push(newDate);
        });
        setWeekDates(newDates);
    }

    return (
        <Box>
            <Text ml="16px" textAlign="left">{formatMonth(weekDates[0]) + " " + weekDates[0].getFullYear()}</Text>
            <Box h="12px"></Box>
            <Box display="flex">
                <Box borderRadius="100%" bgColor="darkblue" w={iconSize} h={iconSize} cursor="pointer"
                    display="flex" alignItems="center" justifyContent="center" onClick={backwardWeek}>
                    <ArrowBackIcon color="white" fontSize="24" />
                </Box>
                <Box w="6px"></Box>
                <Box display="flex" gap="6px">
                    {weekDates.map((date, index) => {
                        return (
                            <Box key={index} className='flex-center' flexDir="column">
                                <Box className='flex-center' flexDir="column"
                                  w={iconSize} h={iconSize} borderRadius="100%" onClick={() => props.setSelectDate(date)} cursor="pointer"
                                  border={date.getTime() == props.selectDate.getTime() ? "3px solid darkblue" : "none"}>
                                    <Text fontSize="12px">{formatDay(date)}</Text>
                                    <Text>{date.getDate()}</Text>
                                </Box>
                                <Box w="8px" h="8px" borderRadius="100%" mt="4px"
                                    bgColor={tasks.filter(task => equalsDay(task.startDate, date)).length > 0 
                                        ? "orange" : "transparent"}>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Box w="6px"></Box>
                <Box borderRadius="100%" bgColor="darkblue" w={iconSize} h={iconSize} cursor="pointer"
                    display="flex" alignItems="center" justifyContent="center" onClick={forwardWeek}>                    
                    <ArrowForwardIcon color="white" fontSize="24" />
                </Box>
            </Box>
        </Box>
    )
}