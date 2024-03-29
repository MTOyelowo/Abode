import { Stack } from "expo-router";

export default function SavedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Saved" }} />
    </Stack>
  );
}
