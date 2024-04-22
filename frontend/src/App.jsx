import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home.jsx';
import { LoginSignup } from './Pages/LoginSignup.jsx';
import { Navbar } from './Components/NavBar/NavBar.jsx';
import { Footer } from './Components/Footer/Footer.jsx';
import EventsList from './Components/EventsList/EventsList.jsx';
import Account from './Pages/Account.jsx';
import Event from './Pages/Event.jsx';
import {  UserProvider } from './Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute'; 
import { Admin } from './Pages/Admin.jsx';
import GoogleSuccess from './Pages/GoogleSuccess.jsx';




function App() {

  
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<LoginSignup/>}/>
          <Route path = "/account" element = {<Account/>}/>
          <Route path = "/events" element = {<EventsList/>}/>
          <Route path = "/success" element = {<GoogleSuccess/>}/>
          <Route path = "/event" element = {<Event/>}>
            <Route path = ":eventId" element = {<Event/>}/>
          </Route>
          <Route 
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </UserProvider>
    </div>

  )
}

export default App;
