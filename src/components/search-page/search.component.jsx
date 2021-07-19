import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { get } from '../../utils/api';
import './search-page.styles.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: 270,
        marginTop: '40px',
        marginLeft: '15px',
        marginRight: '15px',
        height: 400,
    },
    media: {
        height: 240,
        width: 300,
    },
});
const SearchPage = (props) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    };

    const searchForItems = async () => {
        setItems({});
        try {
            const term = encodeURIComponent(searchTerm);
            const API_URL = `https://api.spotify.com/v1/search?q=${term.toLocaleUpperCase()}&type=artist`;
            const result = await get(API_URL);
            setItems(result);
            console.log('results => ', result);
            console.log(result.artists.items[0].popularity);
        } catch (error) {}
    };

    useEffect(() => {
        console.log(
            'TOKEN => ',
            localStorage.getItem('params').split(',')[0].split(':')[1]
        );
    }, []);

    useEffect(() => {
        console.log('items=>', items);
    }, [items]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            setErrorMsg('');
            searchForItems();
            console.log(searchTerm);
        } else {
            setErrorMsg('Please enter a search term.');
        }
        return () => {
            setSearchTerm(''); //clean the state in the unmount of the component
        };
    }, [searchTerm]);

    return (
        <Container maxWidth='lg'>
            <div className='search-container'>
                <div>
                    <TextField
                        id='outlined-search'
                        label='Search for an artist'
                        type='search'
                        variant='outlined'
                        className='search-field'
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    margin:'0 auto'
                }}
            >
                {items.artists ? (
                    items.artists.items.map((artist, i) => (
                        <div key={i}>
                            <Link
                                to={{
                                    pathname: `/${artist.id}/albums`,
                                    artistName: artist.name,
                                }}
                                className='link'
                            >
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        {artist.images[0] ? (
                                            <CardMedia
                                                className={classes.media}
                                                image={artist.images[2].url}
                                                title={artist.name}
                                            />
                                        ) : (
                                            <CardMedia
                                                className={classes.media}
                                                // image={artist.images[2].url}
                                                title={artist.name}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant='h5'
                                                component='h2'
                                            >
                                                {artist.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='p'
                                            >
                                                {artist.followers.total}
                                            </Typography>
                                            <Rating
                                                name='read-only'
                                                value={artist.popularity / 20}
                                                readOnly
                                                style={{
                                                    paddingTop: '10px',
                                                }}
                                            />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </Container>
    );
};
export default SearchPage;
