import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';

type MenuType = "WINTER" | "SPRING" | "SUMMER" | "FALL" | "ARCHIVE"| "TBA" | "AIRING";

interface FloatingMenuProps {
  select: (menuType: MenuType) => void;
}

export default function FloatingMenu({ select }: FloatingMenuProps) {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleBurgerClick = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsBurgerClicked(!isBurgerClicked);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleMenuItemClick = (menuType: MenuType) => {
    select(menuType);
  };

  const getIcon = (menuType: MenuType) => {
    switch (menuType) {
      case "ARCHIVE":
        return <IconFeather name="archive" size={20} color={"white"} />;
      case "TBA":
        return <Icon2 name="box" size={20} color={"white"} />;
      case "AIRING":
        return <IconEntypo name="calendar" size={20} color={"white"} />;
      case "WINTER":
        return <Icon name="snowflake-o" size={20} color={"white"} />;
      case "SPRING":
        return <Image style={{ height: 20, width: 20, tintColor: "#fff" }} source={require("../assets/icons/leaf.png")} />;
      case "SUMMER":
        return <Icon name="sun-o" size={20} color={"white"} />;
      case "FALL":
        return <Icon2 name="leaf" size={20} color={"white"} />;
      default:
        return null;
    }
  };

  const getText = (menuType: MenuType) => {
    switch (menuType) {
      case "ARCHIVE":
        return 'Archive';
      case "TBA":
        return 'TBA';
      case "AIRING":
        return 'Airing';
      case "WINTER":
        return 'Winter';
      case "SPRING":
        return 'Spring';
      case "SUMMER":
        return 'Summer';
      case "FALL":
        return 'Fall';
      default:
        return '';
    }
  };

  const menuItems: MenuType[] = isBurgerClicked 
    ? ["ARCHIVE", "TBA", "AIRING"] 
    : ["WINTER", "SPRING", "SUMMER", "FALL"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item} style={styles.menuItem} onPress={() => handleMenuItemClick(item)}>
            <Animated.View style={{ opacity: fadeAnim, ...styles.animContainer }}>
              {getIcon(item)}
              <Text style={styles.menuText} className='mt-1 font-overpass-bold'>
                {getText(item)}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity className='w-16' style={{ ...styles.menuItem, ...styles.separateMenuContainer }} onPress={handleBurgerClick}>
        <View>
          <Image source={require("../assets/icons/burger.png")} style={{ height: 20, width: 20, tintColor: "#fff" }} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
  animContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2D2D44', // Dark background color for the menu
    borderRadius: 10,
    padding: 10,
    marginBottom: 20, // This creates the gap between the menu and the bottom of the screen
    marginHorizontal: 10,
    minWidth: 290,
  },
  separateMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2D2D44', // Dark background color for the menu
    borderRadius: 10,
    padding: 10,
    marginBottom: 20, // This creates the gap between the menu and the bottom of the screen
    marginHorizontal: 10,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedTypeContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#2D2D44',
    padding: 10,
    borderRadius: 10,
  },
  selectedTypeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
