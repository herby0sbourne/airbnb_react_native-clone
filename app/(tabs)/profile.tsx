import {Link} from "expo-router";
import {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useAuth, useUser} from "@clerk/clerk-expo";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

const Page = () => {
  const {signOut, isSignedIn} = useAuth();
  const {user} = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    // setFirstName(user.firstName);
    // setLastName(user.lastName);
    // setEmail(user?.emailAddresses[0].emailAddress);
  }, [user]);

  const updateUser = async () => {
    if (!firstName || !lastName) return;
    try {
      await user?.update({
        firstName,
        lastName,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setEdit(false);
    }
  };

  const addImage = async () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Profile</Text>
        <Ionicons name={"notifications-outline"} size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={addImage}>
            <Image source={{uri: user?.imageUrl}} style={styles.avatar} />
          </TouchableOpacity>

          <View style={{flexDirection: "row", gap: 6}}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  value={firstName || ""}
                  placeholder="First Name"
                  onChangeText={setFirstName}
                  style={styles.textInput}
                />
                <TextInput
                  value={lastName || ""}
                  placeholder="Last Name"
                  onChangeText={setLastName}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={updateUser}>
                  <Ionicons name={"checkmark-outline"} size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{fontFamily: Fonts.fontBold, fontSize: 22}}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name={"create-outline"} size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>{user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && (
        <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />
      )}

      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title={"Login in"} color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontFamily: Fonts.fontBold,
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.fontSemiBold,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },
  editRow: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default Page;
