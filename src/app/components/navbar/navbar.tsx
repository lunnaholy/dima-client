import { Card, Divider, Popover, PopoverTrigger, Avatar, PopoverContent, Listbox, ListboxItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { api as _api } from "../../../api";
import { FaBriefcase, FaBuilding, FaChartPie, FaCheck, FaDoorClosed, FaEarthEurope, FaGear, FaHouse, FaLock, FaNoteSticky, FaPencil, FaPhone, FaPlay, FaPrint } from "react-icons/fa6";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { DarkModeToggler } from "../darkmode/darkModeToggler";

export default function LayoutNavbar() {
  // TODO: _setAdminUser
  const [adminUser, _setAdminUser] = useState<any | null>(null);
  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebarCollapsed') === 'true' ? true : false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: 
  // useEffect(() => {
  //   api.static.getMe().then(data => setAdminUser(data.data));
  // }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    localStorage.setItem('sidebarCollapsed', (!collapsed).toString());
  }

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const links = [{
    path: '/dashboard',
    icon: FaHouse,
    title: 'Главная',
    color: "info"
  }, {
    path: '/dashboard/locations',
    icon: FaBuilding,
    title: 'Переговорные',
    color: "secondary"
  }, {
    path: '/dashboard/locks',
    icon: FaLock,
    title: 'Замки',
    color: "primary"
  }, {
    path: '/dashboard/print',
    icon: FaPrint,
    title: 'Печать',
    color: "warning"
  }, {
    path: '/dashboard/tickets',
    icon: FaNoteSticky,
    title: 'Тикеты',
    color: "default"
  }];

  const variants = {
    collapsed: {
      width: 67
    },
    expanded: {
      width: 288
    }
  }

  const onUserAction = (key: any) => {
    switch (key) {
      case 'profile':
        navigate('/dashboard/me');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      case 'exit':
        // TODO:
        // api.auth.logout();
        break;
      default:
        break;
    }
  }

  return (
    <Card
      className="p-4 justify-start gap-6 select-none min-w-full lg:min-w-0 lg:h-screen rounded-none shadow-none"
      as={motion.div}
      initial={false}
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={variants}
    >
      <div className="flex flex-row items-center gap-4">
        <a href='#' className='p-1 hidden lg:block' onClick={toggleCollapsed}>
          {collapsed && (
            <HiArrowRight className="text-xl" />
          )}
          {!collapsed && (
            <HiArrowLeft className="text-xl" />
          )}
        </a>

        <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
          <a href="/admin">
            <img className="logo h-16" src="/logo.svg" alt="Elastic Management" />
          </a>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            isActive={currentPath === link.path}
            link={link}
            collapsed={collapsed}
            color={link.color}
          />
        ))}
      </div>

      <div className="flex flex-col h-full justify-end gap-4">
        <DarkModeToggler collapsed={collapsed} />
        <Divider />
        <Popover showArrow={false} placement="top" portalContainer={document.getElementById("main")!}>
          <PopoverTrigger className="shadow-none border-none bg-none outline-none">
            <button className="inline-flex items-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased transition-transform">
              <div>
                <Avatar size='sm' name={`${adminUser?.first_name.split("")[0]}`} />
              </div>
              <motion.div animate={{ opacity: collapsed ? 0 : 1 }} className="flex flex-col gap-1">
                <span className='text-sm text-nowrap'>{`${adminUser?.first_name} ${adminUser?.last_name}`}</span>
              </motion.div>
            </button>
          </PopoverTrigger>
          <PopoverContent className='p-1 min-w-48'>
            <Listbox
              aria-label="Действия"
              onAction={onUserAction}
            >
              <ListboxItem startContent={<FaPencil />} key="profile">Профиль</ListboxItem>
              <ListboxItem startContent={<FaGear />} key="settings">Настройки</ListboxItem>
              <ListboxItem startContent={<FaDoorClosed />} key="exit" className="text-danger" color="danger">
                Выйти
              </ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}

function NavLink({ link, collapsed, isActive, color = "default" }: { link: { icon: any, title: any, path: string }, collapsed: boolean, isActive: boolean, color?: string }) {
  return (
    <>
      {/* {isActive && (
        <Link
          to={link.path}
          className={
            `flex flex-row items-center gap-4 p-2 rounded-md bg-primary-100 text-primary-500 transition-all`
          }
        >
          <div>
            <link.icon className="text-medium" />
          </div>
          <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
            <span>{link.title}</span>
          </motion.div>
        </Link>
      )}

      {!isActive && (
        <Link
          to={link.path}
          className={
            `flex flex-row items-center gap-4 p-2 rounded-md text-foreground-600 hover:bg-primary-100 hover:text-primary-500 transition-all`
          }
        >
          <div>
            <link.icon className="text-medium" />
          </div>
          <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
            <span>{link.title}</span>
          </motion.div>
        </Link>
      )} */}
      <Link
        to={link.path}
        className={
          `flex flex-row items-center gap-4 py-2 rounded-md text-foreground-600 bg-default bg-opacity-0 hover:bg-opacity-30 transition-all ` +
          `${collapsed ? 'hover:bg-opacity-0' : 'px-2'}`
        }
      >
        <div className={`flex flex-col items-center justify-center min-w-8 min-h-8 rounded-lg bg-${color} bg-opacity-30 text-${color}`}>
          <link.icon className="text-medium" />
        </div>
        <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
          <span className="text-sm font-semibold">{link.title}</span>
        </motion.div>
      </Link>
    </>
  );
}