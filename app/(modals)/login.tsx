import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { defaultStyles } from '@/constants/Styles';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: 'oauth_facebook',
    // redirectUrl: 'exp://192.168.10.157:8081/--/(modals)/login',
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive, authSessionResult } = await selectAuth();
      console.log({ createdSessionId });
      console.log({ authSessionResult });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        console.log('i ran');

        // router.back();
      }
    } catch (error) {
      console.log('OAtuh Error', error);
      console.log('OAtuh Error', JSON.stringify(error));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={styles.line}></View>
        <Text style={styles.seperator}>or</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="call-outline" style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons name="logo-google" style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons name="logo-facebook" style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 26,
  },
  line: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: Fonts.fontSemiBold,
    color: Colors.gray,
  },
  btnOutline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.gray,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: 'black',
    fontSize: 16,
    fontFamily: Fonts.fontSemiBold,
  },
});

export default Page;
