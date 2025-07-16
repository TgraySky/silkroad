"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useGenerationContext } from "@/context/generation-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Upload,
  Camera,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
const Adsense = dynamic(() => import("@/components/Adsense"), { ssr: false })

export default function UploadPage() {
  const router = useRouter()
  const { setUploadedImageUrl, setGender, gender } = useGenerationContext()
  const [localImage, setLocalImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        setLocalImage(URL.createObjectURL(file))
        setIsUploading(true)
        setUploadSuccess(false)

        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Upload failed")
          }

          const result = await response.json()
          setUploadedImageUrl(result.url)
          setUploadSuccess(true)
        } catch (error) {
          console.error(error)
          alert("Image upload failed, please try again")
          setLocalImage(null)
        } finally {
          setIsUploading(false)
        }
      } else {
        alert("File size cannot exceed 5MB")
      }
    } else {
      alert("Please upload a JPG or PNG format image")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AI Photo Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              Upload Avatar
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              Choose Scene
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              Generate Photo
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Upload Your Avatar</h1>
          <p className="text-gray-600">
            Please upload a clear, front-facing photo, and we will generate a
            professional portrait for you.
          </p>
        </div>

        {/* 上传区域和广告位 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-pink-500 bg-pink-50" : "border-gray-300"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
              >
                {localImage ? (
                  <div className="space-y-4">
                    <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden">
                      <Image src={localImage} alt="Uploaded" fill className="object-cover" />
                    </div>
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Uploading and processing...
                      </div>
                    ) : uploadSuccess ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        Upload successful
                      </div>
                    ) : null}

                    {!isUploading && uploadSuccess && (
                      <div className="mt-4 space-y-4 text-center">
                        <p className="font-medium text-gray-700">
                          Please select your gender
                        </p>
                        <div className="flex justify-center gap-4">
                          <Button
                            variant={gender === "Male" ? "default" : "outline"}
                            onClick={() => handleGenderSelect("Male")}
                            className={`flex items-center gap-2 ${gender === "Male" ? "bg-pink-500 text-white" : ""}`}
                          >
                            <User className="w-4 h-4" />
                            Male
                          </Button>
                          <Button
                            variant={
                              gender === "Female" ? "default" : "outline"
                            }
                            onClick={() => handleGenderSelect("Female")}
                            className={`flex items-center gap-2 ${gender === "Female" ? "bg-pink-500 text-white" : ""}`}
                          >
                            <Users className="w-4 h-4" />
                            Female
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => {
                        setLocalImage(null)
                        setUploadSuccess(false)
                        setUploadedImageUrl(null)
                        setGender(null)
                      }}
                    >
                      Re-upload
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">
                        Drag and drop your image here
                      </p>
                      <p className="text-gray-500 mb-4">or</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
                      >
                        Select File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG formats, up to 5MB.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 广告位：上传页右侧 */}
          <div className="flex items-center justify-center">
            {/* TODO: 替换为你在AdSense后台新建的上传页广告slot */}
            <Adsense slot="上传页广告slot" />
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Upload Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Clear, front-facing photo</p>
                  <p className="text-sm text-gray-600">
                    Face should be clearly visible, without any obstructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Good lighting</p>
                  <p className="text-sm text-gray-600">
                    Avoid photos that are too dark or too bright.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">High resolution</p>
                  <p className="text-sm text-gray-600">
                    Recommended 500x500 pixels or more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Privacy Protection</h3>
              <p className="text-sm text-gray-600">
                Your photos will be securely encrypted and stored, used only
                for AI generation, and will not be used for other purposes.
                You can choose to delete the original image after generation
                is complete.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next Button */}
        {uploadSuccess && (
          <div className="text-center mt-8">
            <Button
              size="lg"
              disabled={!gender}
              onClick={() => router.push("/scenarios")}
              className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 disabled:opacity-50"
            >
              Next: Choose Scene
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {!gender && (
              <p className="text-sm text-red-500 mt-2">
                Please select a gender before proceeding.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
