import { IncomingMessage, ServerResponse } from "http";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jakaixu:Caicai4877@cluster0.tms0o1r.mongodb.net/meetups?retryWrites=true&w=majority"

    );
    const meetupsCollection = client.db().collection("meetups");
    const result = await meetupsCollection.insertOne(data);
   
    client.close();
    res.status(201).json({
      message: "Meetup inserted!!",
    });
  }
}
export default handler;
