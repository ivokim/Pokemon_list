import { Button, View, Text } from 'react-native';
import * as React from 'react';
import { Audio } from 'expo-av';
import { parseJsonSourceFileConfigFileContent } from 'typescript';
function DetailsScreen({ navigation }) {
    const [sound, setSound] = React.useState();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Pokemon')} />
            <Button title="Go back" onPress={Pause} />
            <Button
                title="Go back to first screen in stack"
                onPress={playSound}
            />
        </View>
    );
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../Musica/OP.mp3')
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    async function Pause() {
        const { sound } = await Audio.Sound.createAsync(require('../Musica/OP.mp3')
        );
        await sound.pauseAsync();
    }
}
export default DetailsScreen