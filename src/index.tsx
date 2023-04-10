import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {getRouteInformation, RouteEnum, routes} from "./routing/Routes";
import {NonIndexRouteObject} from "react-router/dist/lib/context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Match} from "./api/GetMatchesFromApi";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const rootRoute = getRouteInformation(RouteEnum.HOME);

function generateNonIndexRouteObjects() {
    return Object.entries(routes).map((entry) => {
        const [key, value] = entry;

        const loaderThatCanBeUndefined: ((queryClient: QueryClient) => Promise<Array<Match>>) | undefined = value.loader;
        if (loaderThatCanBeUndefined) {
            return {path: key, element: value.view, loader: () => { return loaderThatCanBeUndefined(queryClient)}} as NonIndexRouteObject
        } else {
            return {path: key, element: value.view} as NonIndexRouteObject
        }
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
