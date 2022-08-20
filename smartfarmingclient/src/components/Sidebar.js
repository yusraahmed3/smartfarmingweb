import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { AdminSidebarData, UserSidebarData } from "./SidebarData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar() {
  const location = useLocation();
  const drawerOpenKey = "drawerOpen";
  const defaultOpen = localStorage.getItem(drawerOpenKey) === "true";
  const [open, setOpen] = useState(defaultOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userAuth);

  const sidelogout = () => {
    dispatch(logout(navigate));
  };

  // save drawer state in localstorage
  useEffect(() => {
    localStorage.setItem(drawerOpenKey, open);
  }, [open]);

  const openSidebar = () => {
    setOpen(!open);
  };

  return (
    <aside
      className={`${
        open ? "w-64 h-screen " : "w-14 lg:w-24  md:h-auto"
      } bg-primaryColor duration-300 p-2  absolute lg:relative shadow-xl rounded-md lg:rounded-none z-30 `}
    >
      <div
        onClick={openSidebar}
        className="block lg:hidden text-textColor text-3xl cursor-pointer"
      >
        {open ? <AiOutlineClose /> : <BiMenuAltRight />}
      </div>
      <div className={`${open ? "block " : "hidden"} pt-6 lg:block`}>
        <div
          onClick={openSidebar}
          className={`absolute top-1/2 -right-2 border border-secondaryColor rounded-full cursor-pointer text-xl text-secondaryColor hidden lg:block ${
            open ? "rotate-180" : ""
          }`}
        >
          <MdDoubleArrow />
        </div>

        <div className="flex flex-row  items-end gap-x-3 w-full">
          <Avatar image={userData.photo} size="w-16 h-16" />
          <p
            className={`${!open && "hidden"} text-textColor text-sm `}
          >{`@${userData.email}`}</p>
        </div>
        <ul className="pt-8 ">
          {(userData.role === "admin" ? AdminSidebarData : UserSidebarData).map(
            (item, i) => {
              return (
                <Link to={item.link} key={i}>
                  <li
                    onClick={item.last && sidelogout}
                    className={`flex items-center ${
                      !open && "justify-center"
                    } gap-x-4 p-3 my-2 ${
                      location.pathname === item.link &&
                      "bg-buttonColor text-textColor"
                    } rounded-md text-gray-300 hover:bg-buttonColor hover:text-textColor ${
                      item.gap ? "mt-20" : ""
                    }`}
                  >
                    <span className="text-xl flex items-center">
                      {item.icon}
                    </span>

                    <span
                      className={` ${
                        open ? "block" : "hidden"
                      } origin-left duration-300 text-base`}
                    >
                      {item.title}
                    </span>
                  </li>
                </Link>
              );
            }
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
