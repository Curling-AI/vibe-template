import { Button } from '@/components/ui/button'
import { useUserActions, useUserLoadingStates } from '@/stores/userStore'
import type { User } from '@/services'

interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
  onSelect?: (user: User) => void
  isSelected?: boolean
}

export function UserCard({ user, onEdit, onSelect, isSelected = false }: UserCardProps) {
  const { deleteUser } = useUserActions()
  const { isDeleting } = useUserLoadingStates()

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${user.name}?`)) {
      await deleteUser(user.id)
    }
  }

  const handleEdit = () => {
    onEdit?.(user)
  }

  const handleSelect = () => {
    onSelect?.(user)
  }

  return (
    <div
      className={`p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">{user.name}</h3>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
          <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 ml-4">
          {onSelect && (
            <Button
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={handleSelect}
              className="text-xs"
            >
              {isSelected ? 'Selecionado' : 'Selecionar'}
            </Button>
          )}

          {onEdit && (
            <Button variant="outline" size="sm" onClick={handleEdit} className="text-xs">
              Editar
            </Button>
          )}

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs"
          >
            {isDeleting ? 'Deletando...' : 'Deletar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
