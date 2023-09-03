import React from "react";
import { Fragment } from "react";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { GetStaticPropsContext } from "next";

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

interface MeetupDetailsProps {
  meetupData: {
    title: string;
    description: string;
    image: string;
    address: string;
  };
}

const MeetupDetails:React.FC<MeetupDetailsProps> = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jakaixu:Caicai4877@cluster0.tms0o1r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const meetupsCollection = client.db().collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  //only includes ids no other fields
  client.close();
  return {
    fallback: false,

    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  if (!params || typeof params.meetupId !== "string") {
    return { notFound: true };
  }
  const meetupId = params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://jakaixu:Caicai4877@cluster0.tms0o1r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const meetupsCollection = client.db().collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(selectedMeetup);

  //only includes ids no other fields
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        image: selectedMeetup?.image,
        address: selectedMeetup?.address,
        description: selectedMeetup?.description,
      },
      // {
      //   imag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1024px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
      //   title: "The first meetup",
      //   address: "21 wattaie avenue",
      //   description: "This is a amazing place",
      //   id: meetupId,
      // },
    },
  };
}

export default MeetupDetails;
