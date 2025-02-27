import { ReactNode } from "react"
import { CheckCircle, CircleAlert } from "lucide-react"

type MessageProps = {
    children: ReactNode
    status: "error" | "success"
}
const Message = ({ children, status } : MessageProps) => {
    const messageConfig = {
        error: {
            bg: {
                light: "bg-red-100",
                dark: "bg-red-700"
            },
            text: "text-red-700",
            icon: <CircleAlert width={ 15 } className='text-red-700' strokeWidth={ 3 } />
        },
        success: {
            bg: {
                light: "bg-green-100",
                dark: "bg-green-700"
            },
            text: "text-green-700",
            icon: <CheckCircle width={ 15 } className='text-green-700' strokeWidth={ 3 } />
        }
    }

    return (
        <div className={ `${messageConfig[status].bg.light} flex items-center gap-2 px-2 py-3 rounded animate__animated animate__fadeIn` }>
            <div className={ `${messageConfig[status].bg} text-white w-5 h-5 rounded flex items-center justify-center` }>
                { messageConfig[status].icon }
            </div>
            <p className={ `${messageConfig[status].text} font-bold text-sm` }>{ children }</p>
        </div>
    )
}

export default Message;