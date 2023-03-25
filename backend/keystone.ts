
import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately
import { withAuth, session } from './auth';

import dotenv from 'dotenv';

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = '',
  S3_REGION: region = '',
  S3_ACCESS_KEY_ID: accessKeyId = '',
  S3_SECRET_ACCESS_KEY: secretAccessKey = '',
  S3_ENDPOINT: endpoint = ''
} = process.env;

export default withAuth(
  config({
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL || "",
      additionalPrismaDatasourceProperties: {
        relationMode: 'prisma',
      },
    },
    lists,
    session,
    storage: {
      remote_images: {
        kind: "s3",
        type: 'image',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        endpoint,
        generateUrl: path => {
          const pathname = new URL(path).pathname;
          return `${process.env.S3_IMAGES_CDN_URL}${pathname}`
        },
        acl: "public-read"
      }
    }
  })
);
