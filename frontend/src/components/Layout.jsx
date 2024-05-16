import Nav from "./Nav"

export default function Layout({children}){

    const currentUser = localStorage.getItem("username");

    // const isLogedIn = () => {
    //     if (currentUser === "") {
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // }

    console.log("curr udeddddddr",currentUser)

    //  useEffect(()=>{
    //       window.location.reload();
    // },[currentUser])

    if (currentUser != "") {
        return(
                <>
                    <header>
                        <Nav/>
                    </header>
                    <main>
                        {children}
                    </main>
                </>)
    }
    else {
        return(
            <>
                <main>
                    {children}
                </main>
            </>)
    }
}