import Board from "./Board";
import './App.css';

function App() {
  return (
    <div className="App">
      <Board nrows={5} ncols={5} chanceLightStartsOn={0.25} />
    </div>
  );
}

export default App;
