
import {PutObjectCommand, s3Client}  from "@aws-sdk/client-s3"

import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

const s3client = new s3Client();

export const createUploadSignedurl = async({key,contentType})=>{
    const command = new PutObjectCommand({
        Bucket : 'cloudyappbucket',
        Key : key,
        ContentType : contentType
    })

    const signedurl  = await getSignedUrl(s3client,command,{
        expiresIn : 3600,
        signableHeaders  : new Set(["content-type"])
    })
    return signedurl;
}



export default s3client;