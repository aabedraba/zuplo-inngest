import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name: "Inngest Triggers",
    eventKey: environment.INNGEST_EVENT_KEY,
    env: environment.INNGEST_ENV
  });

  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },

  });
}