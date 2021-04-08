import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Nav from './components/Nav';
import TvShows from './pages/TvShows';
import {MovieProvider} from './components/MovieContext';

function App() {
  return (
    <MovieProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <Nav />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/tv'>
              <TvShows />
            </Route>
            <Route path="/about/:type/:id">
              <About />
            </Route>
          </Switch>
          
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
