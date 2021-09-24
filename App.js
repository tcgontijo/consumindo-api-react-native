import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TextInput, StyleSheet, Button } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(false);
  const [LongUrl, setLongUrl] = useState("");
  const [url, setUrl] = useState("");


  const getShortUrl = async () => {

    try {
      const response = await fetch('https://gotiny.cc/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "input" : LongUrl })
      })
      const json = await response.json();
      console.log(JSON.stringify(json));
      setUrl('gotiny.cc/' + json[0].code);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

// useEffect(() => {
//   getShortUrl();
// }, []);

const styles = StyleSheet.create({
  input: {
    marginTop:50,
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderWidth: 1,
  },
  boxUrl :{
    margin: 30,
  },
  textUrl :{
    textAlign:"center",
    fontSize: 20,
  }
});

const onPress = ()=>{
  setLoading(true)
  getShortUrl()
}

return (
  <View style={{ flex: 1, padding: 24 }}>
    <TextInput
        style={styles.input}
        value={LongUrl}
        onChangeText={setLongUrl}
        placeholder="Insira a url a ser encurtada"
    />
    <Button
      onPress={onPress}
      title="Encurtar URL"
      color="#841584"
    />
    <View style={styles.boxUrl}>
      {isLoading ? <ActivityIndicator size="large" color="#841584"/> : (
        <Text style={styles.textUrl} >{url}</Text>
      )}
    </View>
  </View>
);
};