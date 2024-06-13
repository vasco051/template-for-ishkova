import {BrowserRouter} from 'react-router-dom';

import {Routing} from './routing';
import {Header} from 'components/layouts';
import {StoreProvider} from 'components/logic/store-provider';

import {staticLinks} from 'config/routingLinks.ts';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={staticLinks.main}>
        <Header/>
        <Routing/>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
