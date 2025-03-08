// src/components/UpdateSection.js
import React from "react";
import { Text } from "react-native";
import styles from "../styles/NewsStyles";

const UpdateSection = React.memo(({ title, details }) => {
  return (
    <>
      <Text style={styles.updateTitle}>{title}</Text>
      {details.map((detail, index) => (
        <Text key={index} style={styles.text}>
          {detail}
        </Text>
      ))}
    </>
  );
});

export default UpdateSection;
