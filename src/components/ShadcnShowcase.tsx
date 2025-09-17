"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { 
  Sparkles, 
  Zap, 
  Star, 
  Crown, 
  Flame, 
  Shield, 
  Rocket,
  Diamond,
  Trophy,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ShadcnShowcase() {
  const [progress, setProgress] = useState(75)
  const [isGlowing, setIsGlowing] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section with Insane Animations */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              SHADCN UI
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insane designs with advanced animations, gradients, and micro-interactions
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Glowing Hover Effect */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:animate-spin">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-cyan-300 transition-colors">
                  Glowing Magic
                </CardTitle>
              </div>
              <CardDescription className="text-gray-300 group-hover:text-white transition-colors">
                Hover for insane effects
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
                </div>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  This card transforms on hover with gradients, scaling, and glowing effects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Morphing Badges */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-emerald-300 transition-colors">
                  Morphing Badges
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Crown className="w-3 h-3 mr-1" />
                  Royal
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Diamond className="w-3 h-3 mr-1" />
                  Elite
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Interactive Progress */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-rose-900/50 to-pink-900/50 border-rose-500/20 hover:border-rose-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 group-hover:animate-bounce">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-rose-300 transition-colors">
                  Interactive Progress
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-3 bg-gray-700"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 transition-all duration-300 hover:scale-105"
                  >
                    -
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-105"
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Animated Tabs */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-violet-900/50 to-purple-900/50 border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 group-hover:rotate-12 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-violet-300 transition-colors">
                  Animated Tabs
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                  <TabsTrigger 
                    value="tab1" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
                  >
                    Tab 1
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tab2"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                  >
                    Tab 2
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tab3"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-300"
                  >
                    Tab 3
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                    <span>Fire content with animations!</span>
                  </div>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span>Protected content with shields!</span>
                  </div>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span>Winning content with trophies!</span>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Card 5: Glowing Input */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:animate-pulse">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-indigo-300 transition-colors">
                  Glowing Input
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <Input 
                placeholder="Type something magical..."
                className={cn(
                  "bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400",
                  "focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
                  "transition-all duration-300 hover:border-indigo-400",
                  isGlowing && "animate-pulse border-cyan-400 ring-2 ring-cyan-400/50"
                )}
                onFocus={() => setIsGlowing(true)}
                onBlur={() => setIsGlowing(false)}
              />
              <Button 
                onClick={() => setIsGlowing(!isGlowing)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Toggle Glow Effect
              </Button>
            </CardContent>
          </Card>

          {/* Card 6: Particle Effect Simulation */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:animate-spin">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-yellow-300 transition-colors">
                  Particle Effects
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="relative h-32 bg-gray-800/30 rounded-lg overflow-hidden">
                {/* Simulated particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-300 text-sm">Hover for magic!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Button 
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 animate-bounce"
          >
            <Sparkles className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
