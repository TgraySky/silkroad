"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGenerationContext } from "@/context/generation-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  ArrowRight,
  Briefcase,
  Heart,
  Users,
  Dumbbell,
  UserCheck,
  MapPin,
  PartyPopper,
  GraduationCap,
  Church,
  Home,
  Clock,
  ImageIcon,
  Check,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
const Adsense = dynamic(() => import("@/components/Adsense"), { ssr: false })

const scenarios = [
  {
    id: 1,
    title: "Professional ID Photo",
    description: "Essential for job interviews, formal wear, white background.",
    icon: Briefcase,
    category: "Professional",
    prompt:
      "photo of a man img, professional linkedin profile picture, 25 years old, wearing a crisp black suit and a white shirt, clean-shaven, smiling, studio lighting, plain white background, high resolution, 8k",
  },
  {
    id: 2,
    title: "Social & Dating Profile",
    description: "Romantic coffee shop atmosphere.",
    icon: Heart,
    category: "Lifestyle",
    prompt:
      "photo of a man img, candid, sitting in a cozy coffee shop, warm lighting, holding a coffee mug, smiling gently, blurred background, film grain, cinematic",
  },
  {
    id: 3,
    title: "High-end Business Portrait",
    description: "Office/conference room background.",
    icon: Users,
    category: "Professional",
    prompt:
      "photo of a man img, corporate headshot, in a modern office setting, confident expression, wearing a navy blue blazer, cityscape in the background through a window, professional lighting",
  },
  {
    id: 4,
    title: "Fitness/Workout Photo",
    description: "Professional gym background.",
    icon: Dumbbell,
    category: "Professional",
    prompt:
      "photo of a man img, athletic, in a gym, lifting weights, focused expression, wearing workout clothes, dynamic lighting, action shot, muscular",
  },
  {
    id: 5,
    title: "Professional Branding Photo",
    description: "Professional environment (e.g., doctor, lawyer).",
    icon: UserCheck,
    category: "Professional",
    prompt:
      "photo of a man img, as a doctor in a modern clinic, wearing a white coat, stethoscope around the neck, warm and trustworthy smile, bright and clean environment",
  },
  {
    id: 6,
    title: "Travel Snapshot",
    description: "Famous landmark background.",
    icon: MapPin,
    category: "Lifestyle",
    prompt:
      "photo of a man img, traveler, standing in front of the Eiffel Tower, daytime, happy expression, casual travel attire, wide-angle shot, vibrant colors",
  },
  {
    id: 7,
    title: "Holiday/Celebration Photo",
    description: "Birthday/holiday background.",
    icon: PartyPopper,
    category: "Lifestyle",
    prompt:
      "photo of a man img, celebrating birthday, wearing a party hat, surrounded by balloons and confetti, joyful expression, blowing out candles on a cake, colorful",
  },
  {
    id: 8,
    title: "Graduation Photo",
    description: "Campus background, academic regalia.",
    icon: GraduationCap,
    category: "Special Occasion",
    prompt:
      "photo of a man img, graduate, wearing a cap and gown, holding a diploma, standing on a university campus, proud smile, sunny day, classic architecture in the background",
  },
  {
    id: 9,
    title: "Wedding Preview Photo",
    description: "Church/outdoor background.",
    icon: Church,
    category: "Special Occasion",
    prompt:
      "photo of a man img, as a groom, wearing a tuxedo, standing in a beautiful garden decorated for a wedding, romantic atmosphere, soft lighting, elegant",
  },
  {
    id: 10,
    title: "Family Portrait",
    description: "Family group photo background.",
    icon: Home,
    category: "Special Occasion",
    prompt:
      "photo of a man img, as part of a family portrait, in a cozy living room, smiling happily, casual clothing, warm and loving atmosphere",
  },
]

export default function ScenariosPage() {
  const router = useRouter()
  const { uploadedImageUrl, selectedScenarios, setSelectedScenarios } =
    useGenerationContext()
  const [localSelection, setLocalSelection] = useState<number[]>([])
  const maxSelections = 1

  useEffect(() => {
    if (!uploadedImageUrl) {
      router.push("/upload")
    }
  }, [uploadedImageUrl, router])

  const toggleScenario = (id: number) => {
    setLocalSelection((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < maxSelections
          ? [...prev, id]
          : prev
      
      const newSelectedScenarios = scenarios.filter(s => newSelection.includes(s.id));
      setSelectedScenarios(newSelectedScenarios);
      return newSelection
    })
  }

  const getTotalTime = () => {
    return selectedScenarios.length * 75
  }

  const getTotalImages = () => {
    return selectedScenarios.length * 4
  }
  
  const handleNext = () => {
    if (selectedScenarios.length > 0) {
      router.push("/generate")
    } else {
      alert("Please select at least one scene")
    }
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
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                <Check className="w-3 h-3" />
              </div>
              Upload Avatar
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              Choose Scene
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              Generate Photos
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Generation Scene</h1>
          <p className="text-gray-600 mb-4">
            Select up to {maxSelections} scene(s). Each scene will generate 4
            different styles of photos.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <ImageIcon className="w-4 h-4 mr-2" />
              Selected {selectedScenarios.length}/{maxSelections}
            </Badge>
            {selectedScenarios.length > 0 && (
              <>
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Estimated {getTotalTime()} seconds
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Generating {getTotalImages()} photos
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {scenarios.map((scenario) => {
            const isSelected = localSelection.includes(scenario.id)
            const isDisabled = !isSelected && localSelection.length >= maxSelections

            return (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-pink-500 shadow-lg"
                    : isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                }`}
                onClick={() => !isDisabled && toggleScenario(scenario.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100`}>
                      <scenario.icon className="w-6 h-6" />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{scenario.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 h-10">
                    {scenario.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="font-normal text-gray-500"
                  >
                    {scenario.category}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 广告位：场景选择页下方 */}
        <div className="flex justify-center my-8">
          {/* TODO: 替换为你在AdSense后台新建的场景页广告slot */}
          <Adsense slot="场景页广告slot" />
        </div>

        {/* Next Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 px-8"
            onClick={handleNext}
            disabled={localSelection.length === 0}
          >
            {localSelection.length > 0
              ? `Next: Generate Photos (${localSelection.length} scene${localSelection.length > 1 ? "s" : ""} selected)`
              : "Choose a Scene"}
          </Button>
        </div>
      </div>
    </div>
  )
}
