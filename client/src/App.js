import React from 'react';
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';




function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage}></Route>
        <Route path="/auth" component={AuthPage}></Route>
        <Route path="/bookings" component={null}></Route>
        <Route path="/events" component={null}></Route>
      </Switch>
    </BrowserRouter>


  );
}

export default App;
