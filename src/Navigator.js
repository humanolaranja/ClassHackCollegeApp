import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Details from './screens/Details';

const StackNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        Home: {
            screen: Home,
        },
        Details: {
            screen: Details,
        },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        defaultNavigationOptions: () => {
            return {
                headerVisible: false,
            };
        },
    },
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
