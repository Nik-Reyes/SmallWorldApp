import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,} from 'react-native';

// const var for image
const PlaceholderImage = require('./images/SmallWorld_Earth.png')
const LeafPlaceholderImage= require('./images/leafO.png')


export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.greenSection}>
          <Text style={styles.headerText}>
            Small W
            <Image source={LeafPlaceholderImage} style={styles.leafimage}/>
            rld</Text>

      </View>

      <View style={styles.blackSection}>
       {/* image for home screen */}
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image}/>
      </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#76b947',
  },

  greenSection:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  headerText:{
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: "center",
    textAlignVertical: "center",
    fontFamily: "sans-serif"
  },

  leafimage:{
    width: 20,
    height: 20,
    resizeMode: "contain",

  },

  blackSection: {
    flex: 1,
    backgroundColor: "black", 
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image:{
    flex: 1,
    alignItems: "center",
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  }
});
