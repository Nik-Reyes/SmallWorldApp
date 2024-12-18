import { Text, SafeAreaView, StyleSheet } from 'react-native';
import Main from '../components/Main';
import { LinearGradient } from 'expo-linear-gradient';
import PlantBanner from '../components/home/PlantBanner/PlantBanner';

export default function Explore() {
  return (
    <LinearGradient
      colors={['#E8F5E9', '#ebf7f4', '#d2ede5']}
      start={{ x: 0.5, y: 0.4 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 0.8]}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <PlantBanner />
        <Text style={styles.paragraph}>Explore</Text>
        <Main />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  paragraph: {
    marginTop: 24,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
