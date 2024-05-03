import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { useSignUp } from "@clerk/clerk-expo";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    // If click instance is not loaded, return
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      // Create user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error: any) {
      alert(error.errors[0].message);
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error: any) {
      alert(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="johndoe@example.com"
            value={emailAddress}
            style={styles.inputField}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.inputField}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={onSignUpPress}
            style={{
              backgroundColor: "#6c47ff",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 15,
            }}
          >
            <Text style={{ color: "#f1f1f1" }}>Create account</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            placeholder="Code..."
            value={code}
            onChangeText={(code) => setCode(code)}
            style={styles.inputField}
          />

          <TouchableOpacity
            onPress={onPressVerify}
            style={{
              backgroundColor: "#6c47ff",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 15,
            }}
          >
            <Text style={{ color: "#f1f1f1" }}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}

      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 3,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});
