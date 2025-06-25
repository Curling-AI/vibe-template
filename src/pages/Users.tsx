import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/UserCard'
import { UserForm } from '@/components/UserForm'
import { useUsers, useSelectedUser, useUserActions, useUserLoadingStates } from '@/stores/userStore'
import type { User } from '@/services'

type ViewMode = 'list' | 'create' | 'edit'

export function Users() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [searchTerm, setSearchTerm] = useState('')

  // Estado da store
  const { users, total, error, lastUpdated } = useUsers()
  const { selectedUser, selectUser } = useSelectedUser()
  const { fetchUsers, clearError, searchUsers } = useUserActions()
  const { isLoading } = useUserLoadingStates()

  // Buscar usuários na montagem do componente
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Filtrar usuários localmente baseado no termo de busca
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUsers({
        name: searchTerm.includes('@') ? undefined : searchTerm,
        email: searchTerm.includes('@') ? searchTerm : undefined,
      })
    } else {
      await fetchUsers()
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCreateUser = () => {
    selectUser(null)
    setViewMode('create')
  }

  const handleEditUser = (user: User) => {
    selectUser(user)
    setViewMode('edit')
  }

  const handleSelectUser = (user: User) => {
    selectUser(selectedUser?.id === user.id ? null : user)
  }

  const handleFormSuccess = () => {
    setViewMode('list')
    selectUser(null)
  }

  const handleFormCancel = () => {
    setViewMode('list')
    selectUser(null)
  }

  const handleRefresh = () => {
    fetchUsers()
  }

  const renderListView = () => (
    <div className="space-y-6">
      {/* Header e controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-sm text-gray-500">
            {total > 0 && `${filteredUsers.length} de ${total} usuários`}
            {lastUpdated && ` • Atualizado ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Atualizar'}
          </Button>
          <Button onClick={handleCreateUser}>Novo Usuário</Button>
        </div>
      </div>

      {/* Busca */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSearch} disabled={isLoading} variant="outline">
          Buscar
        </Button>
        {searchTerm && (
          <Button
            onClick={() => {
              setSearchTerm('')
              fetchUsers()
            }}
            variant="outline"
          >
            Limpar
          </Button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-800">{error}</p>
            <Button variant="outline" size="sm" onClick={clearError}>
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de usuários */}
      {isLoading && users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando usuários...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm ? 'Nenhum usuário encontrado para a busca.' : 'Nenhum usuário cadastrado.'}
          </p>
          {!searchTerm && (
            <Button onClick={handleCreateUser} className="mt-4">
              Criar primeiro usuário
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onSelect={handleSelectUser}
              isSelected={selectedUser?.id === user.id}
            />
          ))}
        </div>
      )}

      {/* Usuário selecionado */}
      {selectedUser && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Usuário Selecionado</h3>
          <div className="text-sm text-blue-800">
            <p>
              <strong>Nome:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => handleEditUser(selectedUser)}>
              Editar
            </Button>
            <Button size="sm" variant="outline" onClick={() => selectUser(null)}>
              Desmarcar
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  const renderFormView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setViewMode('list')}>
          ← Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {viewMode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
        </h1>
      </div>

      <div className="max-w-md">
        <UserForm
          user={viewMode === 'edit' ? selectedUser : null}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {viewMode === 'list' ? renderListView() : renderFormView()}
    </div>
  )
}
