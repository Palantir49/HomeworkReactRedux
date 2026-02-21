import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomePageComponent } from './components/HomePageComponent'
import { LoginComponent } from './components/LoginComponent'
import { RegisterComponent } from './components/RegisterComponent'
import { NotFoundComponent } from './components/NotFoundComponent'
import ResponsiveAppBar from './components/NavBar'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {
  
  return (
    <>
      <Provider store = {store}>
      <ResponsiveAppBar/>
      <Routes>
      <Route path = "/" element = {<HomePageComponent/>} />
      <Route path = "Login" element = {<LoginComponent/>}/>
      <Route path = "Register" element = {<RegisterComponent/>}/>
      <Route path = "*" element = {<NotFoundComponent/>}/>
      </Routes>
      </Provider>
    </>
  )
}

export default App
