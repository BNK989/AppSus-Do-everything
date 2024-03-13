const { useRef } = React
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    const headerRef = useRef()

    const toggleMenu = () => {
        headerRef.current.classList.toggle('menu-open')
    }

    return <header ref={headerRef} className="app-header">
        <Link className="logo flex align-center" to="/">
            <img src="assets/img/appSus-logo.png" alt="logo" />
            <h3>AppSus</h3>
        </Link>
        
        <nav onClick={toggleMenu}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
        <button className="toggle-menu-btn" onClick={toggleMenu} type="button">☰</button>
        <div className="backdrop" onClick={toggleMenu}></div>
    </header>
}
