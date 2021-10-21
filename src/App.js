import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './Router';
import './scss/style.scss';
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
