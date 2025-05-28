import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../api/context/context"
import { usersAPI } from "../api/axios/users-api"

const handleAuthError = (
	navigate: ReturnType<typeof useNavigate>,
	setAuthenticated: (value: boolean) => void,
) => {
	localStorage.removeItem("token")
	setAuthenticated(false)
	navigate("/login")
}

const validateToken = (token: string): number | null => {
	try {
		const tokenParts = token.split(".")
		if (tokenParts.length !== 3) {
			return null
		}

		const payload = JSON.parse(atob(tokenParts[1]))
		return payload.id || null
	} catch {
		return null
	}
}

const checkUserStatus = async (userId: number): Promise<boolean> => {
	try {
		const response = await usersAPI.getUser(userId)
		const userData = response.data.data
		return !!(userData && !userData.blocked)
	} catch {
		return false
	}
}

export const useAuthCheck = () => {
	const navigate = useNavigate()
	const { setAuthenticated, setUsers } = useAppContext()

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("token")
			if (!token) {
				return handleAuthError(navigate, setAuthenticated)
			}

			const userId = validateToken(token)
			if (!userId) {
				return handleAuthError(navigate, setAuthenticated)
			}

			const isUserValid = await checkUserStatus(userId)
			if (!isUserValid) {
				return handleAuthError(navigate, setAuthenticated)
			}

			try {
				const usersResponse = await usersAPI.getUsers()
				setUsers(usersResponse.data.data)
				setAuthenticated(true)
			} catch (error) {
				console.error("Failed to load users:", error)
				return handleAuthError(navigate, setAuthenticated)
			}
		}

		checkAuth()
	}, [navigate, setAuthenticated, setUsers])
}
