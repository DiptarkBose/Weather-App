import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { VStack, Box, Divider, NativeBaseProvider, Image, Link, Text, ScrollView } from 'native-base';

export default WeatherNewsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [news, setData] = useState([]);

  const getWeatherNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/everything?q=weather&apiKey=7e7d949c414246beaed5f912607858cf');
      const json = await response.json();
      setData(json.articles);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {getWeatherNews();}, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, padding: 24}}>
        <Text fontSize="3xl">Top Weather Stories </Text>
        {isLoading ? <ActivityIndicator/> : (
          <ScrollView>

            <Box border={1} borderRadius='md' mt={10}>
              <Image source={{uri: news[0].urlToImage}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
              <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4} _text={{fontSize: "md", fontWeight: "bold"}}>
                  {news[0].title}
                </Box>
                <Box px={4}>
                  {news[0].description} <Link mt={4} _text={{color: "blue.700"}} href={news[0].url}>Click to read full article </Link>
                </Box>
                <Box px={4} pb={4}>
                  {news[0].author}
                </Box>
              </VStack>
            </Box>

            <Box border={1} borderRadius='md' mt={10}>
              <Image source={{uri: news[1].urlToImage}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
              <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4} _text={{fontSize: "md", fontWeight: "bold"}}>
                  {news[1].title}
                </Box>
                <Box px={4}>
                  {news[1].description} <Link mt={4} _text={{color: "blue.700"}} href={news[1].url}>Click to read full article </Link>
                </Box>
                <Box px={4} pb={4}>
                  {news[1].author}
                </Box>
              </VStack>
            </Box>

            <Box border={1} borderRadius='md' mt={10}>
              <Image source={{uri: news[2].urlToImage}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
              <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4} _text={{fontSize: "md", fontWeight: "bold"}}>
                  {news[2].title}
                </Box>
                <Box px={4}>
                  {news[2].description} <Link mt={4} _text={{color: "blue.700"}} href={news[2].url}>Click to read full article </Link>
                </Box>
                <Box px={4} pb={4}>
                  {news[2].author}
                </Box>
              </VStack>
            </Box>

            <Box border={1} borderRadius='md' mt={10}>
              <Image source={{uri: news[5].urlToImage}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
              <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4} _text={{fontSize: "md", fontWeight: "bold"}}>
                  {news[5].title}
                </Box>
                <Box px={4}>
                  {news[5].description} <Link mt={4} _text={{color: "blue.700"}} href={news[5].url}>Click to read full article </Link>
                </Box>
                <Box px={4} pb={4}>
                  {news[5].author}
                </Box>
              </VStack>
            </Box>

            <Box border={1} borderRadius='md' mt={10}>
              <Image source={{uri: news[4].urlToImage}} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
              <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4} _text={{fontSize: "md", fontWeight: "bold"}}>
                  {news[4].title}
                </Box>
                <Box px={4}>
                  {news[4].description} <Link mt={4} _text={{color: "blue.700"}} href={news[4].url}>Click to read full article </Link>
                </Box>
                <Box px={4} pb={4}>
                  {news[4].author}
                </Box>
              </VStack>
            </Box>
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
};
