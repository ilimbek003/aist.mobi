import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type RecipientProps = {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
};

const Recipient: React.FC<RecipientProps> = ({
  setFirstName,
  setLastName,
  lastName,
  firstName,
}) => {
  return (
    <View>
      <Text style={styles.total}>Получатель</Text>
      <View>
        <Text style={styles.name}>Имя</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(192, 192, 192, 1)"
          placeholder="Введите имя"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View>
        <Text style={styles.name}>Фамилия</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(192, 192, 192, 1)"
          placeholder="Введите фамилию"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(28, 28, 28, 1)",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(28, 28, 28, 1)",
  },
});

export default Recipient;
