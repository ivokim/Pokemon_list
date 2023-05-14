import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, NativeModules, TouchableOpacity } from 'react-native';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
const Pokemons = ({ route, navigation }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [sound, setSound] = React.useState();
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../Musica/Pokemon.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }


    useEffect(() => {
        playSound();
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(response => {
                setPokemonList(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => goToMovesScreen(item)}>
            <Image
                style={styles.image}
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
            />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );
    const goToMovesScreen = (pokemon) => {
        console.log(`${pokemon.name}cxz`)
        navigation.navigate('DetalhesPokemon', { pokemon });
    };


    return (
        <FlatList
            data={pokemonList}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            numColumns={3}
            contentContainerStyle={styles.container}
        />
    );

};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 8,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
    },
    image: {
        width: 96,
        height: 96,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
});

export default Pokemons;