import createContextUsers from "./createContext.ts"
import type { UsersApiType } from "../../types/zodTypes"

export type ContextProps = {
	authenticated: boolean
	setAuthenticated: (value: boolean) => void
	users: UsersApiType[]
	setUsers: (users: UsersApiType[]) => void
	userId: number[]
	setUserId: (id: number[]) => void
}

export const [useAppContext, AppContextProvider] = createContextUsers<ContextProps>()
