import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
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
