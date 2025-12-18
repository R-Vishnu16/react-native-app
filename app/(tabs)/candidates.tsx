import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { useEffect, useState } from "react";
import { fetchCandidates, Candidate } from "@/services/candidateService";

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 py-10 bg-gray-50 px-4">
      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 32 }}
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
                {item.company.name} • {item.role}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
