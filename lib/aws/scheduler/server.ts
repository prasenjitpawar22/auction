import { SchedulerClient, } from '@aws-sdk/client-scheduler'

const accessKeyId = process.env.AWS_ACCESS_KEY as string
const secretAccessKey = process.env.AWS_ACCESS_SECRET as string
const region = 'us-east-1'

export const schedulerClient = new SchedulerClient({
    credentials: { accessKeyId, secretAccessKey },
    region,
}) 