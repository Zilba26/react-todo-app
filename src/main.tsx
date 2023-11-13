import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.tsx'
import LocalStorageView from './LocalStorageView/LocalStorageView.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/layout",
    element: <Layout>Children</Layout>
  },
  {
    path: "/api",
    element: <Layout><LocalStorageView></LocalStorageView></Layout>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
