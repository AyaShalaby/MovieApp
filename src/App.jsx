import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import WatchList from './Components/WatchList'
import MovieDetails from './Components/MovieDetails'
import Home from './Components/Home'
import { MovieProvider } from './Components/Context'
import Search from './Components/Search'
import TVShows from './Components/TVShows';
import TVShowsDetails from './Components/TVShowsDetails'
import NotFound from './Components/NotFound'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/watchList',
          element: <WatchList />,
        },
        {
          path: "/details/:id",
          element: <MovieDetails />,
        },
        {
          path: "/search",
          element: <Search />,
        },
         {
        path: '/tvshows', 
        element: <TVShows />,
      },
           {
        path: '/tv-details/:id', 
        element: <TVShowsDetails  />,
      },
         {
        path: '*', 
        element: <NotFound />,
      },
        
      ],
    },
  ]);

  return (
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  )
}

export default App
