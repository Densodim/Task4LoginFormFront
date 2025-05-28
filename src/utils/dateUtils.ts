import { format } from "date-fns"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

export const formatRelativeTime = (dateString: string): string => {
	try {
		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			return "Invalid date"
		}
		return formatDistanceToNow(date, { addSuffix: true })
	} catch (error) {
		console.error("Error formatting date:", error)
		return "Invalid date"
	}
}

export const formatExactTime = (dateString: string): string => {
	try {
		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			return "Invalid date"
		}
		return format(date, "MMMM dd, yyyy HH:mm:ss")
	} catch (error) {
		console.error("Error formatting date:", error)
		return "Invalid date"
	}
}
