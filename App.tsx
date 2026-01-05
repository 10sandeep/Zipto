import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import './src/i18n'; // Init i18n
import RootNavigator from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
