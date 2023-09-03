import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
interface Meetup {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}
interface MeetupListProps {
  meetups: Meetup[];
}
function MeetupList({ meetups }: MeetupListProps) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
