import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SpotifyIcon from '../../images/spotify.svg';
import SpotifyBlackIcon from '../../images/spotifyBlack.svg';
import './login.styles.scss';

const Login = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const {
        REACT_APP_CLIENT_ID,
        REACT_APP_AUTHORIZE_URL,
        REACT_APP_REDIRECT_URL,
    } = process.env;

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    };

    const toggleHover = () => {
        setIsHovered(!isHovered);
    };
    return (
        <div className='login'>
            <Button
                variant='contained'
                color='primary'
                className='btn-color'
                onClick={handleLogin}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            >
                Login using Spotify
                {!isHovered ? (
                    <img src={SpotifyIcon} alt='' className='icon' />
                ) : (
                    <img src={SpotifyBlackIcon} alt='' className='icon' />
                )}
            </Button>
        </div>
    );
};

export default Login;
