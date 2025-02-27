import styles from './spinnerLoading.module.css'

const SpinnerLoading = () => {
    return (
        <div className='flex justify-center my-10'>
            <span className={ styles.loader }></span>
        </div>
    )
}

export default SpinnerLoading;