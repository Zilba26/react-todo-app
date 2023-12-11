import { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Calendar } from './Calendar'
import DayTasks from './DayTasks'

interface TaskViewProps {
}

const TaskView: FC<TaskViewProps> = (props: TaskViewProps) => {

  const [selectDate, setSelectDate] = useState<Date>(new Date());

  return (
    <Box display="flex" flexDir="column" w="100%">
      <Calendar selectDate={selectDate} setSelectDate={setSelectDate}></Calendar>
      <DayTasks day={selectDate}></DayTasks>
    </Box>
  )
}

export default TaskView