import React, { Component } from 'react'
import ActionBar from 'react-native-action-bar';
import { Text, View, Image, TouchableNativeFeedback, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'

class Details extends Component {
    render() {

        const { navigation } = this.props;
        const item = navigation.getParam('details', 'No-Details');

        return (
            <View>

                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor="#000000"
                    title="Details" />
                <View style={styles.detailsContainer}>
                    <Text style={styles.author}>
                        {item.description}
                    </Text>
                    <View style={styles.detailsContainerInner}>
                        <View style={styles.circleOuter}>
                            <View style={[styles.circle, { backgroundColor: item.languageColor }]} />
                        </View>
                        <Text style={[styles.author, { marginStart: 4 }]}>
                            {item.language}
                        </Text>
                        <Image source={require('../public/images/star.png')} alt='stars' style={styles.detailsImages} />
                        <Text style={[styles.author, { marginStart: 4 }]}>
                            {item.stars}
                        </Text>
                        <Image source={require('../public/images/fork.png')} alt='forks' style={styles.detailsImages} />
                        <Text style={[styles.author, { marginStart: 4 }]}>
                            {item.forks}
                        </Text>
                    </View>
                </View>
            </View>

        )
    }
}
export default Details

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginStart: 16
    },
    author: {
        fontFamily: 'roboto_regular',
        fontSize: 12,
        color: '#52575C'
    },
    name: {
        fontFamily: 'roboto_medium',
        fontSize: 15,
        color: '#52575C'
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        borderColor: '#fff',
        borderWidth: 1
    },
    detailsContainer: {
        padding: 16,
        flexDirection: 'column'
    },
    detailsContainerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    circleOuter: {
        padding: 6
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2
    },
    detailsImages: {
        width: 16,
        height: 16,
        marginStart: 16
    },
    moreBtn: {
        width: 60,
        height: 30,
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: 4,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})