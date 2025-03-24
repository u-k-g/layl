import { View, Text, StyleSheet } from 'react-native';
import { Clock, Compass, Calendar, Settings } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

const NAVBAR_HEIGHT = 70;

export default function App() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View
        style={[
          styles.navbar,
          {
            height: NAVBAR_HEIGHT + insets.top,
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Clock color="#fff" size={24} />
          <Compass color="#fff" size={24} />
          <Calendar color="#fff" size={24} />
          <Settings color="#fff" size={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  navbar: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: 10,
  },
  timeContainer: {
    position: 'absolute',
    bottom: 10,
  },
  time: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});