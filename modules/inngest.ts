import { ZuploContext, ZuploRequest, Logger, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";
// @ts-ignore
import { serve } from "inngest/edge";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name: "Inngest Functions",
    eventKey: environment.INNGEST_EVENT_KEY,
    logger: context.log,
    env: environment.INNGEST_ENV
  });

  const helloWorld = inngest.createFunction({ name: 'Hello World Newly Registered' }, { event: 'demo/hello.world' }, () => 'Hello, Inngest!');

  const handler = serve(inngest, [helloWorld], {
    logLevel: environment.ZUPLO_LOG_LEVEL,
    signingKey: environment.INNGEST_SIGNING_KEY,
  });

  return handler(request, context)
}