// @ts-nocheck
import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'
import type { CollectionConfig, FileData, TypeWithID } from 'payload'

interface AdapterArgs {
  collection: CollectionConfig
  prefix?: string
}

interface GeneratedAdapter {
  name: string
  handleUpload: (args: {
    clientUploadContext: unknown
    collection: CollectionConfig
    data: any
    file: {
      filename: string
      buffer: Buffer
      mimeType?: string
      filesize?: number
      url?: string
    }
    req: any
  }) => Promise<Partial<FileData & TypeWithID> | void>
  handleDelete: (args: {
    collection: CollectionConfig
    doc: FileData & TypeWithID & { prefix?: string }
    filename: string
    req: any
  }) => Promise<void>
  staticHandler: (req: any, args: any) => Promise<Response> | Response
  generateURL?: (args: {
    collection: CollectionConfig
    data: any
    filename: string
    prefix?: string
  }) => Promise<string> | string
}

const cloudinaryAdapter = ({ prefix }: AdapterArgs): GeneratedAdapter => {
  // Configure cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const folder = prefix || 'yeblanca'

  return {
    name: 'cloudinary-adapter',

    handleUpload: async ({ file }: any) => {
      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: 'auto',
              public_id: file.filename.replace(/\.[^/.]+$/, ''),
              use_filename: true,
              unique_filename: false,
              overwrite: true,
            },
            (error, result) => {
              if (error || !result)
                return reject(error || new Error('No result'))
              resolve(result)
            },
          )

          stream.end(file.buffer)
        },
      )

      file.filename = uploadResult.public_id
      file.mimeType = uploadResult.format
      file.filesize = uploadResult.bytes
      file.url = uploadResult.secure_url
    },

    handleDelete: async ({ filename }: any) => {
      await cloudinary.uploader.destroy(`${folder}/${filename}`)
    },

    staticHandler: () => {
      return new Response('Not implemented', { status: 501 })
    },

    generateURL: ({ filename }: any) => {
      return cloudinary.url(`${folder}/${filename}`, {
        secure: true,
      })
    },
  } as any
}

export default cloudinaryAdapter