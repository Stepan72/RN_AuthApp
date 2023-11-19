import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const ctx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      ctx.authenticate(token);
    } catch (error) {
      const errorMes = await error;
      console.log(errorMes);
      Alert.alert(
        "Authentication failed!",
        // "Couldn't log in you. Please check your credentials!"
        `${errorMes}`
      );
      setIsAuthenticating(false);
    } finally {
    }
  }

  if (isAuthenticating) {
    // return <AppLoading />;
    return <LoadingOverlay message="Loggin in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
