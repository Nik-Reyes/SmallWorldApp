import { View } from "react-native";
import { styles } from "../../../styles/Home.styles";
import Search from "./SearchBar/CustomSearchBar";
import AccountAvatar from "./AccountAvatar/AccountAvatar";

export default function SearchBarComponent() {
  return (
    <View style={styles.headerContainer}>
      <Search />
      <AccountAvatar />
    </View>
  );
}
