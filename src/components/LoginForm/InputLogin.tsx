export default function InputLogin({ placeholder, value, className, type, onChange }: Props) {
	return (
		<>
			<div className="mb-3">
				<label htmlFor={value} className="form-label">
					{value}
				</label>
				<div className="input-group">
					<input
						type={type}
						className={className}
						placeholder={placeholder}
						required
						onChange={onChange}
					/>
				</div>
			</div>
		</>
	)
}

type Props = {
	value: string
	type: "text" | "password" | "checkbox"
	placeholder?: string
	className: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
