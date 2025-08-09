import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/BillSplitterStyles";
import Footer from "../components/Footer";

export default function BillSplitterScreen() {
  const [billAmount, setBillAmount] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [tipAmount, setTipAmount] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [eachPersonBill, setEachPersonBill] = useState("");

  const handleBillAmountChange = (value) => {
    const amount = parseFloat(value);

    if (!isNaN(amount) && amount >= 0) {
      setBillAmount(amount.toFixed(2));
      setCustomTip("");
      setTipPercentage(0);
      setTipAmount("");
      setTotalBill("");
      setEachPersonBill("");
    } else {
      // Handle negative or invalid input
      setBillAmount("");
    }
  };

  const handleCustomTipChange = (value) => {
    const custom = parseFloat(value);

    if (!isNaN(custom) && custom >= 0) {
      setCustomTip(custom.toString());
      setTipPercentage(custom);
      setTipAmount("");
      setTotalBill("");
      setEachPersonBill("");
    } else {
      // Handle negative or invalid input
      setCustomTip("");
    }
  };

  const handleNumberOfPeopleChange = (value) => {
    const people = parseInt(value);

    if (!isNaN(people) && people >= 0) {
      setNumberOfPeople(people);
    } else {
      // Handle negative or invalid input
      setNumberOfPeople("");
    }
  };

  const handleTipButtonClick = (percentage) => {
    setTipPercentage(percentage);
    setCustomTip(percentage.toString()); // Set the custom tip input to the selected percentage
  };

  const calculateBill = () => {
    const bill = parseFloat(billAmount);
    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const eachPerson = total / parseFloat(numberOfPeople);

    setTipAmount(`₹${tip.toFixed(2)}`);
    setTotalBill(`₹${total.toFixed(2)}`);
    setEachPersonBill(`₹${eachPerson.toFixed(2)}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.billInput}>
        <Text style={styles.text}>Bill</Text>
        <View style={styles.inputContainer}>
          <Text>₹</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={billAmount}
            onChangeText={handleBillAmountChange}
          />
        </View>
        <Text style={styles.text}>Select Tip</Text>
        <View style={styles.tipContainer}>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 5 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(5)}
          >
            <Text style={styles.tipText}>5%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 10 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(10)}
          >
            <Text style={styles.tipText}>10%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 15 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(15)}
          >
            <Text style={styles.tipText}>15%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 25 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(25)}
          >
            <Text style={styles.tipText}>25%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 50 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(50)}
          >
            <Text style={styles.tipText}>50%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tip, tipPercentage === 75 ? styles.selected : null]}
            onPress={() => handleTipButtonClick(75)}
          >
            <Text style={styles.tipText}>75%</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.customTip}
          placeholder="Custom Tip in Percentage"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={customTip}
          onChangeText={handleCustomTipChange}
        />
        <Text style={styles.text}>Number of People</Text>
        <TextInput
          style={styles.numberOfPeople}
          placeholder="Number of people"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={numberOfPeople}
          onChangeText={handleNumberOfPeopleChange}
        />
        <TouchableOpacity
          style={styles.generateBillBtn}
          onPress={calculateBill}
          disabled={!billAmount || !numberOfPeople || !tipPercentage}
        >
          <Text style={styles.generateBillBtnText}>Generate Bill</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.billOutput}>
        <Text style={styles.tipAmount}>
          Tip amount <Text style={styles.value}>{tipAmount}</Text>
        </Text>
        <Text style={styles.total}>
          Total <Text style={styles.value}>{totalBill}</Text>
        </Text>
        <Text style={styles.eachPersonBill}>
          Each Person Bill <Text style={styles.value}>{eachPersonBill}</Text>
        </Text>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => handleBillAmountChange("")}
          disabled={!billAmount}
        >
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </ScrollView>
  );
}
