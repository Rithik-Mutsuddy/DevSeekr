import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function StatusBar() {
  const [time, setTime] = useState(() => getCurrentTime());

  function getCurrentTime() {
    return new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
