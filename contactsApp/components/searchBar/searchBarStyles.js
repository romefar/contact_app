import { StyleSheet, PixelRatio} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      width : 24,
      height : 24,     
    },
    input: { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
        marginRight: 6,
        marginLeft: 6,
        marginTop: 2,
        marginBottom: 10,
        paddingLeft : 10,
        paddingRight: 10,
        borderRadius: 30,
        borderColor: 'rgba(169,169,169,.6)',
        borderWidth: 2,
    }
  });   