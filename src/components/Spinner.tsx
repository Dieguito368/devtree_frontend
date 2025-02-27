import spinnerStyles from './spinner.module.css';
import 'animate.css';

const Spinner = () => {
    return (
        <div className="w-full h-screen inset-0 flex items-center justify-center z-50 animate__animated animate__fadeIn">
            <span className={`${spinnerStyles.loader} relative`}></span>
        </div>
    );
}

export default Spinner;
