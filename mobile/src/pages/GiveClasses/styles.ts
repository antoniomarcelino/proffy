import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    },

   content:{
       flex: 1,
       justifyContent: 'center',
       
   },

   title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 30,
    lineHeight: 38,
    maxWidth: 180,
   },

   description: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    marginTop: 24,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 240,
   },

   okBtn: {
    marginVertical: 40,
    backgroundColor: '#04D361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22

   },

   btnText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 18
   }


});

export default styles;