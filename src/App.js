
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import ListTask from "./components/TaskList";

function App() {
  return (
    <div className="App">
     <Header/>
     <AddTask/>
     <ListTask/>
    </div>
  );
}

export default App;
