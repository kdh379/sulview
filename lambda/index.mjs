import sharp from "sharp";
import aws from "aws-sdk";

const s3 = new aws.S3({
  region: "ap-northeast-2",
});
const BUCKET = "sulview";
const DEFAULT_QUALITY = 80;
const DEFAULT_TYPE = "contain";

export const handler = async (event, _, callback) => {
  const { request, response } = event.Records[0].cf;

  /** 쿼리 설명
   * w : width
   * h : height
   * f : format
   * q : quality
   * t : type (contain, cover, fill, inside, outside)
   */
  const searchParams = new URLSearchParams(request.querystring);
  const { uri } = request;

  const [, imageName, extension] = uri.match(/\/?(.*)\.(.*)/);

  const width = parseInt(searchParams.get("w"), 10);
  const height = parseInt(searchParams.get("h"), 10);
  const quality = parseInt(searchParams.get("q"), 10) || DEFAULT_QUALITY;
  const type = searchParams.get("t") || DEFAULT_TYPE;
  const f = searchParams.get("f");
  const format = (f === "jpg" ? "jpeg" : f) || extension;

  if (!width || !height)
    return callback(null, response);

  try {
    const s3Object = await getS3Object(s3, BUCKET, imageName, extension);
    const resizedImage = await resizeImage(s3Object, width, height, format, type, quality);

    response.status = 200;
    response.body = resizedImage.toString("base64");
    response.bodyEncoding = "base64";
    response.headers["content-type"] = [
      {
        key: "Content-Type",
        value: `image/${format}`,
      },
    ];
    response.headers["cache-control"] = [
      {
        key: "cache-control",
        value: "max-age=31536000",
      },
    ];
    return callback(null, response);

  } catch (error) {
    console.error("handler error: ", error);
    response.status = 500;
    response.statusDescription = "Internal Server Error";
    response.headers["content-type"] = [
      {
        key: "Content-Type",
        value: "text/plain",
      },
    ];
    return callback(null, response);
  }
};

async function getS3Object(s3, bucket, imageName, extension) {
  try {
    const s3Object = await s3.getObject({
      Bucket: bucket,
      Key: decodeURI(imageName + "." + extension),
    }).promise();

    return s3Object;
  } catch (error) {
    console.error("s3.getObject error: ", error);
    throw new Error(error);
  }
}

async function resizeImage(s3Object, width, height, format, type, quality) {
  try {
    const resizedImage = await sharp(s3Object.Body)
      .resize(width, height, { fit: type })
      .withMetadata()
      .toFormat(format, {
        quality,
      })
      .toBuffer();

    return resizedImage;
  } catch (error) {
    console.error("resizeImage error: ", error);
    throw new Error(error);
  }
}