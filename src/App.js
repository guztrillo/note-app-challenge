import { React } from 'react';
import { Header } from "./components/Header";
import { Notes } from "./components/Notes";
import '../src/index.css';
import { ContextProvider } from './context/GlobalContext';


const App = () => {
  return (
    <ContextProvider>
      <main>
        <Header />
        <Notes />
      </main>
    </ContextProvider>
  );
}

export default App;
