// src/hooks/useOTP.js
import { useState } from "react";

const useOTP = () => {
  const [otp, setOtp] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);

  const generateOtp = () => {
    let generatedOtp = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      generatedOtp += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setOtp(generatedOtp);
    setIsValid(null);
    setShowOtpBox(true);
  };

  const validateOtp = () => {
    setIsValid(userInput === otp);
  };

  return {
    otp,
    userInput,
    setUserInput,
    isValid,
    showOtpBox,
    generateOtp,
    validateOtp,
  };
};

export default useOTP;
