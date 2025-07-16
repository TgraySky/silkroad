import { NextResponse } from "next/server"
import { fal } from "@fal-ai/client"

interface QueueUpdate {
  status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED"
  logs?: { message: string }[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const uploadedImageUrl = searchParams.get("uploadedImageUrl")
  let prompt = searchParams.get("prompt")
  const gender = searchParams.get("gender")

  if (!uploadedImageUrl || !prompt) {
    return NextResponse.json(
      { error: "Missing uploadedImageUrl or prompt" },
      { status: 400 },
    )
  }

  if (gender) {
    const genderPrefix = gender.toLowerCase() === 'male' ? 'A photo of a man' : 'A photo of a woman';
    prompt = `${genderPrefix}, ${prompt}`;
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // @ts-ignore
        const result = await fal.subscribe("fal-ai/photomaker", {
          input: {
            image_archive_url: uploadedImageUrl,
            prompt: prompt,
            num_images: 4,
          },
          logs: true,
          onQueueUpdate(update: QueueUpdate) {
            if (update.logs) {
              controller.enqueue(
                `data: ${JSON.stringify({ type: "log", ...update })}\n\n`,
              )
            }
          },
        })

        controller.enqueue(
          `data: ${JSON.stringify({ type: "result", images: result.data.images })}\n\n`,
        )
        controller.close()
      } catch (error: any) {
        controller.enqueue(
          `data: ${JSON.stringify({ type: "error", message: error.message })}\n\n`,
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
} 