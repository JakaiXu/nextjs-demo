import { ReactNode } from 'react';
import classes from './Card.module.css';
type ChildrenProps ={
  children:ReactNode
}
function Card({children}:ChildrenProps) {
  return <div className={classes.card}>{children}</div>;
}

export default Card;
