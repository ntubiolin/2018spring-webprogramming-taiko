import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
const Root = ()=>(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/list" render={ props => <List {...props}/>} />
    </Switch>
    
  </Router>
)
class List extends Component{
  
  render() {
    console.log(">>> List props = ");
    console.log(this.props.location.state.userInfo);
    return (
      <div>
        <h1>
          I am list
        </h1>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
