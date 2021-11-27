import React from "react";
import { StoreProvider } from "./Components/Store";
import TaskForm from "./Components/Task/TaskForm";
import TaskList from "./Components/Task/TaskList";

function App() {
  return <div className= "container text-center">
      <StoreProvider>
        <TaskForm />
        <TaskList />
    </StoreProvider>
  </div>
  
}

export default App;