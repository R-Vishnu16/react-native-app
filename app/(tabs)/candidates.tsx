import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchCandidates, createCandidate, Candidate } from "@/services/candidateService";
import { GradientPillButton } from "@/components/GradientPillButton";
import { AddCandidateModal } from "@/components/AddCandidateModal";


export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleCreateCandidate = async (form: any) => {
    try {
      await createCandidate(form);
      await loadCandidates(); // Refetch to ensure UI is in sync
      setShowModal(false);
    } catch (err) {
      console.error("Create candidate failed", err);
    }
  };


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 pt-10  bg-gray-50 px-4">
      <View className="pt-12 pb-5 flex-row justify-around items-center">
        <GradientPillButton
          title="+ Add Candidate"
          onPress={() => setShowModal(true)}
        />

        <GradientPillButton
          title="View Logs"
          onPress={() => {
            console.log("View Logs pressed");
          }}
        />
      </View>

      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 64 }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-3 rounded-xl shadow-sm flex-row items-center">
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : null}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {item.firstName} {item.lastName}
              </Text>
              <Text className="text-gray-600">{item.email}</Text>
              <Text className="text-gray-600">{item.phone}</Text>
              <Text className="text-sm text-purple-700 mt-1">
                {item.company} • {item.role}
              </Text>
            </View>
          </View>
        )}
      />
      <AddCandidateModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateCandidate}
      />


    </View>
  );
}
