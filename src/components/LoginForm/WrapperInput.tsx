import type { PropsWithChildren } from "react"

export default function WrapperInput({ children }: PropsWithChildren) {
	return (
		<>
			<div className="col-md-6">
				<div className="card-body p-4 p-md-5">{children}</div>
			</div>
		</>
	)
}
