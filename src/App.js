import './App.css';
import Sidebar from "./components/Sidebar"
import TaskTable from './components/TaskTable';
import CalendarPage from './components/CalendarPage';
import AddTask from './components/AddTask'
import {BrowserRouter,Routes,Route } from 'react-router-dom';



function App() {
 
  return (

    
   
    <BrowserRouter>
   
    <div className="flex">
      <Sidebar/>
    
      <Routes>
          <Route path="/" element={<TaskTable/>}/>
          <Route path="/add" element={<AddTask/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
        </Routes>
      
    </div>
 
 
    </BrowserRouter>
  );
}

export default App;
