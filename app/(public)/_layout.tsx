import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: "Reset Password",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;

const styles = StyleSheet.create({});
