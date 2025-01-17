import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import SearchDetails from './pages/detail';
import { Toaster } from './components/ui/toaster';

function App() {

  return (
    <>
    <Toaster />
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/details/:word/:rimaTypeCode' element={<SearchDetails />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
