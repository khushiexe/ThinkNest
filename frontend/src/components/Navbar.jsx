// Import React
import React from 'react';

// Import Close (X) icon
import { FaRegWindowClose } from 'react-icons/fa';

// Import Link and NavLink from react-router-dom
import { Link, NavLink } from 'react-router-dom';

// Navbar component receives props from its parent (Header)
// containerStyles -> CSS classes passed from parent
// toggleMenu -> Function to open/close menu
// menuOpened -> Boolean that tells if menu is open
function Navbar({ containerStyles, toggleMenu, menuOpened }) {

  // Array containing all navigation links
  // Instead of writing each link separately,
  // we store them in an array and loop through it.
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/tutors', label: 'Tutors' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' }
  ];

  return (

    // Apply CSS classes received from the parent component
    <nav className={containerStyles}>

      {/* ================= MOBILE MENU ================= */}

      {/* Show the close button ONLY when menu is open */}
      {menuOpened && (
        <>

          {/* Close (X) icon */}
          <FaRegWindowClose

            // When clicked, close the menu
            onClick={toggleMenu}

            // Tailwind classes
            // text-xl -> icon size
            // self-end -> move to end of flex container
            // cursor-pointer -> hand cursor
            // relative left-8 -> shift icon slightly to the right
            className='text-xl self-end cursor-pointer relative left-8'
          />

          {/* ================= LOGO ================= */}

          {/* Clicking the logo takes user to Home page */}
          <Link
            to={'/'}
            className='bold-24 flex pb-12'
          >

            <span className='inline-flex'>

              {/* Box containing letter T */}
              <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertary'>
                T
              </span>

              {/* Remaining logo text */}
              hinkNest

            </span>

          </Link>

        </>
      )}

      {/* ================= NAVIGATION LINKS ================= */}

      {/* Loop through every object inside navItems */}
      {navItems.map(({ to, label }) => (

        // key helps React identify each element uniquely
        <div key={label} className='inline-flex'>

          {/* NavLink automatically checks if the route is active */}
          <NavLink

            // Destination path
            to={to}

            // isActive is true if current URL matches 'to'
            // If active, add "active-link" class
            className={({ isActive }) =>isActive ? "active-link" : ""}
          >

            {/* Display navigation text */}
            <h5 className='medium-16'>
              {label}
            </h5>

          </NavLink>

        </div>

      ))}

    </nav>
  );
}

// Export Navbar so it can be imported into other files
export default Navbar;