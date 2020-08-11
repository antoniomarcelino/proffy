import React from 'react';
import styles from './styles';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import giveClassesBG from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';
function GiveClasses(){

    const { goBack }= useNavigation();
    function handleNavigateBack(){
        goBack();
    }
    return (
    <View style={styles.container}>
        <ImageBackground resizeMode="contain" source={giveClassesBG} style={styles.content}>
            <Text style={styles.title}>Quer ser um proffy?</Text>
            <Text style={styles.description}>Para começar você só precisa se cadastrar no app. É fácil e rápido!</Text>
        </ImageBackground>
        <RectButton onPress={handleNavigateBack}style={styles.okBtn}>
        <Text style={styles.btnText}>Cadastrar Perfil</Text>
        </RectButton>
    </View>
        );
}

export default GiveClasses;