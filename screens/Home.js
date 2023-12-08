import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from '../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useTheme } from '../themes/ThemeProvider'

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/images/static_background.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', flex: 1 }}
                ></ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    areaStyle: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        ...FONTS.h4,
        marginVertical: 22,
    },
    box: {
        width: 300,
        paddingVertical: 18,
        marginVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxText: {
        ...FONTS.body4,
        textAlign: 'center',
        color: COLORS.white,
    },

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        width: 300,
        paddingVertical: SIZES.padding * 2,
    },
    btnText: {
        ...FONTS.body3,
        color: COLORS.white,
        marginLeft: 8,
    },
})
export default Home
