import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState("");
  const ctx = useContext(AuthContext);

  useLayoutEffect(() => {
    fetchMessage();
  }, [ctx.token]);

  async function fetchMessage() {
    /// добавляется токен для получения данных
    const response = await axios.get(
      `https://rn-expensetrackapp-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${ctx.token}`
    );
    console.log(typeof response.data);
    setMessage(response.data);
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
