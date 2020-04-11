import React from "react";
import Search from "./components/Search";
import Saved from "./components/Saved";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="navigation-bar-link-container">
            <li className="navigation-bar-link">
              <Link to="/">Google Books</Link>
            </li>
            <li className="navigation-bar-link">
              <Link to="/search">Search</Link>
            </li>
            <li className="navigation-bar-link">
              <Link to="/saved">Saved</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/saved">
            <Saved />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
