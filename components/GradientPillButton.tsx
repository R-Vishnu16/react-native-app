import { Text, Pressable, View, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientPillButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function GradientPillButton({
  title,
  onPress,
  style,
}: GradientPillButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            {
              borderRadius: 999,
              overflow: "hidden",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            },
            style,
          ]}
        >
          <LinearGradient
            colors={["#1e40af", "#3730a3", "#7e22ce"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {title}
            </Text>
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
}
