import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DateTimeSelectorProps {
  label: string;
  onChange: (date: Date) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ label, onChange }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setSelectedDateTime(date);
    onChange(date);
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setPickerVisible(true)}>
        <View 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        }}
        >
            <Text style={[selectedDateTime ? styles.value : styles.placeholder, {
                borderRightWidth: 2,
                paddingRight: 24,
                flex: 0.5,
                textAlign: 'center'
            }]}>
            {selectedDateTime
                ? `${selectedDateTime.toLocaleDateString()}`
                : "DD/MM"}
            </Text>
            <Text style={[selectedDateTime ? styles.value : styles.placeholder, {
                paddingLeft: 24,
                flex: 0.5,
                textAlign: 'center'
            }]}>
            {selectedDateTime
                ? `${selectedDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : "HH:MM"}
            </Text>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { color: "#777", marginBottom: 5, fontSize: 14 },
  input: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  placeholder: { color: "#aaa", fontSize: 24 },
  value: { color: "#333", fontSize: 24 },
});

export default DateTimeSelector;
