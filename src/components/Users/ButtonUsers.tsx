import type { ReactNode } from "react"

export default function ButtonUsers({ children, className }: Props) {
	return (
		<>
			<button type="button" className={className}>
				{children}
			</button>
		</>
	)
}

type Props = {
	children: ReactNode
	className: string
}
