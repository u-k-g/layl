import { View, Text } from 'react-native';

export default function HomePage() { // Renamed component to HomePage
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Home Page Content</Text>
        </View>
    );
}