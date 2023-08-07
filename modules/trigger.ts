import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";

export default async function (request: ZuploRequest, context: ZuploContext) {
  context.log.info("NODE_ENV", process.env.NODE_ENV)

  const inngest = new Inngest({
    name: "Inngest Triggers",
    eventKey: environment.INNGEST_EVENT_KEY,
    env: environment.INNGEST_ENV
  });

  await inngest.send({
    name: "demo/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });

  return "hi!";
}