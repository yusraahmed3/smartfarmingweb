import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Request from './components/Request';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ="/">
          <Navbar />
          <LoginForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/adminDash">
            <Admin/>
          </Route>
          <Route path="/request">
            <Request/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
