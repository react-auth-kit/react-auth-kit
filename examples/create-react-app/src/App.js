import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import Routes from './Routes';

function App() {
	return (
		<AuthProvider 
			authStorageType="cookie" 
			authStorageName="_auth_t" 
			authTimeStorageName="_auth_time" 
			stateStorageName="_auth_state" 
			cookieDomain={window.location.hostname} 
			cookieSecure={window.location.protocol === "https:"}>
				<Routes/>
		</AuthProvider>
	);
}

export default App;
