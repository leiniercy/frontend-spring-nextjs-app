// styles
import '@styles/globals.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";         
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

//components
import Nav from '@components/Nav';
import BookCard from '@components/BookCard';

const Home = () => {
    return (
        
        <section className="w-full flex-center flex-col">
            <Nav/>
            <h1 className="head_text text_center">
                Book store
                <br className="max-md: hidden" />
                <span className="orange_gradient text-center">
                    wlecome to my book store
                </span>
                <p className="desc text-center">
                    Description aubout the page
                </p>
            </h1>
            <BookCard/>
        </section>
    )
}

export default Home