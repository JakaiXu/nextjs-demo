import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { ReactNode } from 'react';
type ChildrenProps ={
  children:ReactNode
}
function Layout({children}:ChildrenProps) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;
