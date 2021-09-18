import React from 'react';
import Login from './components/login-page/login.component';
import RedirectPage from './components/redirect-page/redirect.component';
import NotFoundPage from './components/not-found-page/notFound.component';
import SearchPage from './components/search-page/search.component';
import AlbumsPage from './components/albums-page/albmus-page.component';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className='App'>
            <Switch>
                <Route exact path='https://mazenhoballah.github.io/spotify-react-app/' component={Login} />
                <Route exact path='https://mazenhoballah.github.io/spotify-react-app/redirect' component={RedirectPage} />
                <Route exact path='https://mazenhoballah.github.io/spotify-react-app/search' component={SearchPage} />
                <Route exact path={'https://mazenhoballah.github.io/spotify-react-app/:artistId/albums'} component={AlbumsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default App;
