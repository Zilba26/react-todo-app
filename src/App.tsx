import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import ToDoList from './ToDoList/ToDoList'
import TaskView from './TasksView/TaskView'

interface AppProps {
}

const App: FC<AppProps> = (props: AppProps) => {
  return (
    <Box display="flex" minH="inherit" gap="30px" py="20px">
      <Box flex={1}>
        <ToDoList />
      </Box>
      <Box flex={1} display="flex">
        <TaskView /> 
      </Box>
    </Box>
  )
}

export default App