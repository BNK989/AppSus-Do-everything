const { NavLink } = ReactRouterDOM
export function Home() {
    // return <section className="home">
    //     <h1>Welcome to home page!</h1>
    // </section>
    return (
        <section className="home-page flex column align-center">
          <img
            src="assets/img/AppSus-logo.png"
            alt="logo"
            className="img-logo"
          />
          <h1 className="main-title">
            The do Everything app.
          </h1>
    
          <div className="btn-container flex">
            <NavLink to="/mail">
              <button className="btn btn-mail ">
                Do everything Email
              </button>
            </NavLink>
    
            <NavLink to="/note">
              <button className="btn btn-note">
              Do everything Note
              </button>
            </NavLink>
          </div>
        </section>
      )
    }