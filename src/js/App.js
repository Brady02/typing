import '../css/App.css';
import TypingWindow from './typingWindow';
import {useState} from "react";

function App() {
  const [testComplete, setTestComplete] = useState(false);
  const displayThings = () => {
    
  }
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <div>
        {displayThings}
      </div>
      <TypingWindow>
      </TypingWindow>

      <footer>
        
      </footer>
    </div>
  );
}

export default App;
