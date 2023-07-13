
//components
import BookCrud from '@components/book_crud/BookCrud';
import BookDataView from '@components/DataView/BookDataView';

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            {/* <BookCrud/> */}
            <BookDataView />
        </section>
    )
}

export default Home