import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { styles } from "../../../../styles/Home.styles";

export default function Search() {
  const [text, onChangeText] = useState("");

  return (
    <TextInput
      left={<TextInput.Icon icon="magnify" color={() => "#253b35"} />}
      mode="outlined"
      value={text}
      onChangeText={onChangeText}
      placeholder="Find a plant"
      placeholderTextColor="grey"
      autoCorrect={false}
      autoCapitalize="none"
      outlineColor="#fcfefd"
      keyboardAppearance="light"
      style={styles.searchInput}
      theme={{
        colors: {
          primary: "#253b35",
        },
        roundness: 30,
      }}
    />
  );
}
