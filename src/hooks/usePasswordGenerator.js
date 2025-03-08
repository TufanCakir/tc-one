// src/hooks/usePasswordGenerator.js
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("12");
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Passwort entsprechend der Länge generieren
    for (let i = 0; i < parseInt(passwordLength, 10); i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
    setSuccessMessage("Password copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return {
    password,
    passwordLength,
    setPasswordLength,
    useSymbols,
    setUseSymbols,
    useNumbers,
    setUseNumbers,
    useLowerCase,
    setUseLowerCase,
    useUpperCase,
    setUseUpperCase,
    successMessage,
    generatePassword,
    copyToClipboard,
  };
};

export default usePasswordGenerator;
