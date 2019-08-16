import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = app.getRequestHandler();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: "https://pmm-tool.firebaseio.com"
});

export const nextApp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});

// Github issue webhook
export const createPm = functions.https.onRequest((req, res) => {
  const isLabelPm = (labels: any[]) => labels.filter((label) => label.name === 'PM').length === 1;
  const body = req.body;

  if (body && body.action === 'labeled' && isLabelPm(body.issue.labels)) {
    const date = new Date();
    firebaseAdmin.firestore()
      .collection('pm')
      .doc(`${date.getTime().toString()}`)
      .set({
        id: date.getTime().toString(),
        date,
        summary: body.issue.body,
        title: body.issue.title
      })
      .then((result) => {
        return res.status(201).send(result)
      })
      .catch((e) => {
        console.error(e);
        return res.status(400).send(e);
      });
  }
});