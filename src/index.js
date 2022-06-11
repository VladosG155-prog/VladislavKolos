import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { client } from './apolloClient/client';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Provider>
	</BrowserRouter>,
);
