// src/screens/SummonResultScreen.js
import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummonedBackgroundsContext } from "../context/SummonedBackgroundsContext";
import GradientButton from "../components/GradientButton";
import SummonItem from "../components/SummonItem";
import styles from "../styles/SummonResultScreenStyles.js";

const SummonResultScreen = () => {
  const navigation = useNavigation();
  const { summonedBackgrounds } = useContext(SummonedBackgroundsContext);

  const renderItem = ({ item }) => (
    <SummonItem item={item} onSummon={() => {}} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={summonedBackgrounds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <GradientButton
        title="Back to Summon"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        textStyle={styles.backButtonText}
      />
    </View>
  );
};

export default SummonResultScreen;
