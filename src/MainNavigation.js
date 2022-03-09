import List from './List'
import Details from './Details';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const screens = {
    List: {
        screen: List
    },
    Details: {
        screen: Details
    }
}

const config = {
    headerMode: 'none',
    initialRouteName: 'List'
}

const MainNavigator = createStackNavigator(screens, config);
export default createAppContainer(MainNavigator);