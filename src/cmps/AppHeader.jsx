import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

function _AppHeader(props) {
  const onBack = () => {
    console.log("props:", props);
    props.history.goBack();
  };

  return (
    <header>
      <section className="app-header">
        <h2 className="logo">
          Mister BITCoin
          <i className="fa-brands fa-bitcoin"></i>
        </h2>
        {/* <section className="back">
          <button onClick={onBack}>Back</button>
        </section> */}
        <nav>
          <NavLink activeClassName="my-active" exact to="/">
            Home
          </NavLink>
          <NavLink activeClassName="my-active" to="/contact">
            Contacts
          </NavLink>
          <NavLink activeClassName="my-active" to="/about">
            About
          </NavLink>
          <NavLink activeClassName="my-active" to="/statistic">
            Statistics
          </NavLink>
        </nav>
      </section>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
