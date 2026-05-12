import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'

const cloudinaryAdapter = () => ({
  name: 'cloudinary-adapter',

  async handleUpload({
    file,
  }: {
    file: {
      filename: string
      buffer: Buffer
      mimeType?: string
      filesize?: number
      url?: string
    }
  }) {
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'yeblanca',
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

  async handleDelete({ filename }: { filename: string }) {
    await cloudinary.uploader.destroy(`yeblanca/${filename}`)
  },

  staticHandler() {
    return new Response('Not implemented', { status: 501 })
  },
})

export default cloudinaryAdapter