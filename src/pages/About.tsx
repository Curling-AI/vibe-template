// This is a example page, you can remove it if you don't need it

import { Link } from 'react-router-dom'
import { useClicks } from '@/stores'

function About() {
  const { clicks } = useClicks()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Sobre Nós</h1>
      </div>

      <div className="space-y-6 text-left">
        <p className="text-lg text-muted-foreground">Esta é a página sobre nós!</p>

        <p className="text-lg text-muted-foreground">Total de cliques: {clicks}</p>

        <p className="text-base leading-relaxed">
          Aqui você pode encontrar informações sobre nossa aplicação construída com:
        </p>

        <ul className="list-disc list-inside space-y-2 text-base ml-4">
          <li>React 19</li>
          <li>TypeScript</li>
          <li>Vite</li>
          <li>React Router</li>
          <li>Tailwind CSS 3</li>
          <li>Tema Dark/Light</li>
          <li>Radix UI Components</li>
          <li>Zustand</li>
        </ul>

        <div className="pt-8 border-t border-border">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
