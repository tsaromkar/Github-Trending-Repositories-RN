import React, { Component } from 'react'
import ActionBar from 'react-native-action-bar';
import { Text, View, Image, TouchableNativeFeedback, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

class List extends Component {
    state = {
        data: [],
        prev: -1
    }

    componentDidMount = () => {
        fetch('https://private-anon-04b9042c5a-githubtrendingapi.apiary-mock.com/repositories', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data: responseJson.map((item, index) => ({ ...item, visible: false, uniqueId: index + 1 }))
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>

                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor="#000000"
                    title="Trending" />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'column' }}>

                            <TouchableNativeFeedback
                                onPress={() => {
                                    let data = [...this.state.data];
                                    let prev = this.state.prev;
                                    if (prev != -1 && prev != index) {
                                        data[index] = { ...data[index], visible: !item.visible };
                                        data[prev] = { ...data[prev], visible: false };
                                        prev = index
                                        this.setState({ data, prev });
                                    } else {
                                        data[index] = { ...data[index], visible: !item.visible };
                                        prev = index
                                        this.setState({ data, prev });
                                    }
                                }}>
                                <View
                                    key={item.uniqueId}
                                    style={styles.container}>
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: item.avatar }} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.author}>
                                            {item.author}
                                        </Text>
                                        <Text style={styles.name}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.submitContainer}
                                        onPress={() => this.props.navigation.navigate('Details', { details: item })}>
                                        <Text style={styles.moreBtn}>
                                            More
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableNativeFeedback>

                            {
                                item.visible &&
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
                            }

                            <View style={{
                                borderBottomColor: '#E8E8E8',
                                borderBottomWidth: 1,
                            }} />

                        </View >
                    }
                />
            </View >

        )
    }
}
export default List

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
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#52575C'
    },
    name: {
        fontFamily: 'Roboto-Medium',
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
        paddingTop: 0,
        paddingStart: 64,
        paddingBottom: 16,
        paddingEnd: 16,
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
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    submitContainer:{
        flexDirection:'row',
        width: 60,
        height: 30,
        backgroundColor: '#000000',
        borderRadius: 4,
        alignItems:'center',
        justifyContent:'center',
    }
})