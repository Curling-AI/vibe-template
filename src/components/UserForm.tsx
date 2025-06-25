import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useUserActions, useUserLoadingStates } from '@/stores/userStore'
import type { User, CreateUserRequest, UpdateUserRequest } from '@/services'

interface UserFormProps {
  user?: User | null
  onSuccess?: () => void
  onCancel?: () => void
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

  const { createUser, updateUser } = useUserActions()
  const { isCreating, isUpdating } = useUserLoadingStates()

  const isEditing = !!user
  const isLoading = isCreating || isUpdating

  // Preencher formulário quando editando
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      })
    } else {
      setFormData({
        name: '',
        email: '',
      })
    }
    setErrors({ name: '', email: '' })
  }, [user])

  const validateForm = () => {
    const newErrors = { name: '', email: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      if (isEditing && user) {
        const updateData: UpdateUserRequest = {}
        if (formData.name !== user.name) updateData.name = formData.name
        if (formData.email !== user.email) updateData.email = formData.email

        if (Object.keys(updateData).length > 0) {
          await updateUser(user.id, updateData)
        }
      } else {
        const createData: CreateUserRequest = {
          name: formData.name,
          email: formData.email,
        }
        await createUser(createData)
      }

      onSuccess?.()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
    }
  }

  const handleInputChange =
    (field: 'name' | 'email') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))

      // Limpar erro quando usuário começar a digitar
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }))
      }
    }

  const handleCancel = () => {
    setFormData({ name: '', email: '' })
    setErrors({ name: '', email: '' })
    onCancel?.()
  }

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange('name')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite o nome do usuário"
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite o email do usuário"
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading
              ? isEditing
                ? 'Salvando...'
                : 'Criando...'
              : isEditing
                ? 'Salvar'
                : 'Criar'}
          </Button>

          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
