import * as React from 'react';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import { VStack, Box, Divider, NativeBaseProvider, Link, Text, ScrollView, HStack } from 'native-base';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

WebBrowser.maybeCompleteAuthSession();

export default function WeatherSubscribeScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({    
    expoClientId: 'GOOGLE_CLIENTID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_CLIENTID.apps.googleusercontent.com'
  });

  const subscriptionTypes = ['Daily', 'Weekly', 'Monthly']

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [subscriptionType, setSubscriptionType] = useState(0)

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${authentication.accessToken}` }
      })
      .then((res) => res.json())
      .then((data) => {
          if (data != null) {
              setName(data.given_name)
              setEmail(data.email)
          }
      })
      }
  }, [response]);

  if (email == null) {
    return (
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
            }}
        />
      );
  } else {
      return (
        <NativeBaseProvider>
            <View style={{ flex: 1, padding: 24}} alignItems="center">
                <ScrollView>
                    <VStack space={4} alignItems="center">
                        <Text fontSize="3xl">Hi {name}</Text>
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>Please select from the following options to subscribe for Email Weather Alerts</Text>
                        <ButtonGroup
                            onPress={(selectedIndex) => { setSubscriptionType(selectedIndex) }}
                            selectedIndex={subscriptionType}
                            buttons={subscriptionTypes}
                            containerStyle={{height: 50}}
                        />
                        <Button
                            title="Subscribe"
                            onPress={() => {
                                subscribeUserForAlerts(name, email, subscriptionType)
                            }}
                        />
                    </VStack>
                </ScrollView>
            </View>
        </NativeBaseProvider>
      )
  }
}

function getUserSubscriptionForAlerts(name, email) {
}

function subscribeUserForAlerts(name, email, subscriptionType) {
}
