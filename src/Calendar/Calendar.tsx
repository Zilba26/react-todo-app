import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react'

interface CalendarProps {
    selectDate: Date;
}

export const Calendar: FC<CalendarProps> = (props: CalendarProps) => {

    const [selectDate, setSelectDate] = useState<Date>(props.selectDate);

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

    const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(selectDate));

    const iconSize = "40px"

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
            <Text textAlign="left">{formatMonth(weekDates[0]) + " " + weekDates[0].getFullYear()}</Text>
            <Box h="12px"></Box>
            <Box display="flex">
                <Box borderRadius="100%" bgColor="darkblue" w={iconSize} h={iconSize} cursor="pointer"
                    display="flex" alignItems="center" justifyContent="center" onClick={backwardWeek}>
                    <ArrowBackIcon />
                </Box>
                <Box w="6px"></Box>
                <Box display="flex" gap="6px">
                    {weekDates.map((date, index) => {
                        return (
                            <Box key={index} display="flex" flexDir="column" alignItems="center" justifyContent="center">
                                <Box w={iconSize} h={iconSize} borderRadius="100%" onClick={() => setSelectDate(date)} cursor="pointer"
                                color={date.getTime() == selectDate.getTime() ? "darkblue" : "white"} 
                                borderColor={date.getTime() == selectDate.getTime() ? "white" : "darkblue"}
                                border={date.getTime() == selectDate.getTime() ? "2px solid" : "none"}
                                >
                                <Text fontSize="12px">{formatDay(date)}</Text>
                                <Text>{date.getDate()}</Text>
                                </Box>
                                {date.getDay() % 3 === 0
                                    ? <Box w="8px" h="8px" bgColor="orange" borderRadius="100%" mt="4px"></Box>
                                    : <Box w="8px" h="8px" bgColor="transparent" borderRadius="100%" mt="4px"></Box>
                                }
                            </Box>
                        )
                    })}
                </Box>
                <Box w="6px"></Box>
                <Box borderRadius="100%" bgColor="darkblue" w={iconSize} h={iconSize} cursor="pointer"
                    display="flex" alignItems="center" justifyContent="center" onClick={forwardWeek}>                    
                    <ArrowForwardIcon />
                </Box>
            </Box>
        </Box>
    )
}