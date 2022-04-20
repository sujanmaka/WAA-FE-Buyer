import './App.css';
import MainContainer from './Buyer/container/mainContainer';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  );
}

export default App;
