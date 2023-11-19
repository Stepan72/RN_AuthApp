import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useState } from "react";
import { login } from "../util/auth";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await login(email, password);
    } catch (error) {
      const errorMes = await error;
      console.log(errorMes);
      Alert.alert(
        "Authentication failed!",
        // "Couldn't log in you. Please check your credentials!"
        `${errorMes}`
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    // return <AppLoading />;
    return <LoadingOverlay message="Loggin in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
