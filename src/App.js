import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Nav from './components/Nav';
import TvShows from './pages/TvShows';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/tvshows'>
            <TvShows />
          </Route>
          <Route path="/about/:type/:id" component={About} />
            {/* <About />
          </Route> */}
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
