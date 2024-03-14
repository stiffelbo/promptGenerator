import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNav } from '../pages'; // Adjust the import path as necessary

const MainNav = () => {
    return (
      <div className="bg-white overflow-hidden w-full">
        <div className="flex justify-start items-center mx-3">
          {getNav().map((page, index) => (
            <NavLink
              key={index}
              to={page.link}
              className={({ isActive }) =>
                isActive
                  ? "flex py-2 items-center mx-1 text-sm text-zinc-900 hover:text-zinc-300"
                  : "flex py-2 items-center mx-1 text-sm text-zinc-600 hover:text-zinc-300"
              }
            >
              {page.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  };

export default MainNav;
