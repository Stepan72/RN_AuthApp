import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
// import AppLoading from "expo-app-loading";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useState } from "react";
import { Alert } from "react-native";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
    } catch (error) {
      Alert.alert("Something wrong!", "Can't register you!");
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    // return <AppLoading />;
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
