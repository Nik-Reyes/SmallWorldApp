import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Search from "./SearchBar/CustomSearchBar";
import { styles } from "../../../styles/Home.styles";
import AccountAvatar from "./AccountAvatar/AccountAvatar";

export default function SearchBarComponent() {
  return (
    <View style={styles.headerContainer}>
      <Search />
      <AccountAvatar/>
    </View>
  );
}
