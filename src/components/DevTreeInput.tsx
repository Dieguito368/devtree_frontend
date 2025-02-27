import { Switch } from '@headlessui/react';
import { classNames } from '../utils';
import { DevTreeLink, SocialNetwork } from '../types';
import { ChangeEvent } from 'react';
import Message from './Message';

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleEnabledChange: (SocialNetwork: SocialNetwork['name']) => void
}

const DevTreeInput = ({ item, handleUrlChange, handleEnabledChange } : DevTreeInputProps) => {
    return (
        <div className='bg-white shadow-sm p-5 animate__animated animate__fadeIn'>
            <div className='flex items-center gap-3'>
                <div 
                    className='w-12 h-12 bg-cover'
                    style={{
                        backgroundImage: `url('/social/icon_${item.name}.svg')`
                    }}
                ></div>

                <input 
                    type="text" 
                    className={ `flex-1 border-slate-200 outline-slate-400 p-2 border-2 rounded placeholder-slate-400 text-sm disabled:bg-slate-200 disabled:cursor-not-allowed ` }
                    value={ item.url }
                    id={ item.name }
                    onChange={ handleUrlChange }
                    disabled={ item.enabled }
                    placeholder='https://'
                />

                <Switch
                    checked={ item.enabled }
                    onChange={ () => handleEnabledChange(item.name) }
                    className={
                            classNames(
                            item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        )
                    }
                    disabled={  !item.isValidUrl }
                >
                    <span
                        aria-hidden="true"
                        className={
                            classNames(
                                item.enabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                            )
                        }
                    />
                </Switch>
            </div>

            { item.url !== '' && !item.isValidUrl && <div className='mt-5'><Message status='error'>URL no válida</Message></div> }
        </div>
    )
}

export default DevTreeInput