import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import List from './pages/List';
import './App.css';
import Nav from './components/Nav';
import { useEffect } from 'react';
import appAPI from './utils/API/appAPI';
import SearchPage from './pages/Searh';
import Home from './pages/Home';

const App = () => {

  useEffect(()=>{
    appAPI.getAllRecipes()
  }, [])


  return (
<Router>

    {/* <Nav/> */}
  <Routes>
    <Route element={<Nav />}>
      <Route path='/' element={<Home />} />
    <Route path='recipe-book/:page/' element={<List />}/>
    <Route path='/form' element={<Form />}/>
    <Route path='/search' element={<SearchPage/>} />
    </Route>
  </Routes>
</Router>
  )
}
export default App;