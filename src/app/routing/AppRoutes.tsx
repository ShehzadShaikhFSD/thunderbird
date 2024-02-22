/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import Notfound from '../pages/Notfound/Notfound';
import Home from '../pages/Staticpages/Home/Home' ;
import About from '../pages/Staticpages/About/About' ;
import Prescriber from '../modules/Universal/Registration/Prescriber/Prescriber'
import Lists from '../modules/Universal/lists/Lists'
import Login from '../modules/Universal/Login/Login'
import {App} from '../App'
import Navbar from '../modules/Universal/Header/Navbar/Navbar';
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={BASE_URL}>
      <Navbar />
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              {/* <Route path='*' element={<Navigate to='/auth' />} /> */}
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/Prescriber/Register' element={<Prescriber/>} />
              <Route path='/Prescriber/Login' element={<Login/>} />

              <Route path='/Prescriber/lists' element={<Lists/>} />


              <Route path='*' element={<Notfound/>} />
              
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
