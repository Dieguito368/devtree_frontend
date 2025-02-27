import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <Link to='/'>
            <img src="/logo.svg" alt='Logotipo' className="w-2xs block mx-auto" />
        </Link>
    )
}

export default Logo;