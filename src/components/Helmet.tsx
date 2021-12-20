import React from 'react';
import PropTypes from 'prop-types';

interface IHelmetProps {
  title: string;
  children: React.ReactNode;
}

const Helmet = (props: IHelmetProps) => {
  document.title = props.title;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{props.children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string,
};

export default Helmet;
