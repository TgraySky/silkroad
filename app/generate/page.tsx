"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useGenerationContext } from "@/context/generation-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Download,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import JSZip from "jszip"
import dynamic from "next/dynamic"
const Adsense = dynamic(() => import("@/components/Adsense"), { ssr: false })

interface GeneratedScenario {
  id: number
  title: string
  icon: React.ElementType
  status: "generating" | "completed" | "error"
  images: any[] // TODO: better type
}

export default function GeneratePage() {
  const router = useRouter()
  const {
    uploadedImageUrl,
    selectedScenarios,
    generatedImages,
    setGeneratedImages,
    gender,
  } = useGenerationContext()

  const [individualProgress, setIndividualProgress] = useState<Record<number, number>>({})
  const [currentLog, setCurrentLog] = useState("Preparing to generate...")
  const [isCompleted, setIsCompleted] = useState(false)
  const [scenariosToRender, setScenariosToRender] = useState<GeneratedScenario[]>([])
  const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null)
  const [isZipping, setIsZipping] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [activeScenarioId, setActiveScenarioId] = useState<number | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!uploadedImageUrl || selectedScenarios.length === 0) {
      router.push("/scenarios")
      return
    }

    const initialProgress = selectedScenarios.reduce((acc, s) => {
        acc[s.id] = 0;
        return acc;
    }, {} as Record<number, number>);
    setIndividualProgress(initialProgress);

    setScenariosToRender(
      selectedScenarios.map((s) => ({
        id: s.id,
        title: s.title,
        icon: s.icon,
        status: "generating",
        images: [],
      })),
    )
    
    setSelectedScenarioId(selectedScenarios[0]?.id)

    generateAllScenarios()

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  const generateAllScenarios = async () => {
    for (const scenario of selectedScenarios) {
      setActiveScenarioId(scenario.id)
      setCurrentLog(`Generating ${scenario.title}...`)
      await generateSingleScenario(scenario)
    }

    setIsCompleted(true)
    setCurrentLog("All scenarios have been generated!")
    setCountdown(null)
    setActiveScenarioId(null)
  }

  const generateSingleScenario = (scenario: any) => {
    return new Promise<void>((resolve) => {
      // Countdown timer
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
      setCountdown(50)
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0))
      }, 1000)

      // Timer for visual progress
      const duration = 50 * 1000 // 50 seconds
      const intervalTime = 250 // update progress every 250ms
      const totalSteps = duration / intervalTime
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const scenarioProgress = (currentStep / totalSteps) * 100
        setIndividualProgress((prev) => ({
          ...prev,
          [scenario.id]: Math.min(scenarioProgress, 99), // Stop at 99%
        }))
        if (currentStep >= totalSteps) {
          clearInterval(timer)
        }
      }, intervalTime)

      // API call logic
      const params = new URLSearchParams({
        uploadedImageUrl: uploadedImageUrl!,
        prompt: scenario.prompt,
      })
      if (gender) {
        params.append("gender", gender)
      }
      const eventSource = new EventSource(`/api/generate?${params.toString()}`)

      const commonCleanup = () => {
        clearInterval(timer)
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
        }
        setIndividualProgress((prev) => ({ ...prev, [scenario.id]: 100 }))
        eventSource.close()
        resolve()
      }

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === "log") {
          const lastLog = data.logs?.[data.logs.length - 1]?.message || "Processing..."
          setCurrentLog(lastLog)
        }

        if (data.type === "result") {
          const images = data.images
          if (Array.isArray(images)) {
            setScenariosToRender((prev) =>
              prev.map((s) =>
                s.id === scenario.id
                  ? { ...s, status: "completed", images: images }
                  : s,
              ),
            )
            setGeneratedImages((currentImages) => [...currentImages, ...images])
          }
          commonCleanup()
        }

        if (data.type === "error") {
          setScenariosToRender((prev) =>
            prev.map((s) =>
              s.id === scenario.id ? { ...s, status: "error" } : s,
            ),
          )
          commonCleanup()
        }
      }

      eventSource.onerror = () => {
        setScenariosToRender((prev) =>
          prev.map((s) =>
            s.id === scenario.id ? { ...s, status: "error" } : s,
          ),
        )
        commonCleanup()
      }
    })
  }

  const handleDownloadAll = async () => {
    if (generatedImages.length === 0 || isZipping) return

    setIsZipping(true)
    try {
      const zip = new JSZip()
      const folder = zip.folder("ai-generated-photos")

      await Promise.all(
        generatedImages.map(async (image, index) => {
          const response = await fetch(image.url)
          const blob = await response.blob()
          folder?.file(image.file_name || `image_${index}.png`, blob)
        }),
      )

      const zipBlob = await zip.generateAsync({ type: "blob" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(zipBlob)
      link.download = "ai-photos.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Zipping and download failed:", error)
      alert("Failed to package for download")
    } finally {
      setIsZipping(false)
    }
  }

  if (!isCompleted) {
    const activeProgress = activeScenarioId
      ? individualProgress[activeScenarioId] || 0
      : 0
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Header and Progress UI */}
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold mb-4">AI is Generating Your Professional Photos</h1>
            <p className="text-gray-600 mb-8">Please wait a moment, we are creating your professional photos.</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{currentLog}</span>
                    {countdown !== null && !isCompleted ? (
                      <span className="text-sm text-gray-500 tabular-nums">
                        {countdown > 0 ? `~${countdown}s` : "Please wait..."}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">...</span>
                    )}
                  </div>
                  <Progress value={activeProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {scenariosToRender.map((scenario) => (
                    <div key={scenario.id} className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          scenario.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : scenario.status === "generating"
                              ? "bg-pink-100 text-pink-600 animate-pulse"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {scenario.status === "completed" ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <scenario.icon className="w-6 h-6" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{scenario.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-sm text-gray-500">
            <p>Please do not close the page during generation.</p>
          </div>
        </div>
      </div>
    )
  }

  const selectedScenario = scenariosToRender.find(
    (s) => s.id === selectedScenarioId,
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AI Photo Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                <Check className="w-3 h-3" />
              </div>
              Upload Avatar
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                <Check className="w-3 h-3" />
              </div>
              Choose Scene
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              Generate Photos
            </div>
          </div>
        </div>
      </header>

      {/* 生成进度条和广告位 */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 生成进度条内容 */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 border-r h-[calc(100vh-65px)] sticky top-[65px] p-6 flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Exclusive Photos are Ready!</h2>
              <p className="text-gray-600">Come and see the professional photos tailored for you!</p>
            </div>
            <div className="space-y-4 mb-8">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
                onClick={handleDownloadAll}
                disabled={isZipping}
              >
                <Download className="w-5 h-5 mr-2" />
                {isZipping ? "Packaging..." : `Download All (${generatedImages.length} images)`}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/upload")}
              >
                Generate Again
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Share2 className="w-5 h-5 mr-2" />
                Share with Friends
              </Button>
            </div>
            <div className="flex-grow overflow-y-auto -mr-6 pr-6">
              <h3 className="text-lg font-semibold mb-4">Scenarios</h3>
              <div className="space-y-2">
                {scenariosToRender.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedScenarioId === scenario.id ? "bg-pink-100" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedScenarioId(scenario.id)}
                  >
                    <div className={`p-2 rounded-lg ${
                      scenario.status === "completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {scenario.status === "completed" ? <Check className="w-5 h-5" /> : <scenario.icon className="w-5 h-5" />}
                    </div>
                    <span className="ml-3 font-medium">{scenario.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8 bg-gray-50">
            {selectedScenario && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold">{selectedScenario.title}</h2>
                  <div className="text-sm text-gray-500">
                    Generated in 75s
                  </div>
                </div>
                
                {selectedScenario.status === "completed" && (
                  <div className="grid grid-cols-2 gap-6">
                    {selectedScenario.images.map((image: any, index: number) => (
                      <Card key={index} className="overflow-hidden group">
                        <CardContent className="p-0 relative">
                          <Image
                            src={image.url}
                            alt={`${selectedScenario.title} - Image ${index + 1}`}
                            width={512}
                            height={512}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Button size="icon" variant="secondary">
                              <Download className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="secondary">
                              <Share2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedScenario.status === "error" && (
                  <div className="text-center py-20 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-semibold mb-4">Generation Failed</p>
                    <Button variant="outline" onClick={() => generateSingleScenario(selectedScenarios.find(s => s.id === selectedScenarioId))}>
                      Click to retry
                    </Button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

        {/* 广告位：生成页进度条下方 */}
        <div className="flex justify-center my-8">
          {/* TODO: 替换为你在AdSense后台新建的生成页广告slot */}
        </div>
      </div>
    </div>
  )
}
