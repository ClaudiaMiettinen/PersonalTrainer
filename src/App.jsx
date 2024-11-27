import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
  } from "react-router-dom";
//recharts

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6">
            Customers
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
<Link to="/CustomerList">CustomerList</Link>{' '}
<Link to="/TrainingList">TrainingList</Link>{' '}
<Routes>
<Route exact path="/CustomerList" element={<CustomerList />} />
<Route path="/TrainingList" element={<TrainingList />} />
</Routes>
</BrowserRouter>
      
      
      
    </div>
  );
}

export default App;