import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.title,
            {
              color: active === 0 ? "black" : Colors.gray,
              textDecorationLine: active === 0 ? "underline" : "none",
            },
          ]}>
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.title,
            {
              color: active === 1 ? "black" : Colors.gray,
              textDecorationLine: active === 1 ? "underline" : "none",
            },
          ]}>
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginLeft: -30 + -16,
  },
  title: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: 18,
  },
});
export default ModalHeaderText;
