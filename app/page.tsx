"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Sparkles, Users, Briefcase, Heart, GraduationCap } from "lucide-react"
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
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Social & Dating Profile",
    description: "Romantic coffee shop atmosphere.",
    icon: Heart,
    category: "Lifestyle",
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 3,
    title: "Business Portrait",
    description: "High-end office background.",
    icon: Users,
    category: "Professional",
    color: "bg-gray-50 text-gray-600",
  },
  {
    id: 4,
    title: "Graduation Photo",
    description: "Campus background with graduation attire.",
    icon: GraduationCap,
    category: "Special Occasion",
    color: "bg-green-50 text-green-600",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % scenarios.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AI Photo Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
            AI-Powered Professional Portraits
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional photos for various scenarios with one click —
            perfect for job applications, social media, and commemorative shots.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              60-Second Fast Generation
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Camera className="w-4 h-4 mr-2" />
              10+ Professional Scenarios
            </Badge>
          </div>
          <Link href="/upload">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-lg px-8 py-6 rounded-full"
            >
              Start Generating Your Photos
            </Button>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${scenarios[currentSlide].color}`}
                >
                  {(() => {
                    const IconComponent = scenarios[currentSlide].icon
                    return <IconComponent className="w-4 h-4" />
                  })()}
                  {scenarios[currentSlide].category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{scenarios[currentSlide].title}</h3>
                <p className="text-gray-600">{scenarios[currentSlide].description}</p>
              </div>

              <div className="flex gap-2">
                {scenarios.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-pink-500" : "bg-gray-300"}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    {(() => {
                      const IconComponent = scenarios[currentSlide].icon
                      return <IconComponent className="w-16 h-16 text-gray-400" />
                    })()}
                  </div>
                  <p className="text-gray-600">Generated Image Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google AdSense 广告位 */}
      <Adsense slot="8420577119" />

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Generation</h3>
                <p className="text-gray-600">
                  Advanced AI technology generates professional-grade photos in
                  60 seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multiple Scenarios</h3>
                <p className="text-gray-600">
                  10+ professional scenarios to meet all your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
                <p className="text-gray-600">
                  High-definition output with results comparable to a
                  professional photographer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
                <p className="text-gray-600 mb-6">
                  Experience the magic of AI generation.
                </p>
                <div className="text-3xl font-bold mb-6">¥0</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>2
                    scenarios per day
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Generate 8 photos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Includes watermark
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Start for Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-pink-500 to-orange-400">
                  Recommended
                </Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pro Version</h3>
                <p className="text-gray-600 mb-6">Unlock all features.</p>
                <div className="text-3xl font-bold mb-6">¥19.9</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    All scenarios, unlimited access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    HD, no watermark
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Priority generation queue
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">AI Photo Studio</h4>
              <p className="text-gray-400 text-sm">
                Generate professional photos instantly.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scenarios"
                    className="text-gray-400 hover:text-white"
                  >
                    Scenarios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 AI Photo Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
