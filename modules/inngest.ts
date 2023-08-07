import { ZuploContext, ZuploRequest, Logger, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";
// @ts-ignore
import { serve } from "inngest/cloudflare";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name: "Inngest Functions",
    eventKey: environment.INNGEST_EVENT_KEY,
    logger: context.log,
    env: environment.INNGEST_ENV
  });

  const helloWorld = inngest.createFunction(
    { name: "Hello World" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      await step.sleep("1s");
      return { event, body: "Hello, World!" };
    }
  );


  const handler = serve(inngest, [helloWorld], {
    logLevel: environment.ZUPLO_LOG_LEVEL,
    signingKey: environment.INNGEST_SIGNING_KEY,
  });

  return handler(request, context)
}