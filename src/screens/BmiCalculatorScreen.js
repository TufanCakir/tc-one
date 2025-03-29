import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback, // NEU
} from "react-native";

const BmiCalculatorScreen = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const validateForm = () => {
    if (!age || !height || !weight || !gender) {
      alert("All fields are required!");
    } else {
      countBmi();
    }
  };

  const countBmi = () => {
    const bmi = (parseFloat(weight) / (parseFloat(height) / 100) ** 2).toFixed(
      2
    );

    let result = "";
    if (bmi < 18.5) {
      result = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Healthy";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Overweight";
    } else if (bmi >= 30 && bmi <= 34.9) {
      result = "Obese";
    } else if (bmi >= 35) {
      result = "Extremely obese";
    }

    setBmiResult({ bmi, result });

    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>BMI Calculator</Text>
        <View style={styles.form}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your age"
              placeholderTextColor="#fff"
              onChangeText={setAge}
              value={age}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your height"
              placeholderTextColor="#fff"
              onChangeText={setHeight}
              value={height}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your weight"
              placeholderTextColor="#fff"
              onChangeText={setWeight}
              value={weight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "male" && styles.selectedGender,
              ]}
              onPress={() => setGender("male")}
            >
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "female" && styles.selectedGender,
              ]}
              onPress={() => setGender("female")}
            >
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
            <Text style={styles.submitButtonText}>Calculate BMI</Text>
          </TouchableOpacity>
          {bmiResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>BMI:</Text>
              <Text style={styles.resultText}>{bmiResult.bmi}</Text>
              <Text style={styles.resultLabel}>Result:</Text>
              <Text style={styles.resultText}>{bmiResult.result}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  form: {
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    elevation: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  selectedGender: {
    backgroundColor: "#fff",
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  resultText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default BmiCalculatorScreen;
