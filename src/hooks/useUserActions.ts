import { useState } from "react"
import { usersAPI } from "../api/axios/users-api.ts"
import type { UsersApiType } from "../types/zodTypes.ts"

type NotificationType = {
	message: string
	type: "success" | "error"
}

type ActionType = "block" | "unblock" | "delete"

export const useUserActions = (setUsers: (users: UsersApiType[]) => void) => {
	const [isLoading, setIsLoading] = useState(false)
	const [loadingUsers, setLoadingUsers] = useState<number[]>([])
	const [notification, setNotification] = useState<NotificationType | null>(null)

	const showNotification = (message: string, type: "success" | "error") => {
		setNotification({ message, type })
	}

	const updateUserBlockStatus = async (user: UsersApiType, blocked: boolean) => {
		try {
			return await usersAPI.updateUser(user.id, user.username, user.email, user.password, blocked)
		} catch (error) {
			console.error("Error updating user:", error)
			throw error
		}
	}

	const handleUserAction = async (userId: number[], action: ActionType) => {
		if (!userId.length) {
			showNotification(`Please select users to ${action}`, "error")
			return
		}

		setIsLoading(true)
		setLoadingUsers(userId)
		setNotification(null)

		try {
			for (const id of userId) {
				const userResponse = await usersAPI.getUser(id)
				const user = userResponse.data.data

				if (!user) {
					console.error(`User with id ${id} not found after fetching`)
					continue
				}

				if (action === "delete") {
					await usersAPI.deleteUser(id)
				} else {
					await updateUserBlockStatus(user, action === "block")
				}
			}

			const updatedResponse = await usersAPI.getUsers()
			setUsers(updatedResponse.data.data)
			showNotification(`Users ${action}ed successfully`, "success")
		} catch (error) {
			console.error("Error in handleUserAction:", error)
			showNotification(`Failed to ${action} users. Please try again.`, "error")
		} finally {
			setIsLoading(false)
			setLoadingUsers([])
		}
	}

	const handleBlocked = (userId: number[]) => handleUserAction(userId, "block")
	const handleUnblocked = (userId: number[]) => handleUserAction(userId, "unblock")
	const handleDelete = (userId: number[]) => handleUserAction(userId, "delete")

	return {
		isLoading,
		loadingUsers,
		notification,
		handleBlocked,
		handleUnblocked,
		handleDelete,
	} as const
}
