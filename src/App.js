import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ="/">
          <Navbar />
          <LoginForm />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
