import { FC } from 'react'
import { Link } from 'react-router-dom'

interface SecondaryMenuLinkProps {
    children?: React.ReactNode
    to: string
}

const SecondaryMenuLink: FC<SecondaryMenuLinkProps> = ({ to, children }) => {
    return (
        <li className="bg-secondary-navy hover:bg-[#2e3d52] h-full flex items-center p-2">
            <Link to={to}>{children}</Link>
        </li>
    )
}

export default SecondaryMenuLink
