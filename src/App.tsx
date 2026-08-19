import {TokenStoreProvider} from './theme/tokenStore';
import {Workbench} from './workbench/Workbench';

export function App() {
	return (
		<TokenStoreProvider>
			<Workbench />
		</TokenStoreProvider>
	);
}
