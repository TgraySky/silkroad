import { NextResponse } from "next/server"
import { fal } from "@fal-ai/client"
import JSZip from "jszip"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const zip = new JSZip()
    const fileBuffer = await file.arrayBuffer()
    zip.file(file.name, fileBuffer)

    const zipBlob = await zip.generateAsync({ type: "blob" })

    const zipFile = new File([zipBlob], "images.zip", { type: "application/zip" })

    // @ts-ignore - The library seems to have some type definition issues
    const url = await fal.storage.upload(zipFile)

    return NextResponse.json({ url })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    )
  }
} 