import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SocialNetwork } from "../types"

type DevTreeLinkProps = {
    link: SocialNetwork
}

const DevTreeLink = ({ link } : DevTreeLinkProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: link.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li 
            className="bg-white px-5 py-2 flex items-center text-center gap-5 rounded-lg animate__animated animate__fadeIn"
            ref={ setNodeRef}
            style={ style }
            { ...attributes }
            { ...listeners }
        >
            <div 
                className='w-12 h-12 bg-cover'
                style={{
                    backgroundImage: `url('/social/icon_${link.name}.svg')`
                }}
            ></div>
            <p className="text-sm">Visita mi: <span className="capitalize text-base font-black">{ link.name }</span></p>
        </li>
    )
}

export default DevTreeLink;