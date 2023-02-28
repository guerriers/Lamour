import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';
import '../src/css/index.css'
import ProtectedRoute from "./component/route/ProtectedRoute";
import Loginpage from './page/login';
import Navbar from './component/navbar';
import Homepage from './page/homepage';

import Service from './page/service';
import Service_detail from './page/service_detail';

import Manageuser from './page/manage_user';
import Datauser from './page/data_user';
import User_adddata from './page/data_adduser'
import User_editdata from './page/data_edituser'

import Manage_room from './page/manage_room';
import Dataroom from './page/data_room';
import Room_adddata from './page/data_addroom';
import Room_editdata from './page/data_editroom';

import service_bill from './page/service_charge';
import service_bill_pay from './page/service_pay';

import report_month from './page/report';


function App() {
const getUsername = localStorage.getItem("username");
const username = JSON.parse(getUsername);



  return (
    <Router>
      <div className="App">
        {username ? <Navbar />:null}
        <Container className="body_contect">
          <Switch>

          <Route path="/login" component={Loginpage} />

          {/* AdminPage */}
          <ProtectedRoute path="/" component={Homepage} isAdmin={true} exact/>
          <ProtectedRoute path="/home" component={Homepage} isAdmin={true} exact/>
          
          <ProtectedRoute path="/manageroom" component={Manage_room}isAdmin={true} exact/>
          <ProtectedRoute path="/manageroom/room_data/:id" component={Dataroom}isAdmin={true} exact/>
          <ProtectedRoute path="/manageroom/room_add/" component={Room_adddata} isAdmin={true}exact/>
          <ProtectedRoute path="/manageroom/room_edit/:id" component={Room_editdata} exact/>

          <ProtectedRoute path="/manageuser" component={Manageuser} isAdmin={true}exact/>
          <ProtectedRoute path="/manageuser/user_data/:id" component={Datauser}isAdmin={true} exact/>
          <ProtectedRoute path="/manageuser/user_add"component={User_adddata}isAdmin={true} />
          <ProtectedRoute path="/manageuser/user_edit/:id" component={User_editdata}isAdmin={true} exact/>

          <ProtectedRoute path="/service" component={Service}isAdmin={true} exact/>
          <ProtectedRoute path="/service/detail/:id" component={Service_detail}isAdmin={true} exact/>
          <ProtectedRoute path="/report" component={report_month}isAdmin={true} />
          {/* <report_month/> */}
          {/* UserPage */}
          <ProtectedRoute path="/service_bill" component={service_bill} isAdmin={false} exact/>
          <ProtectedRoute path="/service_bill/pay/:id" component={service_bill_pay} isAdmin={false} exact/>

          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;