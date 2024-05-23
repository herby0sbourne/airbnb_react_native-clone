import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
const Page = () => {
  const { signOut, isSignedIn } = useAuth();

  console.log(isSignedIn);

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={'/(modals)/login'}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default Page;
