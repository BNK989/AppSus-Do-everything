const { useRef } = React
const { Link, NavLink } = ReactRouterDOM
import { NoteFilter } from '../apps/note/cmps/NoteFilter.jsx'

export function AppHeader() {
  const headerRef = useRef()

  const toggleMenu = () => {
    headerRef.current.classList.toggle('menu-open')
  }

  return (
    <header ref={headerRef} className="app-header full">
      <Link className="logo flex align-center" to="/">
        <img src="assets/img/appSus-logo.png" alt="logo" />
        <h3>AppSus</h3>
      </Link>
      {/* <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      <div className="temp">
        <form className="temp" role="search" onChange={console.log}>
          <button className="temp" aria-label="Close search" type="button">
            <svg
              focusable="false"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
          </button>
          <div className="temp">
            <input
              className="temp"
              aria-label="Search"
              autoComplete="off"
              placeholder="Search"
              role="combobox"
              value=""
              name="q"
              type="text"
              aria-hidden="false"
            />
          </div>
          <button className="gb_Me" aria-label="Clear search" type="button">
            <svg
              focusable="false"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              .<path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            className="gb_Je"
            aria-label="Search"
            role="button"
            aria-hidden="false"
          >
            <svg
              focusable="false"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
              <path d="M0,0h24v24H0V0z" fill="none"></path>
            </svg>
          </button>
        </form>
      </div> */}

      <nav onClick={toggleMenu}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail/inbox">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
      <button className="toggle-menu-btn" onClick={toggleMenu} type="button">
        ☰
      </button>
      <div className="backdrop" onClick={toggleMenu}></div>
    </header>
  )
}
