import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import {
  fetchCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  Candidate,
} from "@/services/candidateService";
import { GradientPillButton } from "@/components/GradientPillButton";
import { CandidateModal } from "@/components/CandidateModal";
import { Pencil, Trash2 } from "lucide-react-native";

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

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

  const handleCreateOrUpdateCandidate = async (form: any) => {
    try {
      if (selectedCandidate) {
        await updateCandidate(selectedCandidate.id, form);
      } else {
        await createCandidate(form);
      }
      await loadCandidates();
      setShowModal(false);
      setSelectedCandidate(null);
    } catch (err) {
      console.error("Save candidate failed", err);
      Alert.alert("Error", "Failed to save candidate");
    }
  };

  const handleDeletePress = (candidate: Candidate) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${candidate.firstName} ${candidate.lastName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCandidate(candidate.id);
              await loadCandidates();
            } catch (err) {
              console.error("Delete candidate failed", err);
              Alert.alert("Error", "Failed to delete candidate");
            }
          },
        },
      ]
    );
  };

  const handleEditPress = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleAddPress = () => {
    setSelectedCandidate(null);
    setShowModal(true);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 pt-10 px-4">
      <View className="pt-10 pb-5 flex-row justify-between items-end">
        <Text className="pl-4 text-3xl font-bold text-blue-900" style={{fontFamily : 'helevetica'}}>Candidates</Text>
        <GradientPillButton title="+ Add" onPress={handleAddPress} />
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

            {/* Action Buttons */}
            <View className="flex-col gap-3 ml-2">
              <Pressable
                onPress={() => handleEditPress(item)}
                className="p-1"
              >
                <Pencil size={20} color="#266ddfff" />
              </Pressable>
              <Pressable
                onPress={() => handleDeletePress(item)}
                className="p-1"
              >
                <Trash2 size={20} color="#c47c7cff" />
              </Pressable>
            </View>
          </View>
        )}
      />
      <CandidateModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCandidate(null);
        }}
        onSubmit={handleCreateOrUpdateCandidate}
        initialData={selectedCandidate}
      />
    </View>
  );
}
