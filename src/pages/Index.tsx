import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Index() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-row gap-4 justify-center items-center mb-8">
        <a href="https://vite.dev" target="_blank">
          <img 
            src={viteLogo} 
            className="h-24 p-6 will-change-auto transition-all duration-300 hover:drop-shadow-glow-blue" 
            alt="Vite logo" 
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img 
            src={reactLogo} 
            className="h-24 p-6 will-change-auto transition-all duration-300 hover:drop-shadow-glow-cyan motion-safe:animate-spin-slow" 
            alt="React logo" 
          />
        </a>
      </div>
      
      <h1 className="mb-8">Vite + React</h1>
      
      <div className="p-8 mb-8">
        <Button variant="outline" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p className="mt-4">
          Edit <code className="font-mono bg-muted px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="mt-8">
        <Link 
          to="/about" 
          className="text-primary-light dark:text-primary-dark no-underline text-lg hover:text-primary-dark dark:hover:text-primary-light transition-colors"
        >
          Ir para a página Sobre →
        </Link>
      </div>
      
      <p className="text-muted-light dark:text-muted-dark mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Index 