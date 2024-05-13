import { Providers } from './providers';
import { AppRouter } from './routers';

function App() {
    // window.addEventListener('message', (e) => {
    //     console.log('@App.tsx message', e);
    //
    //     // Use the transferred port to post a message to the main frame
    //     e.ports[0].postMessage("A message from the iframe in page2.html");
    // });

    return (
        <Providers>
            <AppRouter />
        </Providers>
    )
}

export default App
