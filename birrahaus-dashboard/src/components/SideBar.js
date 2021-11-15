import React from 'react';
import image from '../assets/images/logo.png';
import ContentWrapper from './ContentWrapper';
import StylesInDb from './CategoriesInDb';
import LastProductInDb from './LastProductInDb';
import ContentRowDetails from "./ContentRowDetails";
import ContentRowUsers from "./ContentRowUsers";
import Chart from './Chart'
// import SearchProducts from './SearchProducts';
import NotFound from './NotFound';
import { Link, Route, Switch } from 'react-router-dom';

function SideBar(){
    return (
      <React.Fragment>
        {/*<!-- Sidebar -->*/}
        <ul
          className="navbar-nav bg-dark text-white sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/*<!-- Sidebar - Brand -->*/}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/"
          >
            <div className="sidebar-brand-icon">
              <img className="w-100" src={image} alt="BirraHaus" />
            </div>
          </a>

          {/*<!-- Divider -->*/}
          <hr className="sidebar-divider my-0" />

          {/*<!-- Nav Item - Dashboard -->*/}
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <span>Dashboard - Birra Haus</span>
            </Link>
          </li>

          {/*<!-- Divider -->*/}
          <hr className="sidebar-divider" />

          {/*<!-- Heading -->*/}
          <div className="sidebar-heading">Rutas</div>

          {/*<!-- Nav Item - Pages -->*/}
          <li className="nav-item">
            <Link className="nav-link" to="/ContentRowdetails">
              <i className="fas fa-chart-bar"></i>
              <span>Totales</span>
            </Link>
          </li>

          {/*<!-- Nav Item - Charts -->*/}
          <li className="nav-item">
            <Link className="nav-link" to="/ContentRowUsers">
              <i className="fas fa-users"></i>
              <span>Usuarios</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/LastProductInDb">
              <i class="fas fa-less-than"></i>
              <span>Último producto</span>
            </Link>
          </li>

          {/*<!-- Nav Item - Tables -->*/}
          <li className="nav-item nav-link">
            <Link className="nav-link" to="/Chart">
              <i className="fas fa-fw fa-table"></i>
              <span>Productos</span>
            </Link>
          </li>

          {/*<!-- Divider -->*/}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <li className="nav-item nav-link">
                <Link className="nav-link" to="/SearchMovies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Search Movies</span></Link>
                </li> */}
        </ul>
        {/*<!-- End of Sidebar -->*/}

        <Switch>
          <Route exact path="/">
            <ContentWrapper />
          </Route>
          <Route path="/StylesInDb">
            <StylesInDb />
          </Route>
          <Route path="/LastProductInDb">
            <LastProductInDb />
          </Route>
          <Route path="/ContentRowDetails">
            <ContentRowDetails />
          </Route>
          <Route path="/ContentRowUsers">
            <ContentRowUsers />
          </Route>
          <Route path="/Chart">
            <Chart />
          </Route>

          {/* <Route path="/SearchProducts">
            <SearchProducts />
          </Route> */}
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
}
export default SideBar;