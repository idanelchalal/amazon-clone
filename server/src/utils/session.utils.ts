import Session from '../libs/Schemas/Session'

export const createSession = async (
    email: string,
    name?: string,
    userId?: string
) => {
    const session = new Session({ email, name, userId, valid: true })
    await session.save()

    return session
}
export const invalidateSession = async (sessionId: string) => {
    const session = await Session.findById(sessionId)
    if (session && session.valid) {
        session.valid = false
        await session.save()
    }

    return session
}
export const getSession = async (sessionId: string) => {
    const session = await Session.findById(sessionId)
    return session && session.valid ? session.toObject() : null
}
