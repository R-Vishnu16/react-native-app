import { Text, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  title: string;
  Icon: any;
};

export function TabIcon({ focused, title, Icon }: TabIconProps) {
  if (focused) {
    return (
      <View className="flex-row items-center justify-center min-w-[100px] px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
        <Icon size={20} color="#953dd4ff" />
        <Text className="ml-2 text-sm font-semibold text-black">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center">
      <Icon size={22} color="#A8B5DB" />
    </View>
  );
}
