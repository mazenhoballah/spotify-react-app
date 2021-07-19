import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header.component';
const NotFoundPage = () => {
    return (
        <React.Fragment>
            <Header />
            Page not found. Goto <Link to='/'>Home Page</Link>
        </React.Fragment>
    );
};
export default NotFoundPage;
