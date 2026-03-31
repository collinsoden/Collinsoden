import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-zinc-950 text-zinc-100'
        : 'bg-zinc-50 text-zinc-900'
    }`}>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
