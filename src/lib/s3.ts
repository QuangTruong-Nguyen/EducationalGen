// import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";

// export async function uploadToS3(
//   file: File
// ): Promise<{ file_key: string; file_name: string }> {
//   return new Promise((resolve, reject) => {
//     try {
//       const s3 = new S3({
//         region: "ap-southeast-1", 
//         credentials: {
//           accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
//           secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
//         },
//       });

//       const file_key =
//         "bookmcs/" + Date.now().toString() + file.name.replace(" ", "-");

//       const params = {
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
//         Key: file_key,
//         Body: file,
//       };
//       s3.putObject(
//         params,
//         (err: any, data: PutObjectCommandOutput | undefined) => {
//           return resolve({
//             file_key,
//             file_name: file.name,
//           });
//         }
//       );
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function getS3Url(file_key: string) {
//   const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
//   return url;
// }


// /lib/s3.ts
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  const s3 = new S3({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
    },
  });

  // const file_key =
  //   "bookmcs/" + Date.now().toString() + "-" + file.name.replace(/ /g, "-");

  const file_key =
     Date.now().toString() + "-" + file.name.replace(/ /g, "-");
  const arrayBuffer = await file.arrayBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    })
  );

  return {
    file_key,
    file_name: file.name,
  };
}

export function getS3Url(file_key: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
}

