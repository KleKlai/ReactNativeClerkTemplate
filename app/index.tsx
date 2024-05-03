import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={'#282828'} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})