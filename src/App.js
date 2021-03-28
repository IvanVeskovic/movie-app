import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/about/:id">
            <About />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
