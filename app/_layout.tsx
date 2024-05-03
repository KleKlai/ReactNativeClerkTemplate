import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ThemeProvider } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, router, useRouter, useSegments } from "expo-router";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c2FmZS1idXp6YXJkLTY1LmNsZXJrLmFjY291bnRzLmRldiQ";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    console.log("isSignedIn", isSignedIn);

    if (!isLoaded) return;

    // Check kung asa naka karun na screen
    const inTabsGroup = segments[0] === '(auth)'

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      // If not signed in go to login
      router.replace('/login')
    }

  }, [isSignedIn]);

  return <Slot />
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;

const styles = StyleSheet.create({});
