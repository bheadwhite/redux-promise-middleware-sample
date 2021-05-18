import React from 'react';
import { connect } from 'react-redux';
import { getPokemon } from './redux';
import { PokeBall } from './pokeball';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.getPokemon();
  }

  render() {
    const allPokemon = this.props.pokemonReducer.pokemon;

    if (this.props.pokemonReducer.error) {
      return <div>there was an error: {this.props.pokemonReducer.error}</div>;
    }

    if (this.props.pokemonReducer.loading) {
      return (
        <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
          <PokeBall />
        </div>
      );
    }
    return (
      <div className='App'>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {allPokemon.length > 0 &&
            allPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '100px',
                }}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect((store) => store, { getPokemon })(App);
