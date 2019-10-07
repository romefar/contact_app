import { StyleSheet, PixelRatio} from 'react-native';

export default styles = StyleSheet.create({
    label: { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
        textTransform: "capitalize",
        color: '#3282f3'
    },
    output: { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(14),
    },
    dataContainer: {
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 10
    },
    safeAreaStyle: { 
     
    }, 
    header : { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(18),
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    }

});