import Header from "../components/Header"
import SearchForm from "../components/SearchForm";

const HomeView = () => {
    return (
        <div className="flex flex-col h-screen animate__animated animate__fadeIn">
            <Header />
            
            <main className="bg-gray-100 flex-1 py-10 bg-no-repeat bg-right lg:bg-[url('/bg.svg')]">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todas tus 
                            <span className="text-cyan-400"> Redes Sociales </span> 
                            en tu enlace
                        </h1>

                        <p>Unete a más de 200 mil developers compartiendo sus redes sociales, comparte tu perfil de Tiktok, Facebook, Instagram y más.</p>
                    
                        <SearchForm />
                    </div>
                </div>
            </main>
        </div>
    )   
}

export default HomeView;