import React, { useState } from 'react';
import{ BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import { MDBFooter } from 'mdb-react-ui-kit';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from "./components/navbar/NavBar"
import AnalyticsPage from './views/analytics/AnalyticsPage'
import UploadPage from './views/upload/UploadPage'
import ManagerPage from './views/manager/ManagerPage'
import AboutPage from './views/about/AboutPage'
import Login from './components/login/Login'
import ResultsPage from './views/results/ResultsPage';

function App() {

  const [show, setShow] = useState(true);

  var roleUser = ""
  try {
    roleUser = JSON.parse(sessionStorage.getItem('myUserEntity'))["roleUser"]
  } catch(err) {
    roleUser = ""
  }

  if (window.location.href.split("/")[3] === "")  {
      window.location.href += "analytics"
      return
  }

  return (
    <div className="App">
      { sessionStorage.getItem('myUserEntity') === null ?
        <Login  
            show={show}
            onHide={setShow}
        /> : <div> </div>
      }

      <Router>
        <NavigationBar />
        { roleUser === 'admin' ?
          <div>
            <Routes>
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/results" element={<ResultsPage />}></Route>
              <Route path="/" element={<AnalyticsPage />} />
            </Routes>
          </div> : <div>
            <Routes>
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/results" element={<ResultsPage />}></Route>
              <Route path="/" element={<AnalyticsPage />} />
            </Routes>
          </div>
        }
      </Router>
      <div className="footer">
        <MDBFooter bgColor='dark' className='text-center text-lg-left'>
          <div className='text-center p-3' style={{ backgroundColor: '#002ABF' }}>
            <div className='text-light'>
              &copy; МИЭМ Аналитическая платформа {new Date().getFullYear()} {' '}
            </div>
          </div>
        </MDBFooter>
      </div>
    </div>
  );
}

export default App;
