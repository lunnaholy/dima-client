import { Card, Divider, Popover, PopoverTrigger, Avatar, PopoverContent, Listbox, ListboxItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../api";
import {
  FaBell,
  FaBriefcase,
  FaBuilding,
  FaDoorClosed,
  FaGear,
  FaHouse, FaMoneyBill, FaPencil,
  FaUsers
} from "react-icons/fa6";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { DarkModeToggler } from "../darkmode/darkModeToggler";
import { NotificationsList } from "../notifications/notifications";
import { useAppSelector } from "../../../hooks/useAppSelector";

export default function LayoutNavbar() {
  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebarCollapsed') === 'true' ? true : false);
  const location = useAppSelector(state => state.location.location);
  const [links, setLinks] = useState<any[]>([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    localStorage.setItem('sidebarCollapsed', (!collapsed).toString());
  }

  useEffect(() => {
    if (location.id !== 0) {
      setLinks([{
        path: '/dashboard',
        icon: FaHouse,
        title: 'Главная',
        color: "default"
      }, {
        path: '/dashboard/locations',
        icon: FaBuilding,
        title: 'Локации',
        color: "default"
      }, {
        path: '/dashboard/users',
        icon: FaUsers,
        title: 'Пользователи',
        color: "default"
      }, {
        path: '/dashboard/renters',
        icon: FaBriefcase,
        title: 'Арендаторы',
        color: "default"
      }, {
        path: '/dashboard/offices',
        icon: FaDoorClosed,
        title: 'Офисы',
        color: "default"
      }, {
        path: '/dashboard/payments',
        icon: FaMoneyBill,
        title: 'Платежи',
        color: "default"
      }]);
    } else {
      setLinks([{
        path: '/dashboard/selectLocation',
        icon: FaHouse,
        title: 'Выбор локации',
        color: "default"
      }]);
    }
  }, []);

  const variants = {
    collapsed: {
      width: 67
    },
    expanded: {
      width: 288
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

      {!collapsed && (
        <>
          {location.id !== 0 && (
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-default-500">Локация:</span>
                <span className="font-semibold text-sm">{location.display_name}</span>
              </div>
              <Link to="/dashboard/selectLocation" className="font-semibold text-sm text-primary">Сменить</Link>
            </div>
          )}
          {location.id == 0 && (
            <div className="flex flex-row items-center justify-between w-full">
              <span className="font-semibold text-sm">Локация не выбрана</span>
            </div>
          )}
        </>
      )}

      <div className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            link={link}
            collapsed={collapsed}
            color={link.color}
          />
        ))}
      </div>

      <div className="flex flex-col h-full justify-end gap-4">
        <DarkModeToggler collapsed={collapsed} />
        <Notifications collapsed={collapsed} />
        <Divider />
        <Account collapsed={collapsed} />
      </div>
    </Card>
  );
}

function Notifications({ collapsed }: { collapsed: boolean }) {
  const unreadCount = useAppSelector(state => state.notifications.unreadCount);

  return (
    <Popover showArrow={false} placement="top" portalContainer={document.getElementById("main")!} backdrop="blur">
      <PopoverTrigger className="shadow-none border-none bg-none outline-none">
        <button
          className={
            `flex flex-row items-center gap-4 py-2 rounded-md text-foreground-600 bg-default bg-opacity-0 hover:bg-opacity-30 transition-all ` +
            `${collapsed ? 'hover:bg-opacity-0' : 'px-2'}`
          }>
          <div className={`flex flex-col items-center justify-center min-w-8 min-h-8 rounded-lg bg-default bg-opacity-30`}>
            <FaBell className="text-medium top-2 relative" />
            <span className={`top-2 left-4 w-4 h-4 relative z-10 rounded-full text-[10px] 
              ${unreadCount > 0 ? 'bg-danger animate-pulse' : 'bg-default'}`}>{unreadCount}</span>
          </div>
          <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
            <span className="text-sm font-semibold">Уведомления</span>
          </motion.div>
        </button>
      </PopoverTrigger>
      <PopoverContent className='min-w-96 max-w-96'>
        <NotificationsList />
      </PopoverContent>
    </Popover>
  )
};

function Account({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.currentUser);

  const onUserAction = (key: any) => {
    switch (key) {
      case 'profile':
        navigate('/dashboard/me');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      case 'exit':
        api.auth.logout();
        break;
      default:
        break;
    }
  }

  return (
    <Popover showArrow={false} placement="top" portalContainer={document.getElementById("main")!}>
      <PopoverTrigger className="shadow-none border-none bg-none outline-none">
        <button className="inline-flex items-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 z-10 subpixel-antialiased transition-transform">
          <div>
            <Avatar size='sm' name={`${user.first_name?.split("")[0]}`} />
          </div>
          <motion.div animate={{ opacity: collapsed ? 0 : 1 }} className="flex flex-col gap-1">
            <span className='text-sm text-nowrap'>{`${user.first_name} ${user.last_name}`}</span>
          </motion.div>
        </button>
      </PopoverTrigger>
      <PopoverContent className='p-1 min-w-48'>
        <Listbox
          aria-label="Действия"
          onAction={onUserAction}>
          <ListboxItem startContent={<FaPencil />} key="profile">Профиль</ListboxItem>
          <ListboxItem startContent={<FaGear />} key="settings">Настройки</ListboxItem>
          <ListboxItem startContent={<FaDoorClosed />} key="exit" className="text-danger" color="danger">
            Выйти
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}

function NavLink({ link, collapsed, color = "default" }: { link: { icon: any, title: any, path: string }, collapsed: boolean, color?: string }) {
  return (
    <>
      <Link
        to={link.path}
        className={
          `flex flex-row items-center gap-4 py-2 rounded-md text-foreground-600 bg-default bg-opacity-0 hover:bg-opacity-30 transition-all ` +
          `${collapsed ? 'hover:bg-opacity-0' : 'px-2'}`
        }
      >
        <div className={`flex flex-col items-center justify-center min-w-8 min-h-8 rounded-lg bg-${color} bg-opacity-30`}>
          <link.icon className="text-medium" />
        </div>
        <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
          <span className="text-sm font-semibold">{link.title}</span>
        </motion.div>
      </Link>
    </>
  );
}