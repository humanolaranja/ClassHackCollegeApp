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
        hora_inicio: '',
        hora_fim: '',
        loading: false,
    }

    create = () => {
        this.setState({ loading: true }, () => {
            axios.delete(`http://10.0.2.2:3000/eventos/${this.props.navigation.state.params.id}`).then((response) => {
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
            data: item.data
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} >
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 50 }}>
                        <Text style={{ fontSize: 34, color: 'black', fontWeight: 'bold' }}>
                            Deseja Deletar {this.state.title}
                        </Text>
                        <EButton.Primary
                            loading={this.state.loading}
                            onPress={this.create}
                            style={[styles.button, styles.containerCenter]}
                        >
                            Sim
                        </EButton.Primary>
                        <EButton.Secondary
                            loading={false}
                            onPress={() => this.props.navigation.goBack()}
                            style={[styles.button, styles.containerCenter]}
                        >
                            Não
                        </EButton.Secondary>
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
