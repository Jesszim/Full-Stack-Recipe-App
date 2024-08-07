  
import { NavLink, Outlet } from "react-router-dom"
import { connect } from "react-redux"

const Nav = (props) => {
  return (
    <div>

      <h1 id='logo'>🤯</h1>
    <div id="navbar">
      <NavLink to='/'>      <p className="link">
         Home
        </p></NavLink>
      <NavLink  to={`/recipe-book/page-${props.page + 1}`} >
        <p className="link">
          Recipe List
        </p>
      </NavLink>
      <NavLink  to="/form">
      <p className="link">
        Add Recipe
        </p></NavLink>
      {/* <NavLink className="link" to="/search">Search</NavLink> */}
      </div>
      <Outlet />

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}
export default connect(mapStateToProps, null)(Nav)
