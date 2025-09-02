import CreateJammFab from '@/components/CreateJammFab';
import CreateJammFormSlideModal from '@/components/CreateJammModal';
import JammCard from '@/components/JammCard';
import { ThemedText } from '@/components/ThemedText';
import Chip from '@/components/ui/Chip';
import { Colors } from '@/constants/Colors';
import { databases } from '@/services/appwrite';
import Constants from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export type TJammRow = {
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $sequence: number;
  $tableId: string;
  $updatedAt: string;
  activity: string;
  description: string;
  from: string;
  jamm_name: string;
  location: string;
  map_url: string | null;
  paid_by: string;
  to: string;
  total_guests: number;
};

export type TJammResponse = {
  rows: TJammRow[];
  total: number;
};


export default function JammsScreen() {
  const colorScheme = useColorScheme()
  const [jams, setJams] = useState<TJammRow[]>();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(640)).current; // start off-screen (bottom)

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 640,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    const fetchJams = async () => {
      try {
        const response = await databases.listRows(
          Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID,
          "jams",
          []
        );
        setJams(response.rows as any || []);
      } catch (error) {
        Alert.alert('Failed to fetch jams')
      } finally {
        setLoading(false);
      }
    };

    fetchJams();
  }, []);

  
  return (
  <GestureHandlerRootView
    style={{ 
      flex: 1, 
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : "#FBFBFB"
    }}>
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 16, paddingHorizontal: 8 }}
          contentContainerStyle={{ gap: 0 }}
        >
          {['Up Coming', 'My Jamms', 'This Week', 'This Weekend'].map(label => (
            <Chip key={label} label={label} value={label} onPress={() => {}}/>
          ))}
        </ScrollView>
        {/* Jamm list */}
        {
          jams && jams.length > 0 ? 
          jams?.map((jamm, index) => (
            <JammCard key={index} jamm={jamm}/>
          )):
          <ThemedText>No Jamms Available</ThemedText>
        }
      </ScrollView>
      <CreateJammFab onPress={() => setVisible(true)} titleVerb='Post a '/>
      <CreateJammFormSlideModal visible={visible} setVisible={setVisible} slideAnim={slideAnim}/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignSelf: 'center',
  },
  jamCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  jamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});