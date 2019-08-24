import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'native-base';
import { UIActivityIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';

import colorStyle from '../styles/Color';

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 16,
    },
    primary: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
    },
    linkText: {
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 14,
        color: colorStyle.ButtomPrimary.backgroundColor,
    },
    text: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
    },
});

export class Primary extends Component {
    render() {
        const style = {
            backgroundColor: this.props.background
                ? this.props.background(this.props.disabled || false)
                : this.getBackgroundColor(this.props.disabled || false),
        };

        const textStyle = {
            color: this.props.disabled ? colorStyle.Disable.backgroundColor : colorStyle.TextLigth.backgroundColor
        };

        if (this.props.loading) {
            return (
                <View  testID={this.props.testID} style={[styles.buttonContainer, this.props.style]}>
                    <Button rounded={true} style={[styles.primary, style]}>
                        <UIActivityIndicator color='white' size={30} />
                    </Button>
                </View>
            );
        }
        else {
            return (
                <View testID={this.props.testID} style={[styles.buttonContainer, this.props.style]}>
                    <Button onPress={this.props.onPress} rounded={true} style={[styles.primary, style]} disabled={this.props.disabled}>
                        <Text style={[styles.text, textStyle]}>{this.props.children}</Text>
                    </Button>
                </View>
            );
        }
    }

    getBackgroundColor(disabled) {
        return disabled ? colorStyle.CardBorderColor.backgroundColor : colorStyle.ButtomPrimary.backgroundColor;
    }
}

export class Secondary extends Component {
    render() {
        return <Primary {...this.props} background={this.getBackgroundColor} />;
    }
    getBackgroundColor(disabled) {
        return disabled ? colorStyle.Disable.backgroundColor : colorStyle.ButtomSecondary.backgroundColor;
    }
}


export const Text = styled.Text`
    color: #fff;
    text-align: center;
    padding-left: 10;
    padding-right: 10;
    font-size: 14;
    line-height: 17;
    font-weight: bold;
`;

