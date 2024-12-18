import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { styles } from "../../../../styles/Home.styles";

export default function Search() {
  const [text, onChangeText] = useState("");

  return (
    <TextInput
<<<<<<< HEAD
      left={<TextInput.Icon icon="magnify" />}
=======
      left={<TextInput.Icon icon="magnify" color={() => "#253b35"} />}
>>>>>>> main
      mode="outlined"
      value={text}
      onChangeText={onChangeText}
      placeholder="Find a plant"
      placeholderTextColor="grey"
      autoCorrect={false}
      autoCapitalize="none"
<<<<<<< HEAD
      outlineColor="#76B947"
=======
      outlineColor="#fcfefd"
>>>>>>> main
      keyboardAppearance="light"
      style={styles.searchInput}
      theme={{
        colors: {
<<<<<<< HEAD
          primary: "#76B947",
=======
          primary: "#253b35",
>>>>>>> main
        },
        roundness: 30,
      }}
    />
  );
}
