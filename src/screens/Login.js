import React, { Component } from 'react'
import { View, ImageBackground, Image, StyleSheet, Text, StatusBar } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions } from 'react-navigation';
import colorStyle from '../styles/Color';
import * as EButton from '../components/Buttons';
import axios from 'axios';


export default class Login extends Component {
    state = {
        email: '',
        errorMail: '',
        loading: false,
        senha: ''
    }

    checkUser = () => {
        this.setState({ loading: true }, () => {
            axios.get(`http://10.0.2.2:3000/usuarios?email=${decodeURIComponent(this.state.email)}`).then((response) => {
                this.setState({ loading: false });
                if(response.data.length > 0 && this.state.senha == 12345) {
                    axios.post(`http://10.0.2.2:3000/logados`).then(() => {
                        this.props.navigation.navigate('Home');
                    })
                } else {
                    this.setState({ errorEmail: "Usuário não encontrado, verifique email ou senha" });
                }
            });
        }) 
    }

    componentDidMount() {
        axios.get(`http://10.0.2.2:3000/logados?id<2`).then((response) => {
            let goHome = false;
            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].id === 1 | response.data[i].id === 2) {
                    goHome = true;
                }
            }
            if(goHome) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} >
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" barStyle="light-content" />
                <ImageBackground
                    source={require('../assets/images/bg.jpeg')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                resizeMode="contain"
                                style={{ height: 120, width: 120 }}
                            />
                            <Text style={{ fontSize: 34, color: 'white', fontWeight: 'bold' }}> CollegeApp </Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 34, color: 'white', fontWeight: 'bold' }}>
                                É simples estar conectado.
                            </Text>
                            <View style={styles.form}>
                                <View style={{ marginBottom: 6 }}>
                                    <Item floatingLabel style={{ width: '100%' }} error={!!this.state.errorEmail}>
                                        <Label style={styles.textColor}> Email </Label>
                                        <Input
                                            style={styles.textColor}
                                            value={this.state.email}
                                            onChangeText={ email => this.setState({ email, errorEmail: '' }) }
                                        />
                                    </Item>
                                    <Text
                                        style={{
                                            paddingLeft: 3,
                                            fontSize: 13,
                                            marginTop: 5,
                                            color: colorStyle.MsgErrorLight.backgroundColor,
                                        }}
                                    >
                                        {!!this.state.errorEmail ? this.state.errorEmail : ` `}
                                    </Text>
                                </View>
                                <View style={{ marginBottom: 6 }}>
                                    <Item floatingLabel style={{ width: '100%' }}>
                                        <Label style={styles.textColor}> Senha </Label>
                                        <Input
                                            secureTextEntry={true}
                                            style={styles.textColor}
                                            onChangeText={ senha => this.setState({ senha }) }
                                        />
                                    </Item>
                                </View>
                            </View>
                            <EButton.Primary
                                loading={this.state.loading}
                                onPress={this.checkUser}
                                style={[styles.button, styles.containerCenter]}
                            >
                                Entrar
                            </EButton.Primary>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        padding: 16,
        paddingBottom: 16,
        paddingTop: 0,
        height: '100%',
    },
    logo: {
        flex: 1,
        marginTop: 20,
        alignSelf: 'center',
    },
    form: {
        flex: 1,
        marginVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 30,
        paddingHorizontal: 0,
    },
    hide: {
        position: 'absolute',
        height: 1,
        width: 1,
    },
    textColor: {
        color: colorStyle.TextLigth.backgroundColor,
    },
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
