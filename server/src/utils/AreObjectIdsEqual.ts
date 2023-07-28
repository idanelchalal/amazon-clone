import mongoose, { isValidObjectId } from 'mongoose'

export default function AreObjectIdsEqual(
    id1: string | mongoose.Types.ObjectId | undefined,
    id2: string | mongoose.Types.ObjectId | undefined
) {
    const areValidObjectIds = isValidObjectId(id1) && isValidObjectId(id2)
    if (areValidObjectIds) {
        const parsedId1 = typeof id1 === 'string' ? id1 : id1?.toString()
        const parsedId2 = typeof id2 === 'string' ? id2 : id2?.toString()

        return parsedId1 === parsedId2
    }
    return false
}
