import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
interface MeetupDataProps {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}
interface MeetupProps {
  meetups: MeetupDataProps[];
}
// const DUMMYDATA = [
//   {
//     id: "m1",
//     title: "The first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1024px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
//     address: "21 wattaie avenue",
//     description: "This is a amazing place",
//   },
//   {
//     id: "m2",
//     title: "The second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sunsets_of_Brisbane%2C_Queensland%2C_September_2021%2C_01.jpg/1920px-Sunsets_of_Brisbane%2C_Queensland%2C_September_2021%2C_01.jpg",
//     address: "121 brisbane avenue",
//     description: "This is anothor a amazing place",
//   },
// ];

const HomePage = (props: MeetupProps) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups."
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jakaixu:Caicai4877@cluster0.tms0o1r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const meetupsCollection = client.db().collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
// always render on server side, never on client side, rerender every single request
// export async function getServerSideProps(context:GetServerSidePropsContext) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: { meetups: DUMMYDATA }
//   }
// }
export default HomePage;
