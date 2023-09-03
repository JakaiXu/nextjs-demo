import Image from "next/image";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";
interface MeetupDataProps {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}
function MeetupItem (props:MeetupDataProps) {
  const router = useRouter();
  const showDetailHandler = () => {
    router.push("/" + props.id);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
