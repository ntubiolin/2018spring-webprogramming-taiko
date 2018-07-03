import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import SongSelection from './SongSelection';

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
      <Route path="/menu" render={ props => <SongSelection {...props}/>} />
      <Route path="/game" render={ props => <Game {...props}/>} />      
    </Switch>
    
  </Router>
)

class Game extends Component{
  
  render() {
    console.log(">>> Game props = ");
    console.log(this.props.location.package);
    return (
      <div>
        <h1>
          I am game
        </h1>
        {JSON.stringify(this.props.location.package)}
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
