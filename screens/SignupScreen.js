import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
// import AppLoading from "expo-app-loading";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const ctx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      ctx.authenticate(token);
    } catch (error) {
      Alert.alert("Something wrong!", "Can't register you!");
      setIsAuthenticating(false);
    } finally {
    }
  }

  if (isAuthenticating) {
    // return <AppLoading />;
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
