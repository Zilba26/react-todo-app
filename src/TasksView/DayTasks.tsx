import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { getTasksByDay } from '../LocalStorage'

interface DayTasksProps {
  day: Date
}

const DayTasks: FC<DayTasksProps> = (props: DayTasksProps) => {


  if (!props.day) {
    return null
  }

  const tasks = getTasksByDay(props.day).sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <Box>
      {tasks.map((task) => (
        <Box key={task.id} bg="gray.100" p={2} mt={2} borderRadius="md">
          {task.name}
        </Box>
      ))}
    </Box>
  )
}

export default DayTasks