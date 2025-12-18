import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { GradientPillButton } from "@/components/GradientPillButton";
import { Candidate } from "@/services/candidateService";

type CandidateModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    image?: string;
  }) => void;
  initialData?: Candidate | null;
};

export function CandidateModal({
  visible,
  onClose,
  onSubmit,
  initialData,
}: CandidateModalProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        company: initialData.company || "",
        role: initialData.role || "",
        image: initialData.image || "",
      });
    } else {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        image: "",
      });
    }
  }, [initialData, visible]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    if (!initialData) {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        image: "",
      });
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end"
      >
        <Pressable
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
        />

        <View className="bg-white rounded-t-3xl px-5 pt-6 pb-8 max-h-[90%]">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            {initialData ? "Edit Candidate" : "Add Candidate"}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {(
              [
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["company", "Company"],
                ["role", "Role"],
                ["image", "Image URL"],
              ] as const
            ).map(([key, label]) => (
              <View key={key} className="mb-3">
                <Text className="text-sm text-gray-600 mb-1">{label}</Text>
                <TextInput
                  value={form[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  placeholder={label}
                  keyboardType={
                    key === "email"
                      ? "email-address"
                      : key === "phone"
                        ? "phone-pad"
                        : "default"
                  }
                />
              </View>
            ))}

            {/* Actions */}
            <View className="flex-row justify-between mt-6">
              <Pressable onPress={onClose}>
                <Text className="text-gray-500 font-semibold px-4 py-3">
                  Cancel
                </Text>
              </Pressable>

              <GradientPillButton title={initialData ? "Update" : "Save"} onPress={handleSubmit} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
