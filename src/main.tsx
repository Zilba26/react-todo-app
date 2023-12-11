import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.tsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import ToDoList from "./ToDoList/ToDoList.tsx";
import TaskView from './TasksView/TaskView.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/layout",
        element: <TaskView></TaskView>,
      },
      {
        path: "/todolist",
        element: <ToDoList></ToDoList>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />  
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
