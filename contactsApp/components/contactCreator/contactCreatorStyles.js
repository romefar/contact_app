import { StyleSheet, PixelRatio } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: { 
        paddingTop: 10
    },  
    viewBorder : { 
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    error: { 
        borderColor: 'red'
    },
    input: {    
        height: 40,
        borderColor: 'rgba(247,247,247,1.0)',
        borderWidth: 2,
        paddingLeft: 5,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    topLeft: { 
        width: 10,
        height: 10,
        position: "absolute",
        top: 50,
        right: 50
    }, 
    doneButton: { 
        color: "rgb(0, 122, 255)",
    },
    label: { 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
        textTransform: "capitalize",
        color: '#3282f3'
    }
});