import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ChampionshipRules from '@/components/ChampionshipRules'
import MasterClasses from '@/components/MasterClasses'
import Memories from '@/components/Memories'
import SocialMedia from '@/components/SocialMedia'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Loading Screen */}
      <LoadingScreen />
      {/* Cyber Grid Background */}
      <div className="cyber-grid"></div>

      {/* Glow Orbs (Световые блики) */}
      <div className="glow-orb orb-pink"></div>
      <div className="glow-orb orb-center"></div>
      <div className="glow-orb orb-blue"></div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="min-h-screen relative">
        <Hero />
        <ChampionshipRules />
        <MasterClasses />
        <Memories />
        <SocialMedia />
      </main>
    </div>
  )
}
