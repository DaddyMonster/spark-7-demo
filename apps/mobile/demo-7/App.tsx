import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
export default function App() {
  return (
    <View style={styles.container}>
      <Text testID="heading" style={styles.texter}>
        Welcome! Open up App.tsx to start working on your app!
      </Text>
      <TouchableOpacity>
        <StyledText>STYLED TEXT!</StyledText>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const StyledText = styled(Text)({
  color: 'blue',
  fontSize: 30,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texter: {
    fontSize: 15,
    color: 'red',
    padding: 30,
  },
});
