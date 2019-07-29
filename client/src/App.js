import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';

import MainNavigation from './components/Navigation/MainNavigation';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (

    <BrowserRouter>
      <React.Fragment>

        <Layout>
          <MainNavigation></MainNavigation>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <ApolloProvider client={client}>
                  <main>
                    <Switch>
                      <Redirect from="/" to="/home" exact></Redirect>
                      <Route path="/home" component={HomePage}></Route>
                      <Route path="/auth" component={AuthPage}></Route>
                      <Route path="/bookings" component={BookingsPage}></Route>
                      <Route path="/events" component={EventsPage}></Route>
                    </Switch>
                  </main>

                </ApolloProvider>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>

      </React.Fragment>

    </BrowserRouter>



  );
}

export default App;
