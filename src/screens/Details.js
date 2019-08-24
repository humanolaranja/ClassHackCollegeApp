import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Title } from 'native-base';
// import Geocoder from 'react-native-geocoder';
import openMap from 'react-native-open-maps';
import axios from 'axios';

import colorStyle from '../styles/Color';

const { width } = Dimensions.get('window');
const adjustSize = width - 100;


export default class Details extends Component {
    state = {
        data: []
    }

    _goToYosemite(end) {
        openMap({ start: "FEEC Unicamp", end });
    }

    render() {
        const item = this.props.navigation.state.params;

        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: 'black' }} />
                            <Text>  Voltar</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('Delete', item)}>
                                <Icon name='ios-trash' style={{ color: 'black' }} />
                            </Button>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('Edit', item)}>
                                <Icon name='md-create' style={{ color: 'black' }} />
                            </Button>
                        </View>
                    </Right>
                </Header>
                <ImageBackground
                    source={require('../assets/images/bgDetails.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Content style={{ padding: 16 }}>
                        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{item.titulo}</Text>
                        <View style={{ height: 16 }} />
                        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold', textAlign: 'left' }}>{item.data}</Text>
                        <View style={{ height: 16 }} />
                        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold', textAlign: 'right' }}>{item.hora_inicial}h</Text>
                        <View style={{ height: 16 }} />

                        <View style={{ flex: 2 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='ios-pin' style={{ color: 'white' }} />
                                <Text style={{ fontSize: 34, color: 'white', fontWeight: 'bold' }}>  Local</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{item.local}</Text>
                                </View>
                                <View style={{ backgroundColor: '#2F80ED', flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => this._goToYosemite(item.local)}>
                                        <Text style={{ color: 'white' }}>Veja a Rota aqui</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            {/* <View><Text>Você já confirmou presença</Text></View> */}
                        </View>
                    </Content>
                </ImageBackground>
                <Footer>
                    <FooterTab style={{ backgroundColor: "#FFF" }}>
                        <Button>
                            <Text>Home</Text>
                        </Button>
                        <Button>
                            <Text>Notícias</Text>
                        </Button>
                        <Button>
                            <Text>Eventos</Text>
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
    header: {
        color: 'white',
    }
});
