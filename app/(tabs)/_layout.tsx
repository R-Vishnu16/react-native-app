import { Tabs } from "expo-router";
import { Home, Users, Briefcase } from "lucide-react-native";
import { TabIcon } from "@/components/TabIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
          paddingBottom: 12,
          paddingTop: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" Icon={Home} />
          ),
        }}
      />

      <Tabs.Screen
        name="candidates"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Candidates" Icon={Users} />
          ),
        }}
      />

      <Tabs.Screen
        name="vacancy"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Vacancy" Icon={Briefcase} />
          ),
        }}
      />
    </Tabs>
  );
}