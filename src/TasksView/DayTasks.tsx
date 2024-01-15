import { FC, useEffect, useState } from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { deleteEvent as localStorageDeleteEvent, getEventsByDay } from '../LocalStorage'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Event } from '../models/Event';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getPriorityColor } from '../models/Priority';
import CreateEvent from '../CreateEvent/CreateEvent';

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventSelected, setEventSelected] = useState<TaskEvent | null>(null);

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
    return null;
  }

  const setTriggerButtonPosition = (event: React.MouseEvent<HTMLElement>) => {
    const triggerButton = document.getElementsByClassName('trigger-button')[0] as HTMLElement;
    triggerButton.style.top = `${event.clientY}px`;
    triggerButton.style.left = `${event.clientX}px`;
  }

  const deleteEvent = () => {
    localStorageDeleteEvent(eventSelected!.event.id);
    setEventSelected(null);
    onClose();
  }

  const tasks = getEventsByDay(props.day);
  const min = Math.min(...tasks.map((task) => task.startDate.getTime()));
  const max = Math.max(...tasks.map((task) => task.endDate.getTime()));

  const minHour = new Date(min).getHours() < 8 ? new Date(min) : new Date(0,0,0,8);
  const maxHour = new Date(max).getHours() > 19 ? new Date(max) : new Date(0,0,0,19);

  return (
    <Box flex={1} onClick={setTriggerButtonPosition}>
      <Calendar
        localizer={localizer}
        min={minHour}
        max={maxHour}
        step={60}
        timeslots={1}
        defaultDate={props.day}
        date={props.day}
        defaultView="day"
        views={['day']}
        dayLayoutAlgorithm={'no-overlap'}
        onSelectEvent={(event) => {
          setEventSelected(event);
          const button = document.getElementsByClassName('trigger-button')[0] as HTMLElement;
          button.click();
        }}
        events={tasks.map((task) => {
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

      <Popover>
        <PopoverTrigger>
          <Button pos="absolute" className='trigger-button' visibility="hidden" w="1px" h="1px"></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            {eventSelected?.title}
            <Box className='flex-center' gap="12px">
              <CreateEvent state='edit' eventToUpdate={eventSelected?.event}>
                <EditIcon cursor="pointer"></EditIcon>
              </CreateEvent>
              <DeleteIcon cursor="pointer" onClick={onOpen}></DeleteIcon>
            </Box>
          </PopoverHeader>
          <PopoverBody>
            {eventSelected?.event.description}
            <Box display="flex" gap="12px">
              <Box bgColor={eventSelected?.event.category.color} fontSize={12} borderRadius="100%" px="6px" py="2px">
                {eventSelected?.event.category.name}
              </Box>
              <Box bgColor={getPriorityColor(eventSelected?.event.priority)} fontSize={12} borderRadius="100%" px="8px">
                {eventSelected?.event.priority}
              </Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{eventSelected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Êtes-vous sûr de supprimer cet évènement ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' onClick={deleteEvent}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default DayTasks