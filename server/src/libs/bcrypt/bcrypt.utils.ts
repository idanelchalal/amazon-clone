import bcrypt from 'bcrypt'

export async function bcryptHash(instance: string) {
    return await bcrypt.hash(instance, 12)
}
export async function bcryptCompare(plainData: string, encryptedData: string) {
    return await bcrypt.compare(plainData, encryptedData)
}
