import React, { Component } from 'react'
import { View, ImageBackground, Image, StyleSheet, Text, StatusBar } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colorStyle from '../styles/Color';
import * as EButton from '../components/Buttons';
import axios from 'axios';


export default class Login extends Component {
    state = {
        email: '',
        errorMail: '',
        loading: false,
        senha: '12345'
    }

    checkUser = () => {
        this.setState({ loading: true }, () => {
            axios.get(`http://10.0.2.2:3000/usuarios?email=${decodeURIComponent(this.state.email)}`).then((response) => {
                this.setState({ loading: false });
                if(response.data.length > 0 && this.state.senha == 12345) {
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({ errorEmail: "Usuário não encontrado" });
                }
            });
        }) 
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} >
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" barStyle="light-content" />
                <ImageBackground
                    source={require('../assets/images/bg.jpg')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                resizeMode="contain"
                                style={{ height: 120, width: 120 }}
                            />
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
