import './App.css'
import { useTheme } from './theme/ThemeContext'
import MainLayout from './layouts/MainLayout'

function App() {
  const { isDarkTheme } = useTheme()
  return (
    <div className={`App ${isDarkTheme ? 'darkTheme' : ''}`}>
      <MainLayout />
    </div>
  )
}

export default App
