import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonCard = () => {
  return (
    <View
      style={{
        height: 230,
        width: 360,
        backgroundColor: "#FAFCFC",
        flexDirection: "row",
        margin: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ width: 150, height: 230, backgroundColor: "#E0E0E0", borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }} />
      <View style={{ flex: 1, padding: 18 }}>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, { width: "50%", marginTop: 10 }]} />
        <View style={[styles.skeletonText, { width: "80%", marginTop: 10 }]} />
        <View style={[styles.skeletonText, { width: "90%", marginTop: 10 }]} />
        <View style={[styles.skeletonText, { width: "60%", marginTop: 10 }]} />
       
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonText: {
    backgroundColor: "#E0E0E0",
    height: 20,
    borderRadius: 4,
  },
  skeletonChip: {
    backgroundColor: "#E0E0E0",
    width: 56,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
});

export default SkeletonCard;
