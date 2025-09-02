import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarIconWithBadge from '@/components/TabBarIconWithBadge';
import { ThemedText } from '@/components/ThemedText';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'People',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          headerStyle: {
          },
          headerTintColor: Colors.light.tint, // Text/icon color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
          },
          headerTitleAlign: 'center', // Center align title
          headerLeft: () => (
            <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginLeft: 16
            }}
            >
              <View 
              style={{
                height: 8,
                width: 8,
                backgroundColor: '#0CC36D',
                borderRadius: 100
              }}
              ></View>
              <ThemedText>BLR</ThemedText> 
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <View style={{position: "relative",}}>
                <Image
                  source={require("@/assets/images/avatar.png")}
                  style={{width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 'auto',
                  height: 18,
                  paddingHorizontal: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#fff",
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold"
                  }}>42%</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="jamms"
        options={{
          title: 'Jamms',
          tabBarIcon: ({ color }) => <Ionicons name="calendar-clear-outline" size={24} color={color} />,
          headerStyle: {
          },
          headerTintColor: Colors.light.tint, // Text/icon color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
          },
          headerTitleAlign: 'center', // Center align title
          headerLeft: () => (
            <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginLeft: 16
            }}
            >
              <View 
              style={{
                height: 8,
                width: 8,
                backgroundColor: '#0CC36D',
                borderRadius: 100
              }}
              ></View>
              <ThemedText>BLR</ThemedText> 
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <View style={{position: "relative",}}>
                <Image
                  source={require("@/assets/images/avatar.png")}
                  style={{width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 'auto',
                  paddingHorizontal: 8,
                  height: 18,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#fff",
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold"
                  }}>42%</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color }) => <TabBarIconWithBadge
            name="star-outline"
            color={color}
            size={24}
            badgeCount={2} 
          />,
          headerStyle: {
          },
          headerTintColor: Colors.light.tint, // Text/icon color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
          },
          headerTitleAlign: 'center', // Center align title
          headerLeft: () => (
            <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginLeft: 16
            }}
            >
              <View 
              style={{
                height: 8,
                width: 8,
                backgroundColor: '#0CC36D',
                borderRadius: 100
              }}
              ></View>
              <ThemedText>BLR</ThemedText> 
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <View style={{position: "relative",}}>
                <Image
                  source={require("@/assets/images/avatar.png")}
                  style={{width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 'auto',
                  height: 18,
                  paddingHorizontal: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#fff",
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold"
                  }}>42%</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIconWithBadge
            name="chatbox-outline"
            color={color}
            size={24}
            badgeCount={23} 
          />,
          headerStyle: {
          },
          headerTintColor: Colors.light.tint, // Text/icon color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
          },
          headerTitleAlign: 'center', // Center align title
          headerLeft: () => (
            <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginLeft: 16
            }}
            >
              <View 
              style={{
                height: 8,
                width: 8,
                backgroundColor: '#0CC36D',
                borderRadius: 100
              }}
              ></View>
              <ThemedText>BLR</ThemedText> 
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <View style={{position: "relative",}}>
                <Image
                  source={require("@/assets/images/avatar.png")}
                  style={{width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 'auto',
                  height: 18,
                  paddingHorizontal: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#fff",
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold"
                  }}>42%</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
    </Tabs>
  );
}
