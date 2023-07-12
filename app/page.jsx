import styles from '@styles/tailwind-all.css'; 

//components
import BookCrud from '@components/book_crud/BookCrud';


const Home = () => {
    return (   
        <section className="w-full flex-center flex-col">
            
            <BookCrud/>
        </section>
    )
}

export default Home