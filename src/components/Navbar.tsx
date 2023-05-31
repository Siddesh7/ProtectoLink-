import React from "react";

interface NavbarProps {
  action: () => void;
  type: string;
  loading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ action, type, loading }) => {
  return (
    <div className="navbar bg-base-200 w-[95%] m-auto pt-[20px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="flex text-4xl">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
              Glacier!
            </h1>
            <span className="ml-[4px]">🏔️</span>
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul> */}
        </div>
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div> */}
      {!loading && (
        <div className="navbar-end">
          <button className="btn" onClick={action}>
            {type}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
