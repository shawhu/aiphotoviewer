import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules import

export async function listS3Bucket(shuffle: boolean = true) {
  // a client can be shared by different commands.
  const client = new S3Client({ region: "ap-northeast-1" });
  const params = {
    Bucket: "ai-tokyo-001", // required
  };
  const command = new ListObjectsV2Command(params);
  const resp = await client.send(command);

  var data: { key: string; size: number }[] = [];

  if (resp.Contents != undefined) {
    resp.Contents.forEach((item) => {
      if (item.Size != undefined && item.Size > 0) {
        data.push({ key: item.Key!, size: item.Size });
      }
    });
  }
  //shuffle it?
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  if (shuffle) {
    shuffleArray(data);
  }

  return data;
}
