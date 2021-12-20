import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/Logo-2.png';

const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm',
    path: '/catalog',
  },
  {
    display: 'Phụ kiện',
    path: '/accessories',
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const acativeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80 ||
        window.scrollY > 80
      ) {
        headerRef.current && headerRef.current.classList.add('shrink');
      } else {
        headerRef.current && headerRef.current.classList.remove('shrink');
      }

      return () => {
        window.removeEventListener('scroll', () => {
          console.log('scroll');
        });
      };
    });
  }, []);

  const menuLeft = useRef<HTMLDivElement>(null);

  const menuToggle = () => menuLeft.current && menuLeft.current.classList.toggle('active');

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === acativeNav ? 'active' : ''
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <Link to="/search">
                <i className="bx bx-search"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/user">
                <i className="bx bx-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
