import React from 'react';
import Login from './components/login-page/login.component';
import RedirectPage from './components/redirect-page/redirect.component';
import NotFoundPage from './components/not-found-page/notFound.component';
import SearchPage from './components/search-page/search.component';
import AlbumsPage from './components/albums-page/albmus-page.component';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className='App'>
          <HashRouter>
            <Switch>
                <Route exact path='/spotify-react-app' component={Login} />
                <Route exact path='/spotify-react-app/redirect' component={RedirectPage} />
                <Route exact path='/spotify-react-app/search' component={SearchPage} />
                <Route exact path='/spotify-react-app/:artistId/albums' component={AlbumsPage} />
                <Route component={NotFoundPage} />
            </Switch>
          </HashRouter>
        </div>
    );
}

export default App;
