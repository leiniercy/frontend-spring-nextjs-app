
// styles
// import '@styles/globals.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";         
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// tailwind css
import '@styles/tailwind-all.css';
import '@styles/tailwind-base.css';
import '@styles/tailwind-components.css';
import '@styles/tailwind-utilities.css';

//components
import Nav from '@components/Nav';

export const metadata = {
    title: "Book store",
    description: "Welcome to the book store"

}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient'></div>
                </div>
                <div className='app'>
                    <Nav />
                    {children}
                </div>
            </body>
        </html>
    )
}

export default RootLayout