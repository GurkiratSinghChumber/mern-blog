import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Project from './pages/Project';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Header from './components/Header';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={ <Home></Home>}></Route>
          <Route path='/about' element={ <About></About>}></Route>
          <Route path='/dashboard' element={ <Dashboard></Dashboard>}></Route>
          <Route path='/project' element={ <Project></Project>}></Route>
          <Route path='/sign-in' element={ <SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={ <SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
