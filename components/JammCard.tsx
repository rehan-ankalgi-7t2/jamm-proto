import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  host_name?: string;
  host_avatar?: string;
};

type JammCardProps = {
  jamm: TJammRow;
  onRequestPress?: () => void;
  onNavigatePress?: () => void;
};

const JammCard: React.FC<JammCardProps> = ({ jamm, onRequestPress, onNavigatePress }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = format(date, 'EEEE');
    const dayMonth = format(date, 'd MMMM');
    const time = format(date, 'HH:mm a');
    return { dayName, dayMonth, time };
  };

  const formatTimeRange = (from: string, to: string) => {
    const fromTime = format(new Date(from), 'HH:mm a');
    const toTime = format(new Date(to), 'HH:mm a');
    return `${fromTime} - ${toTime}`;
  };

  const getPaidByDisplay = (paidBy: string) => {
    switch (paidBy) {
      case 'free':
        return 'Free';
      case 'go_dutch':
        return 'Go Dutch';
      case 'split_the_bill':
        return 'Split The Bill';
      case 'on_me':
        return "Host's Treat";
      case 'attendance_fee':
        return `Attendance fee`; 
      default:
        return paidBy;
    }
  };

  const getActivityIcon = (activity: string) => {
    const iconMap: { [key: string]: string } = {
      'road_trip': 'directions-car',
      'bike_ride': 'directions-bike',
      'hiking': 'terrain',
      'restaurant': 'restaurant',
      'cafe': 'local-cafe',
      'movie': 'movie',
      'gaming': 'sports-esports',
    };
    return iconMap[activity] || 'event';
  };

  const { dayName, dayMonth } = formatDateTime(jamm.from);
  const timeRange = formatTimeRange(jamm.from, jamm.to);

  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.title}>{jamm.jamm_name}</Text>
      
      {/* Host Info */}
      <View style={styles.hostContainer}>
        <Image 
          source={{ 
            uri: jamm.host_avatar || 'https://randomuser.me/api/portraits/men/45.jpg'
          }} 
          style={styles.avatar} 
        />
        <View style={styles.hostInfo}>
          <Text style={styles.hostedBy}>Hosted by</Text>
          <Text style={styles.hostName}>{jamm.host_name || 'John Smith'}</Text>
        </View>
      </View>

      {/* Activity */}
      <View style={styles.detailRow}>
        <Ionicons name="star-outline" size={24} color="black" />        
        <Text style={styles.detailText}>{jamm.activity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
      </View>

      {/* Date & Time */}
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={24} color="black" />
        <View>
          <Text style={styles.detailText}>{dayName} {dayMonth}</Text>
          <Text style={styles.timeText}>{timeRange}</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={24} color="black" />
        <Text style={styles.detailText}>{jamm.location}</Text>
        {jamm.map_url && (
          <TouchableOpacity onPress={onNavigatePress} style={styles.navigateButton}>
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Number of People */}
      <View style={styles.detailRow}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.detailText}>{jamm.total_guests} People</Text>
      </View>

      {/* Payment Info */}
      <View style={styles.detailRow}>
        <Ionicons name="receipt-outline" size={24} color="black" />
        <Text style={styles.detailText}>{getPaidByDisplay(jamm.paid_by)}</Text>
        {jamm.paid_by === 'attendance_fee' && (
          <Ionicons name="information-circle-outline" size={24} color="black" />
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{jamm.description}</Text>

      {/* Request Button */}
      <TouchableOpacity style={styles.requestButton} onPress={onRequestPress}>
        <Text style={styles.requestButtonText}>
          Request to <Text style={styles.jammText}>JAMM</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostedBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E91E63', // Pink color as shown in the image
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    minHeight: 24,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 12,
    flex: 1,
    fontWeight: 'bold'
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  navigateButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  requestButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  jammText: {
    color: '#E91E63', // Pink accent color
    fontWeight: 'bold',
  },
});

export default JammCard;