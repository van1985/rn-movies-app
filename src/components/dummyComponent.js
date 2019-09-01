import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const dummyComponent = () => {
  return <View style={styles.wrapper}>
            <Text>
                Test
            </Text>
        </View>;
};

export default dummyComponent;