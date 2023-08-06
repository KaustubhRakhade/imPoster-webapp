import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Snackbar from './components/Snackbar';
import { useState } from 'react';
import NotFound from './components/NotFound';
import useAuthContext from './hooks/useAuthContext';

function App() {

  const [popups, setPopups] = useState([])

  const { user } = useAuthContext()

  const showPopup = (text, icon, color) => {
    //adds new popup to the list
    setPopups((old) => [
      {
        "text": text,
        "icon": icon,
        "color": color,
        "time": Date.now()
      },
      ...(old.filter((p) => Date.now() - p.time < 5000))] //remove 5sec old popups
    )
  }

  return (
    <>
      <Navbar/>

      <div id="pageContent">
          <Routes>

            <Route exact path="/home"
              element={
                user
                ? <Dashboard showPopup={showPopup}/>
                : <Navigate to="/signin"/>
                }
              />
            <Route exact path="/" element={ <Navigate to="/home" /> }/>

            <Route
              exact path="/signin"
              element={
                user
                ? <Navigate to="/home" />
                : <SignIn showPopup={showPopup} />
              }/>

            <Route
              exact path="/signup"
              element={
                user
                ? <Navigate to="/home" />
                : <SignUp showPopup={showPopup} />
              }/>
            <Route exact path="*" element={ <NotFound/> }/>
            
          </Routes>
      </div>

      <span id="footer">Made for Kshitij, IIT-KGP by Kaustubh R</span>

      {popups.map((p) => {
        return (<Snackbar popup={p} key={p.time}/>)
      })}

    </>

  );
}

export default App;
