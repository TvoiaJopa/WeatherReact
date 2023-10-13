import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const api = {
  url: "https://api.openweathermap.org/data/2.5/weather?",
  key: "2118a14b41dac2da00992c034e5eb17e",
  icons: "http://openweathermap.org/img/wn/",
};

export default function Weather(props) {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const url =
      api.url +
      "lat=" +
      props.latitude +
      "&lon=" +
      props.longitude +
      "&units=metric" +
      "&appid=" +
      api.key;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setTemp(json.main.temp);
        setDescription(json.weather[0].description);
        setIcon(api.icons + json.weather[0].icon + "@2x.png");
      })
      .catch((error) => {
        console.error(error);
        setTemp(0);
        setDescription("Error retrieving weather information.");
      });
  }, [props.latitude, props.longitude]);

  return (
    <View>
      <Text>Temperature: {temp}°C</Text>
      <Text>Description: {description}</Text>
      <Image source={{ uri: icon }} style={{ width: 50, height: 50 }} />
    </View>
  );
}
