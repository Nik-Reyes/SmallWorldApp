import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Search from "./SearchBar/CustomSearchBar";
import { styles } from "../../../styles/Home.styles";

export default function SearchBarComponent() {
  return (
    <View style={styles.headerContainer}>
      <Search />
    </View>
  );
}
