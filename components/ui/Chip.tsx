import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ChipProps {
  icon?: string;
  label: string;
  value?: number | string;
  selected?: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({
  icon = "",
  label,
  value,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <MaterialIcons
          name={icon as any}
          size={18}
          color={selected ? "#fff" : '#1e1e1e'}
          style={{ marginRight: 6 }}
        />
      )}
      <Text style={[styles.label, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 5,
    backgroundColor: "#fff",
    display: 'flex',
  },
  selectedChip: {
    backgroundColor: Colors.light.brandColor,
    borderColor: Colors.light.brandColor,
    elevation: 2
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  selectedText: {
    color: "#fff",
  },
});

export default Chip;
