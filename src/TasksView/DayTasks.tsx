import { FC, useEffect } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { getEventsByDay } from '../LocalStorage'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Event } from '../models/Event';

const userLocale = window.navigator.language || 'en-US';
moment.locale(userLocale);
const localizer = momentLocalizer(moment);

class TaskEvent {

  title: string;
  start: Date;
  end: Date;
  event: Event;

  
  constructor(event: Event) {
    this.title = event.name;
    this.start = event.startDate;
    this.end = event.endDate;
    this.event = event;
  }
}

interface DayTasksProps {
  day: Date
}

const DayTasks: FC<DayTasksProps> = (props: DayTasksProps) => {

  const backgroundColor = useColorModeValue("#eaf6ff", "var(--chakra-colors-chakra-body-bg)");

  useEffect(() => {
    const calendarHeader = document.querySelector('.rbc-time-header-content .rbc-allday-cell .rbc-row-bg > div') as HTMLElement;
    if (calendarHeader) {
      const dayString = props.day.toLocaleDateString(
        userLocale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      calendarHeader.innerHTML = dayString.charAt(0).toUpperCase() + dayString.slice(1);
      calendarHeader.style.textAlign = 'center';
      calendarHeader.style.paddingTop = '0.5rem';
    }
  },[props.day])

  if (!props.day) {
    return null
  }

  const tasks = getEventsByDay(props.day);
  const min = Math.min(...tasks.map((task) => task.startDate.getTime()));
  const max = Math.max(...tasks.map((task) => task.endDate.getTime()));

  const minHour = new Date(min).getHours() < 8 ? new Date(min) : new Date(0,0,0,8);
  const maxHour = new Date(max).getHours() > 19 ? new Date(max) : new Date(0,0,0,19);

  return (
    <Box flex={1}>
      <Calendar
        localizer={localizer}
        min={minHour}
        max={maxHour}
        defaultDate={props.day}
        defaultView="day"
        views={['day']}
        events={tasks.map((task) => {
          console.log(task);
          return new TaskEvent(task);
        })}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.event.category.color,
            }
          }
        }}
        toolbar={false}
        formats={{
          timeGutterFormat: 'HH:mm', // Format de l'heure dans la colonne de l'heure
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer?.format(start, 'HH:mm', culture) +
            ' - ' +
            localizer?.format(end, 'HH:mm', culture), // Format de l'heure de début et de fin des événements
        }}
        dayPropGetter={() => {
          return {
            style: {
              backgroundColor: backgroundColor,
            }
          }
        }}
      />
    </Box>
  )
}

export default DayTasks