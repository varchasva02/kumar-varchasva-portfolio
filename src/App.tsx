import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import TechMarquee from './sections/TechMarquee'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import WhatIBuild from './sections/WhatIBuild'
import CurrentlyLearning from './sections/CurrentlyLearning'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Main content */}
      <div className="relative overflow-x-clip">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <WhatIBuild />
          <CurrentlyLearning />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
