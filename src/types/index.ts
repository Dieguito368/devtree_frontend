export type User = {
    id: string
    name: string
    email: string
    handle: string
    description: string
    image: string
    links: string
}

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
    isValidUrl: boolean
}


export type UserRegistrationForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    password_confirmation: string
}

export type UserLoginFormData = Pick<User, 'email'> & {
    password: string
}

export type UserProfileFormData = Pick<User, 'handle' | 'description'>

export type UserHandle = Pick<User, 'name' | 'handle' | 'description' | 'image' | 'links'> 

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled' | 'isValidUrl'>