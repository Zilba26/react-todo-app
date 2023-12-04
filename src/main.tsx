import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.tsx'
import LocalStorageView from './LocalStorageView/LocalStorageView.tsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/layout",
        element: "Children"
      },
      {
        path: "/api",
        element: <LocalStorageView></LocalStorageView>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />  
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
