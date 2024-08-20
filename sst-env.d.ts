/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "MyWeb": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "update-bid-status": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
  }
}
export {}
