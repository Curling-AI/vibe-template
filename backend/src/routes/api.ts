import { Router, Request, Response } from 'express'

const router = Router()

// Exemplo de dados mock
const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com' },
]

// GET /users - Listar usuários (com suporte a filtros)
router.get('/users', (req: Request, res: Response) => {
  const { name, email, page = '1', limit = '10' } = req.query

  let filteredUsers = [...mockUsers]

  // Filtrar por nome (busca parcial, case-insensitive)
  if (name && typeof name === 'string') {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  // Filtrar por email (busca parcial, case-insensitive)
  if (email && typeof email === 'string') {
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(email.toLowerCase()),
    )
  }

  // Paginação básica
  const pageNum = parseInt(page as string) || 1
  const limitNum = parseInt(limit as string) || 10
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  res.json({
    data: paginatedUsers,
    total: filteredUsers.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(filteredUsers.length / limitNum),
    message: 'Usuários listados com sucesso',
  })
})

// GET /users/stats - Estatísticas dos usuários (deve vir antes de /:id)
router.get('/users/stats', (req: Request, res: Response) => {
  const totalUsers = mockUsers.length
  const emailDomains = mockUsers.reduce(
    (acc, user) => {
      const domain = user.email.split('@')[1]
      acc[domain] = (acc[domain] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const mostCommonDomain = Object.entries(emailDomains).sort(([, a], [, b]) => b - a)[0]

  res.json({
    data: {
      totalUsers,
      emailDomains,
      mostCommonDomain: mostCommonDomain
        ? {
            domain: mostCommonDomain[0],
            count: mostCommonDomain[1],
          }
        : null,
      averageNameLength:
        totalUsers > 0
          ? Math.round(mockUsers.reduce((sum, user) => sum + user.name.length, 0) / totalUsers)
          : 0,
    },
    message: 'Estatísticas obtidas com sucesso',
  })
})

// GET /users/:id - Obter usuário por ID
router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const user = mockUsers.find((u) => u.id === id)

  if (!user) {
    res.status(404).json({
      error: { message: 'Usuário não encontrado' },
    })
    return
  }

  res.json({
    data: user,
    message: 'Usuário encontrado com sucesso',
  })
})

// POST /users - Criar usuário
router.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body

  if (!name || !email) {
    res.status(400).json({
      error: { message: 'Nome e email são obrigatórios' },
    })
    return
  }

  // Verificar se email já existe
  const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    res.status(409).json({
      error: { message: 'Já existe um usuário com este email' },
    })
    return
  }

  const newUser = {
    id: Math.max(...mockUsers.map((u) => u.id), 0) + 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
  }

  mockUsers.push(newUser)

  res.status(201).json({
    data: newUser,
    message: 'Usuário criado com sucesso',
  })
})

// PUT /users/:id - Atualizar usuário
router.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  const userIndex = mockUsers.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    res.status(404).json({
      error: { message: 'Usuário não encontrado' },
    })
    return
  }

  const currentUser = mockUsers[userIndex]

  // Validar dados se fornecidos
  if (name !== undefined && (!name || typeof name !== 'string' || !name.trim())) {
    res.status(400).json({
      error: { message: 'Nome deve ser uma string não vazia' },
    })
    return
  }

  if (email !== undefined) {
    if (!email || typeof email !== 'string' || !email.trim()) {
      res.status(400).json({
        error: { message: 'Email deve ser uma string não vazia' },
      })
      return
    }

    // Verificar se o novo email já existe em outro usuário
    const emailLower = email.trim().toLowerCase()
    const existingUser = mockUsers.find((u) => u.id !== id && u.email.toLowerCase() === emailLower)
    if (existingUser) {
      res.status(409).json({
        error: { message: 'Já existe outro usuário com este email' },
      })
      return
    }
  }

  // Atualizar apenas os campos fornecidos
  const updatedUser = {
    ...currentUser,
    ...(name !== undefined && { name: name.trim() }),
    ...(email !== undefined && { email: email.trim().toLowerCase() }),
  }

  mockUsers[userIndex] = updatedUser

  res.json({
    data: updatedUser,
    message: 'Usuário atualizado com sucesso',
  })
})

// DELETE /users/:id - Deletar usuário
router.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const userIndex = mockUsers.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    res.status(404).json({
      error: { message: 'Usuário não encontrado' },
    })
    return
  }

  const deletedUser = mockUsers[userIndex]
  mockUsers.splice(userIndex, 1)

  res.json({
    data: deletedUser,
    message: 'Usuário deletado com sucesso',
  })
})

export { router as apiRouter }
