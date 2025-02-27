const NotFoundView = () => {
    return (
        <p className="text-white text-center font-bold text-2xl animate__animated animate__fadeIn" >
            No pudimos encontrar el {}
            <span className="text-cyan-400 block">handle solicitado</span>
        </p>
    );
}

export default NotFoundView;