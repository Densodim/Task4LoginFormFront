import { createContext, type Provider, useContext } from "react"

export default function createContextUsers<Props extends object>() {
	const ctx = createContext<Props | undefined>(undefined)

	function useInnerCtx() {
		const c = useContext(ctx)
		if (c === undefined) {
			throw new Error("Context must be consumed without a Provider")
		}
		return c
	}

	return [useInnerCtx, ctx.Provider as Provider<Props>] as const
}
