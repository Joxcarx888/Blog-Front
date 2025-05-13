import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListPublications } from './Components/Publications';
import { PublicationDetail } from './Components/PublicationDetails';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPublications />} />
        <Route path="/publication/:id" element={<PublicationDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
