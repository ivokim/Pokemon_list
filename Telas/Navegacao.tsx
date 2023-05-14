import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import Pokemons from './Pokemons';
import DetalhesPokemon from './PokemonDetalhes';
const Stack = createNativeStackNavigator();

function Navegacao() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    title: 'BulleST', headerTitleAlign: 'center', headerStyle: {
                        backgroundColor: 'black'
                    }, headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="TesteNome" component={DetailsScreen} />
                <Stack.Screen name="Pokemon" component={Pokemons} />
                <Stack.Screen name="DetalhesPokemon" component={DetalhesPokemon} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navegacao