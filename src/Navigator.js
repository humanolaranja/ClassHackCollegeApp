import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Details from './screens/Details';
import Create from './screens/Create';
import Delete from './screens/Delete';
import Edit from './screens/Edit';

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
        Create: {
            screen: Create,
        },
        Edit: {
            screen: Edit,
        },
        Delete: {
            screen: Delete,
        },
    },
    {
        initialRouteName: 'Login',
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
