import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import NotFound from './components/NotFound';
import PersonalTrainer from './components/PersonalTrainer';
import Statistics from './components/Statistics';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navigation'>
          <Link to="/">Home</Link>{' '}
          <Link to="/customers">Customer List</Link>{' '}
          <Link to="/trainings">Training List</Link>{' '}
          <Link to="/personaltrainer">Personal Trainer</Link>
          <Link to="/statistics">Statistics</Link>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/personaltrainer" element={<PersonalTrainer />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
