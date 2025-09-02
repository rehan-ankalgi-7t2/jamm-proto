import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ChatsScreen() {
    const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView
        style={{ 
        flex: 1, 
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : "#FBFBFB"
        }}>
            <ThemedText>No Chats found</ThemedText>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
