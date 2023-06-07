import './App.css';
import Alert from './components/Alert';
import Editor from './components/Editor';
import Navbar from './components/Navbar';

import CodeState from './context/CodeState';

function App() {
  return (
    <CodeState>
        <Navbar />
        <Alert />
        <Editor />
    </CodeState>
  );
}

export default App;
