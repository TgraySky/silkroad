"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface Scenario {
  id: number
  title: string
  description: string
  prompt: string
  icon: React.ElementType
}

interface GenerationContextType {
  uploadedImageUrl: string | null
  setUploadedImageUrl: (url: string | null) => void
  gender: string | null
  setGender: (gender: string | null) => void
  selectedScenarios: Scenario[]
  setSelectedScenarios: (scenarios: Scenario[]) => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
  generatedImages: any[]
  setGeneratedImages: React.Dispatch<React.SetStateAction<any[]>>
}

const GenerationContext = createContext<GenerationContextType | undefined>(
  undefined,
)

export function GenerationProvider({ children }: { children: ReactNode }) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [gender, setGender] = useState<string | null>(null)
  const [selectedScenarios, setSelectedScenarios] = useState<Scenario[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])

  return (
    <GenerationContext.Provider
      value={{
        uploadedImageUrl,
        setUploadedImageUrl,
        gender,
        setGender,
        selectedScenarios,
        setSelectedScenarios,
        isGenerating,
        setIsGenerating,
        generatedImages,
        setGeneratedImages,
      }}
    >
      {children}
    </GenerationContext.Provider>
  )
}

export function useGenerationContext() {
  const context = useContext(GenerationContext)
  if (context === undefined) {
    throw new Error("useGenerationContext must be used within a GenerationProvider")
  }
  return context
} 