import * as React from 'react';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

const IndexLayout = ({ children }) => {
  return (
    <>
      <HeaderLayout />

      {children}

      <FooterLayout />
    </>
  );
}

export default IndexLayout