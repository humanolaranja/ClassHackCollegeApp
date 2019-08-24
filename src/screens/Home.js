import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';
// import Geocoder from 'react-native-geocoder';
import ActionButton from 'react-native-action-button';
import openMap from 'react-native-open-maps';
import axios from 'axios';

import Details from './Details'
import colorStyle from '../styles/Color';

const { width } = Dimensions.get('window');
const adjustSize = width - 100;


export default class Home extends Component {
  state = {
    data: [],
    isFetching: false
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
  }

  fetchData() {
    this.setState(
      { isFetching: true },
      () => {
        axios.get(`http://10.0.2.2:3000/eventos`).then((response) => {
          this.setState({ data: response.data, isFetching: false })
        })
      }
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Container>
        <Text style={{ fontSize: 34, color: 'black', fontWeight: 'bold' }}>
          Eventos
        </Text>
        <ActionButton
          style={{ zIndex: 100 }}
          buttonColor="#1878BA"
          onPress={() => { this.props.navigation.navigate('Create') }}
          offsetY={70}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.fetchData()} />}
          data={this.state.data}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Details', item)}>
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
        <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button>
              <Text>Home</Text>
            </Button>
            <Button>
              <Text>Notícias</Text>
            </Button>
            <Button style={{
									backgroundColor: "#1878BA"
								}}>
              <Text style={{color: 'white'}}>Eventos</Text>
            </Button>
            <Button>
              <Text>Notificações</Text>
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
    marginHorizontal: 50,
    marginVertical: 10,
    width: adjustSize,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20
  },
});
