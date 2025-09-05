import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WatchList from './Pages/WatchList'
import MovieDetails from './Pages/MovieDetails'
import Home from './Pages/Home'
import { MovieProvider } from './Context/Context'
import Search from './Pages/Search'
import TVShows from './Pages/TVShows';
import TVShowsDetails from './Pages/TVShowsDetails'
import NotFound from './Pages/NotFound'
import Layout from './Layout/Layout'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
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
