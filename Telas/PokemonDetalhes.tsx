import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios';
import Svg, { SvgUri } from 'react-native-svg';
const DetalhesPokemon = ({ route }) => {
    const { pokemon } = route.params;
    const [pokemonInfo, setPokemonInfo] = useState(null);
    useEffect(() => {
        const fetchPokemonInfo = async () => {
            console.log(pokemon.url)
            const response = await axios.get(pokemon.url);
            setPokemonInfo(response.data);
        };
        fetchPokemonInfo();
    }, []);

    if (!pokemonInfo) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`
                }}
                style={{ width: 200, height: 200 }}
            />
            <Text>Name: {pokemonInfo.name}</Text>
            <Text>Height: {pokemonInfo.height}</Text>
            <Text>Weight: {pokemonInfo.weight}</Text>
            <Text>Stats:</Text>
            <FlatList
                data={pokemonInfo.stats}
                keyExtractor={(item) => item.stat.name}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.stat.name}: {item.base_stat}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default DetalhesPokemon;