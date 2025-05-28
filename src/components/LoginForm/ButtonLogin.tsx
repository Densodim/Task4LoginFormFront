export default function ButtonLogin({ className, type, value }: Props) {
	return (
		<>
			<div className="d-grid gap-2 mb-3">
				<button type={type} className={className}>
					{value}
				</button>
			</div>
		</>
	)
}

type Props = {
	className: string
	value: string
	type: "submit"
}
