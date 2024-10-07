import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label, type, onPress }) {
  if (type === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#C1E1C1", borderRadius: 24 },
        ]}
      >
        <Pressable style={[styles.button]} onPress={onPress}>
          <FontAwesome
            name="picture-o"
            size={18}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (type === "identify") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            borderColor: "#C1E1C1",
            borderRadius: 24,
            width: 182.5,
            height: 119,
          },
        ]}
      >
        <Pressable style={[styles.button]} onPress={onPress}>
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (type === "terrarium") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            borderRadius: 24,
            width: 365,
            height: 193,
          },
        ]}
      >
        <Pressable style={[styles.button]} onPress={onPress}>
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 113,
    height: 124,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },

  button: {
    borderRadius: 24,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "floralwhite",
  },

  buttonLabel: {
    color: "black",
    fontSize: 16,
  },
});
