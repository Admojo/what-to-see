import Nav from "./Nav"

export default function Layout({children}){
    const currentUser = localStorage.getItem("username");

    const showNavBar = () => {
        if (currentUser === "") {
            return false;
        } else {
            return true;
        }
    }
        return ( 
            <>
            {showNavBar() ? (
                <> 
                    <header>
                        <Nav/>
                    </header>
                    <main>
                        {children}
                    </main>
                </>
            ) : (
                <main>
                    {children}
                </main>
            )}
        </> 
    )   
}