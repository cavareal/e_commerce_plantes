import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './pages/Error';
import Preferences from "./pages/Preferences";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PreferenceProvider} from "./context/PreferenceProvider";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Favoris from "./pages/Favoris";
import About from "./pages/About";
import History from "./pages/History";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <PreferenceProvider>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/detail/:idArticle" component={Detail} />
                  <Route path={"/payment"} component={Payment}/>
                  <Route path={"/preferences"} component={Preferences}/>
                  <Route path={"/confirmation"} component={Confirmation}/>
                  <Route path={"/about"} component={About}/>
                  <Route path={"/favoris"} component={Favoris}/>
                    <Route path={"/history"} component={History}/>
                  <Route path={"*"} component={Error}/>
              </Switch>
          </PreferenceProvider>
      </Router>
  </React.StrictMode>
);

