// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import BookingDetails from './components/BookingDetails';
import GuestList from './components/GuestList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <Routes>
              <Route path="/" element={<BookingForm />} />
              <Route path="/bookings" element={<BookingDetails />} />
              <Route path="/guests" element={<GuestList />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;