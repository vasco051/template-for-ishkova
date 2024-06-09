import {BrowserRouter} from 'react-router-dom';

import {Routing} from './routing';
import {StoreProvider} from 'components/logic/store-provider';

import {staticLinks} from 'config/routingLinks.ts';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={staticLinks.main}>
        <Routing/>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
