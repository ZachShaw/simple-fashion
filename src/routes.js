import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HomeView from './views/home.js';
import Header from './components/header';

function Routes() {
    return (
        <div>
            <Header />
            <Router>
                <div className="container">
                    <Route exact path="/" component={HomeView} />
                </div>
            </Router>
        </div>
    );
}

export default Routes;