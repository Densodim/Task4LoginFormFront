import type { PropsWithChildren } from "react"

export default function WrapperLoginForm({ children }: PropsWithChildren) {
	return (
		<>
			<div className="container d-flex align-items-center justify-content-center min-vh-100">
				<div className="card shadow-lg w-100">
					<div className="row g-0">{children}</div>
				</div>
			</div>
		</>
	)
}
