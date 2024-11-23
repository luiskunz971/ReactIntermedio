import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { urlImg } from '../utils/constants';

const PokemonCard = ({ handleClick, pokemon }) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={() => handleClick(pokemon)}>
                <CardMedia
                    component="img"
                    image={`${urlImg}${pokemon.url.split('/')[6]}.png`}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        {pokemon.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PokemonCard