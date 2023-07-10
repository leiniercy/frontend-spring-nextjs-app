

export const metadata = {
    tile: "Book store",
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
                    {children}
                </div>
            </body>
        </html>
    )
}

export default RootLayout