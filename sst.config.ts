/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "auction",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {

    const updateBidStatusFn = new sst.aws.Function("update-bid-status", {
      handler: "functions/update-bid-status-fn.handler",
      url: true,
      environment: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      },
    })

    new sst.aws.Nextjs("MyWeb", { link: [updateBidStatusFn] });
  },
});
