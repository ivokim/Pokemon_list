import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, NativeModules, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
const Pokemons = ({ route, navigation }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [sound, setSound] = React.useState();
    const [numColumns, setNumColumns] = useState(2);
    const [inputValue, setInputValue] = useState('2'); // Input value for number of columns

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../Musica/Pokemon.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }
    useEffect(() => {
        console.log('come')
        axios
            .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(response => {
                setPokemonList(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
        //playSound()
    }, []);

    const handleColumnChange = (columns) => {
        setNumColumns(columns);
    };
    const renderGridItem = (item) =>
    (
        <TouchableOpacity style={styles.item} key={item.name} onPress={() => navigation.navigate('DetalhesPokemon', { pokemon: item })}>
            <Image
                style={styles.image}
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
            />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );
    const renderGrid = () => {
        const itemsPerRow = 5; // Specify the desired number of items per row
        const totalItems = pokemonList.length;
        const rows = Math.ceil(totalItems / itemsPerRow);
        const grid = [];

        let itemIndex = 0;

        for (let i = 0; i < rows; i++) {
            const rowItems = pokemonList.slice(itemIndex, itemIndex + itemsPerRow);
            const row = (
                <View key={i} style={styles.row}>
                    {rowItems.map((item) => (
                        <View key={item.name} style={styles.column}>
                            {renderGridItem(item)}
                        </View>
                    ))}
                </View>
            );
            grid.push(row);

            itemIndex += itemsPerRow;
        }

        return grid;
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.gridContainer}>
                {renderGrid()}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleColumnChange(2)}>
                    <Text style={styles.buttonText}>2 Columns</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleColumnChange(3)}>
                    <Text style={styles.buttonText}>3 Columns</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleColumnChange(4)}>
                    <Text style={styles.buttonText}>4 Columns</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        //n;ao deletar
        flexWrap: 'wrap',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    column: {
        margin: 3,
    },
    item: {
        flex: 1,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,

    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 1,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'gray',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Pokemons;