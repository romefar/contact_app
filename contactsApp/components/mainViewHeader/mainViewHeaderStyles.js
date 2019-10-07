import { StyleSheet, PixelRatio} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      width : 24,
      height : 24,     
    },
    viewStyle: { 
        backgroundColor: "white",
        marginTop: 12,
        marginBottom: 12,
        flexDirection: "row",
        paddingLeft : 10,
        paddingRight: 10,
        justifyContent: "space-between",  
    },
    plus : { 
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(18),
        fontWeight: "bold",
    }
  });