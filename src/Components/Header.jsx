import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const nav = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded bg-[#B55EEA] hover:bg-[#382147] text-white"
              : "bg-white p-3"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lists"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded bg-[#B55EEA] hover:bg-[#382147] text-white"
              : "bg-white p-3"
          }
        >
          All Lists
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded bg-[#B55EEA] hover:bg-[#382147] text-white"
              : "bg-white p-3"
          }
        >
          Add
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-4">
              {/* Navigation links */}
              {nav}
            </ul>
          </div>
          <Link to="/">
            <p className="text-xl font-bold">TaskMaster</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {/* Navigation links */}
            {nav}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex items-center">
              <img
                className="rounded-full mr-3 w-16 h-16 lg:w-16 lg:h-16"
                src={
                  users
                    ? users.find((u) => u.email === user.email)?.image ||
                      user?.photoURL
                    : user?.photoURL
                }
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
