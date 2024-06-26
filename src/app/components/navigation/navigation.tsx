import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHouse } from 'react-icons/fa6';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

export const Navigation = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const location = useLocation();

  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    setPath(location.pathname.slice(1).split("/"));
    console.log(path);
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/dashboard');
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className='flex flex-row gap-2 items-center'>
      <button onClick={goBack} disabled={navigationType === 'POP'}>
        <FaArrowLeft className='text-gray-500' />
      </button>
      <button onClick={goHome}>
        <FaHouse className='text-gray-500' />
      </button>
      <button onClick={goForward} disabled={navigationType === 'PUSH'}>
        <FaArrowRight className='text-gray-500' />
      </button>
      <Breadcrumbs variant='bordered' className='ml-4'>
        {path.map(pathName => {
          if(pathName == "dashboard") {
            return <BreadcrumbItem href='/dashboard'><FaHouse className='text-gray-500' /></BreadcrumbItem>
          }
          if(pathName == "users") {
            return <BreadcrumbItem href='/dashboard/users'>Пользователи</BreadcrumbItem>
          }
          if(pathName == "locations") {
            return <BreadcrumbItem href='/dashboard/locations'>Локации</BreadcrumbItem>
          }
          if(pathName == "offices") {
            return <BreadcrumbItem href='/dashboard/locations'>Офисы</BreadcrumbItem>
          }
          if(pathName == "payments") {
            return <BreadcrumbItem href='/dashboard'>Платежи</BreadcrumbItem>
          }
          if(pathName == "renters") {
            return <BreadcrumbItem href='/dashboard'>Арендаторы</BreadcrumbItem>
          }
          if(pathName == "test") {
            return <BreadcrumbItem href='/dashboard'>Ультра-секрет</BreadcrumbItem>
          }
        })}
      </Breadcrumbs>
    </div>
  );
};