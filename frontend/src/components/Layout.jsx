import Nav from "./Nav"

export default function Layout({children}){
    return(
    <div id="container">
        <Nav></Nav>
        {children}
    </div>
    )
}