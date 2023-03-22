import AWS from 'aws-sdk';

AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export function getContentFromS3(objectKey) {
  const params = {
    Bucket: 'apsit-community-static',
    Key: objectKey,
  };

  try {
    const url = s3.getSignedUrl('getObject', params);
    return url;
  } catch (err) {
    console.log(err);
    return null;
  }
}
