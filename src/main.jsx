import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListPublications } from './Components/Publications';
import { PublicationDetail } from './Components/PublicationDetails';
import { Toaster } from 'react-hot-toast';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<ListPublications />} />
          <Route path="/publication/:id" element={<PublicationDetail />} />
        </Routes>
      </>
    </BrowserRouter>
  </StrictMode>
);
