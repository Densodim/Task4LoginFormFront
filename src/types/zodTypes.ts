import { z } from "zod"

export const Users = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
	password: z.string().min(3),
	created_at: z.string(),
	blocked: z.union([z.literal(0), z.literal(1)]),
	last_login: z.string(),
})

export type UsersApiType = z.infer<typeof Users>
