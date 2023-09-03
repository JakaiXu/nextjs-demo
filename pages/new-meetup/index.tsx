import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
export interface EnteredMeetupDataProps {
  title: string;
  image: string;
  address: string;
  description: string;
}
const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (
    enteredMeetupData: EnteredMeetupDataProps
  ) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };
  return (
    <Fragment>
        <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
