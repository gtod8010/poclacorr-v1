import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LoginForm from './pages/Loginform';
import UserManagemnet from './pages/UserManagemnet';
import Home from './pages/Home';
import {CreateSnap} from './pages/contentmanagement'
import {BatchManagement,BatchStatus,OperateBatchProgram} from './pages/batchmanagement'
import Raw from './components/RawTable'
import Capture from './components/CapturePTable'
import Snap from './components/SnapTable'
import ContentsCaptures from './pages/contentscaptures'
import ContentManagement from './pages/contentmanagement'


class App extends React.Component {
  render(){
    return (
      <Router>
      <Sidebar />
      <Switch>
        <Route path="/" exact component = {LoginForm} />
        <Route path="/home" exact component = {Home} />
        <Route path="/usermanagement" exact component = {UserManagemnet} />
        <Route path="/contentmanagement" exact component = {ContentManagement} />
        <Route path="/contentmanagement/raw" exact component = {Raw} />
        <Route path="/contentmanagement/createsnap" exact component = {CreateSnap} />
        <Route path="/contentmanagement/capturep" exact component = {Capture} />
        <Route path="/contentmanagement/snap" exact component = {Snap} />
        <Route path="/contentmanagement/capturep/detail" exact component = {ContentsCaptures} />
        <Route path="/batchmanagement/" exact component = {BatchManagement} />
        <Route path="/batchmanagement/batchstatus" exact component = {BatchStatus} />
        <Route path="/batchmanagement/operatebatchprogram" exact component = {OperateBatchProgram} />
      </Switch>
      </Router>
    );
  }
}

export default App;
