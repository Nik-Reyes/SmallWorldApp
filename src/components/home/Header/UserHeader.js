import React, { useState } from "react";
<<<<<<< HEAD
import { View, StyleSheet } from "react-native";
import Search from "./SearchBar/CustomSearchBar";
import { styles } from "../../../styles/Home.styles";
=======
import { View, StyleSheet, Text } from "react-native";
import Search from "./SearchBar/CustomSearchBar";
import { styles } from "../../../styles/Home.styles";
import AccountAvatar from "./AccountAvatar/AccountAvatar";
>>>>>>> main

export default function SearchBarComponent() {
  return (
    <View style={styles.headerContainer}>
      <Search />
<<<<<<< HEAD
=======
      <AccountAvatar/>
>>>>>>> main
    </View>
  );
}
