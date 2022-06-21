import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';

import './styles/global.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
