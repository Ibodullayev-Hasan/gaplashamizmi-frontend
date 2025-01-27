import React from 'react'
import { useState } from 'react'
import './App.css'
import UsersSection from './components/users_section/Users.section'
import TypingSection from './components/typing_section/Typing.section'
import ToolsSection from './components/tools_section/Tools.section'

function App() {

  return (
    <div className='box'>
      <UsersSection/>
      <TypingSection/>
      <ToolsSection/>
    </div>
  )
}

export default App
