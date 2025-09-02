import CreateJammFab from '@/components/CreateJammFab';
import CreateJammFormSlideModal from '@/components/CreateJammModal';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import peopleDataList from '@/data/people.json';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
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

  return (
    <GestureHandlerRootView 
    style={{ 
      flex: 1, 
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background 
    }}>
      <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 16, }}>
        {/* people list */}
        {
          peopleDataList.map((item, index) => (
            <PeopleCard personDetails={item} key={index}/>
          ))
        }
      </ScrollView>
      <CreateJammFab onPress={() => setVisible(true)} titleVerb='Post a '/>
      <CreateJammFormSlideModal visible={visible} setVisible={setVisible} slideAnim={slideAnim}/>
    </GestureHandlerRootView>
  );
}

type TPeopleCardProps = {
    personDetails: {
      name: string,
      designation: string,
      bio: string,
      profile_image_url: string,
      is_verified: boolean
    }
};


const PeopleCard: React.FC<TPeopleCardProps> = ({ personDetails }) => {
  return (
    <View
    style={{
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#1e1e1e24',
      paddingBottom: 24
    }}
    >
      <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
      }}
      >
        <ThemedText
        style={{
          fontSize: 24,
        }}
        >{personDetails.name}</ThemedText>
        {
          personDetails.is_verified && 
          <Image 
          source={require('@/assets/images/verified-badge.png')} 
          style={{ width: 24, height: 24, borderRadius: 24 }} />
        }
      </View>
      <ThemedText style={{fontSize: 14, marginBottom: 8}}>{personDetails.designation}</ThemedText>
      <Image source={{ uri: personDetails.profile_image_url }} style={{ width: '100%', aspectRatio: 1, borderRadius: 16 }} />
      <ThemedText style={{fontSize: 16, marginTop: 14}}>{personDetails.bio}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  openButton: { backgroundColor: '#1e1e2f', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 12 },
  submitButton: { backgroundColor: '#1e1e2f', padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  submitText: { color: 'white', fontSize: 16 },
});
