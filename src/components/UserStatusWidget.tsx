import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useUsers, useUserActions, useUserLoadingStates } from '@/stores/userStore'

export function UserStatusWidget() {
  const { users, total, error } = useUsers()
  const { fetchUsers } = useUserActions()
  const { isLoading } = useUserLoadingStates()

  useEffect(() => {
    // Fazer fetch inicial dos usuários
    fetchUsers()
  }, [fetchUsers])

  if (isLoading && users.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Status dos Usuários</h3>
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Status dos Usuários</h3>
        <p className="text-red-500 mb-3">Erro: {error}</p>
        <Button size="sm" variant="outline" onClick={fetchUsers} disabled={isLoading}>
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-medium mb-2">Status dos Usuários</h3>

      {total === 0 ? (
        <div>
          <p className="text-gray-500 mb-3">Nenhum usuário cadastrado</p>
          <Link to="/users">
            <Button size="sm">Cadastrar primeiro usuário</Button>
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {total} usuário{total !== 1 ? 's' : ''} cadastrado{total !== 1 ? 's' : ''}
          </p>

          {users.slice(0, 3).map((user) => (
            <div key={user.id} className="text-sm text-gray-500 mb-1">
              • {user.name}
            </div>
          ))}

          {total > 3 && (
            <div className="text-sm text-gray-400 mb-3">
              e mais {total - 3} usuário{total - 3 !== 1 ? 's' : ''}...
            </div>
          )}

          <Link to="/users">
            <Button size="sm" variant="outline">
              Gerenciar usuários
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
