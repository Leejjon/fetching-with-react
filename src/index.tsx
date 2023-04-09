import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {getRouteInformation, RouteEnum, routes} from "./routing/Routes";
import {NonIndexRouteObject} from "react-router/dist/lib/context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const rootRoute = getRouteInformation(RouteEnum.HOME);

function generateNonIndexRouteObjects() {
    return Object.entries(routes).map((entry) => {
        const [key, value] = entry;
        return {path: key, element: value.view, loader: value.loader} as NonIndexRouteObject
    });
}

const router = createBrowserRouter([
  {
    path: rootRoute.key,
    element: <App/>,
    children: [
        {
            index: true,
            element: rootRoute.value.view
        },
        ...generateNonIndexRouteObjects()
    ]
  }
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
