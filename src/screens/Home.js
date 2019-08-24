import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';
// import Geocoder from 'react-native-geocoder';
import openMap from 'react-native-open-maps';
import axios from 'axios';

import Details from './Details'
import colorStyle from '../styles/Color';

const { width } = Dimensions.get('window');
const adjustSize = width - 100;


export default class Home extends Component {
  state = {
    data: []
  }

  _goToYosemite() {
    openMap({ start: "Instituto de Artes  - Rua Elis Regina, 50 Cidade Universitária - Zeferino Vaz, Campinas - SP, 13083-854", end: "Francisco Morato" });
    // Geocoder.geocodeAddress('Francisco Morato').then(res => {
    // let latitude = res[0].position.lat;
    // let longitude = res[0].position.lng;
    // })
    // <Text style={styles.welcome}>Welcome to React Native!</Text>
    // <Text style={styles.instructions}>To get started, edit App.js</Text>
    // <Text style={styles.instructions}>{instructions}</Text>
    // {/* <Button
    //   color={'#bdc3c7'}
    //   onPress={this._goToYosemite}
    //   title="Click To Open Maps 🗺" />
    // <Button
    //   color={'#bdc3c7'}
    //   onPress={this.props.navigation.navigate('Login')}
    //   title="Go to Login" /> */}
  }

  componentDidMount() {
    // this._goToYosemite();
    axios.get(`http://10.0.2.2:3000/eventos`).then((response) => {
      this.setState({ data: response.data })
    })
  }

  render() {
    console.warn(this.state.data);

    return (
      <Container>
        <Content>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Details')}>
                <View style={[styles.cardContainer]}>
                  <View style={styles.title}>
                    <Text style={[styles.titleText]}> {item.titulo} </Text>
                  </View>
                  <View style={styles.title}>
                    <Text style={[styles.titleText]}> {item.local} </Text>
                  </View>
                  <View style={styles.title}>
                    <Text style={[styles.titleText]}> {item.data} </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => `list-item-${index}`}
          />
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button>
              <Text>Home</Text>
            </Button>
            <Button>
              <Text>Notícias</Text>
            </Button>
            <Button active>
              <Text>Eventos</Text>
            </Button>
            <Button>
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabBarContainer: {
    justifyContent: 'flex-end',
  },
  tabBar: {
    flexDirection: 'row',
  },
  title: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  titleText: {
    textAlign: 'center',
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 12
  },
  cardContainer: {
    borderColor: colorStyle.CardBorderColor.backgroundColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colorStyle.TextLigth.backgroundColor,
    padding: 10,
    margin: 50,
    width: adjustSize,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20
  },
});
