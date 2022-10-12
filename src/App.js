import './App.css';
import About from './About.js';
import Home from './Home.js';
import Contact from './Contact.js';
import{
  BrowserRouter as Router,
  // Routes,
  Route,
  Switch,
  // Link
} from 'react-router-dom';
import ConwoyGame from './Components/Games/ConwoyGame';
import TicTacToe from './Components/Games/TicTacToe';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/about"> <About /> </Route>
        <Route exact path="/contact"> <Contact/> </Route>
        <Route exact path="/ConwoyGame"> <ConwoyGame backPath="/home"/> </Route>
        <Route exact path="/TicTacToe"> <TicTacToe backPath="/home"/></Route>
        <Route path="/"> <Home/> </Route>
      </Switch>
    </Router>
    </>
    
  );
}

export default App;