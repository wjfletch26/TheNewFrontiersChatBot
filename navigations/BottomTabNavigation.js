import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { Chat, Home, Profile, Saved } from '../screens'
import { useTheme } from '../themes/ThemeProvider'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    const { colors } = useTheme()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: true,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: 60,
                    backgroundColor: 'transparent',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) return
                        else {
                            return (
                                <Ionicons
                                    name="home"
                                    size={24}
                                    color="transparent"
                                />
                            )
                        }
                    },
                }}
            />

            <Tab.Screen
                name="Chat With Whippy"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) return
                        else {
                            return (
                                <Image
                                    style={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: '50%',
                                        marginBottom: 70,
                                    }}
                                    source={require('../assets/images/whippy.png')}
                                />
                            )
                        }
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
