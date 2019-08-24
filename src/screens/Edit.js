import React, { Component } from 'react'
import { View, ImageBackground, Image, StyleSheet, Text, StatusBar } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions } from 'react-navigation';
import colorStyle from '../styles/Color';
import * as EButton from '../components/Buttons';
import axios from 'axios';


export default class Edit extends Component {
    state = {
        title: '',
        local: '',
        data: '',
        hora_inicial: '',
        hora_fim: '',
        loading: false,
    }

    create = () => {
        this.setState({ loading: true }, () => {
            let data = {
                titulo: this.state.title,
                local: this.state.local,
                data: this.state.data,
                hora_inicial: this.state.hora_inicial
            }
            axios.put(`http://10.0.2.2:3000/eventos/${this.props.navigation.state.params.id}`, data).then((response) => {
                this.setState({ loading: false });
                this.props.navigation.navigate('Home');
            });
        })
    }

    componentDidMount() {
        const item = this.props.navigation.state.params;

        this.setState({
            title: item.titulo,
            local: item.local,
            data: item.data,
            hora_inicial: item.hora_inicial
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} >
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 50 }}>
                        <Text style={{ fontSize: 34, color: 'black', fontWeight: 'bold' }}>
                            Editar Notícia
                            </Text>
                        <View style={styles.form}>
                            <View style={{ marginBottom: 6 }}>
                                <Item floatingLabel style={{ width: '100%' }} error={!!this.state.errorEmail}>
                                    <Label style={styles.textColor}> Titulo </Label>
                                    <Input
                                        style={styles.textColor}
                                        value={this.state.title}
                                        onChangeText={title => this.setState({ title })}
                                    />
                                </Item>
                            </View>
                            <View style={{ marginBottom: 6 }}>
                                <Item floatingLabel style={{ width: '100%' }} error={!!this.state.errorEmail}>
                                    <Label style={styles.textColor}> Local </Label>
                                    <Input
                                        style={styles.textColor}
                                        value={this.state.local}
                                        onChangeText={local => this.setState({ local })}
                                    />
                                </Item>
                            </View>
                            <View style={{ marginBottom: 6 }}>
                                <Item floatingLabel style={{ width: '100%' }} error={!!this.state.errorEmail}>
                                    <Label style={styles.textColor}> Titulo </Label>
                                    <Input
                                        style={styles.textColor}
                                        value={this.state.data}
                                        onChangeText={data => this.setState({ data })}
                                    />
                                </Item>
                            </View>
                            <View style={{ marginBottom: 6 }}>
                                <Item floatingLabel style={{ width: '100%' }} error={!!this.state.errorEmail}>
                                    <Label style={styles.textColor}> Hora inicial </Label>
                                    <Input
                                        style={styles.textColor}
                                        value={this.state.hora_inicial}
                                        onChangeText={hora_inicial => this.setState({ hora_inicial })}
                                    />
                                </Item>
                            </View>
                        </View>
                        <EButton.Primary
                            loading={this.state.loading}
                            onPress={this.create}
                            style={[styles.button, styles.containerCenter]}
                        >
                            Editar
                            </EButton.Primary>
                    </View>
                </View>
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
        color: colorStyle.BgDarkBlue.backgroundColor,
    },
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
