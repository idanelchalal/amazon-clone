import { FC } from 'react'

interface ListsComponentProps {
    title?: string
    options: string[]
    id?: string
}

const ListsComponent: FC<ListsComponentProps> = ({ options, title, id }) => {
    return (
        <ul id={`${id}-menu-id`} className="list-none space-y-1">
            <h1 className="text-lg font-semibold mb-2">{title}</h1>
            {options.map((option) => (
                <li className="text-zinc-100 text-sm">{option}</li>
            ))}
        </ul>
    )
}

export default ListsComponent
