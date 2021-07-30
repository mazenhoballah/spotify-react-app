import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { get } from '../../utils/api';
import './albums-page.styles.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        width: 270,
        marginTop: '40px',
        marginLeft: '15px',
        marginRight: '15px',
        display:'flex',
        flexDirection:'column'
    },
    media: {
        height: 240,
        width: 300,
    },
});
const AlbumsPage = () => {
    const classes = useStyles();
    const { artistId } = useParams();
    const [albums, setAlbums] = useState({});

    const searchForAlbums = async () => {
        setAlbums({});
        try {
            const API_URL = `https://api.spotify.com/v1/artists/${artistId}/albums`;
            const result = await get(API_URL);
            console.log('albums => ', result.items);
            // console.log('album name=>', albums.items[0].name);
            setAlbums(result);
        } catch (error) {
            console.log('ERROR=>', error);
        }
    };
    useEffect(() => {
        searchForAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {albums.items ? (
                <div className='title-container'>
                    <Container maxWidth='lg'>
                        <div className='title'>
                            <h1>{albums.items[0].artists[0].name}</h1>
                            <h3>Albums</h3>
                        </div>
                    </Container>
                    <Container maxWidth='lg'>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            {albums.items.map((item, i) => (
                                <Card className={classes.root} key={i}>
                                    <CardActionArea className='card-body'>
                                        <CardMedia
                                            className={classes.media}
                                            image={item.images[0].url}
                                            // title={item.name}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant='h5'
                                                component='h2'
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='p'
                                            >
                                                {item.release_date}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='p'
                                            >
                                                {item.total_tracks} Tracks
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className='actions'>
                                        <Button
                                            size='small'
                                            color='primary'
                                            href={item.external_urls.spotify}
                                            className='link'
                                        >
                                            Preview on Spotify
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </div>
                    </Container>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default AlbumsPage;
