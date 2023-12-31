import React from "react";
import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";
interface MeetupProps {

  title: string;
  image: string;
  address: string;
  description: string;
}
const MeetupDetail = (props:MeetupProps) => {
  return (
    <section className={classes.detail}>
      <img className={classes.img} src={props.image} alt={props.title} />
      <h1 className={classes.title}>{props.title}</h1>
      <address className={classes.address}>{props.address}</address>
      <p className={classes.description}>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
