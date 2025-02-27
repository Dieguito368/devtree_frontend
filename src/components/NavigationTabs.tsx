import { ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'

const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => navigate(e.target.value) 

    return (
        <div className='mb-5'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>

                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
                    onChange={ handleChange }
                >
                    {
                        tabs.map(tab=> (
                            <option
                                value={ tab.href }
                                key={ tab.name }
                            >{ tab.name }</option>
                        ))
                    }
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {
                            tabs.map(tab => (
                                <Link
                                    key={ tab.name }
                                    to={ tab.href }
                                    className={
                                        classNames(
                                            location.pathname === tab.href
                                                ? 'border-cyan-400 text-cyan-400 font-bold'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                                        )
                                    }
                                >
                                    <tab.icon
                                        className={
                                            classNames(
                                                location.pathname === tab.href ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-500 transition-colors',
                                                '-ml-0.5 mr-2 h-5 w-5'
                                            )
                                        }
                                        aria-hidden="true"
                                    />

                                    <span>{ tab.name }</span>
                                </Link>
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}