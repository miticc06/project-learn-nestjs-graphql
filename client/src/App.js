import React from 'react';
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import MainNavigation from './components/MainNavigation';



function App() {
  return (

    <BrowserRouter>
      <React.Fragment>

        <MainNavigation></MainNavigation>

        <main>
          <Switch>
            {/* <Route path="/" component={HomePage}></Route> */}
            <Redirect from="/" to="/home" exact></Redirect>
            <Route path="/home" component={HomePage}></Route>
            <Route path="/auth" component={AuthPage}></Route>
            <Route path="/bookings" component={null}></Route>
            <Route path="/events" component={null}></Route>
          </Switch>
        </main>

      </React.Fragment>

    </BrowserRouter>


  );
}

export default App;
