import React from 'react';
import pokeball from './pokeball-pokemon-svgrepo-com.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  '@keyframes spinningPokeball': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(180deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  pokeball: {
    animation: '$spinningPokeball 1000ms infinite linear',
  },
});

export const PokeBall = () => {
  const classes = useStyles();
  return (
    <img
      className={classes.pokeball}
      src={pokeball}
      alt='pokeball'
      height={200}
    />
  );
};
