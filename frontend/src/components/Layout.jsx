import Header from "./Header"
import Nav from "./Nav"

export default function Layout({children}){
    return(
    <div id="container">
        <Header/>
        <Nav/>
        {children}
    </div>
    )
}