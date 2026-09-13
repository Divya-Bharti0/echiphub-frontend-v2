import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import { Hero } from './components/Hero'
import ActionChoiceSection from './components/ActionChoiceSection'
import { Stats, Highlights, Collaborations, Gallery } from './components/Sections'
import DiscoverSpotlight from './components/DiscoverSpotlight'
import LearningDashboard from './components/LearningDashboard'
import ExploreBySkill from './components/ExploreBySkill'
import CourseCatalog from './components/CourseCatalog'
import LearningRoadmap from './components/LearningRoadmap'
import VirtualLabs from './components/VirtualLabs'
import OpenSourceProjects from './components/OpenSourceProjects'
import GitHubHub from './components/GitHubHub'
import EDAToolsExplorer from './components/EDAToolsExplorer'
import TechnologyExplorer from './components/TechnologyExplorer'
import WorkshopsCatalog from './components/WorkshopsCatalog'
import DeveloperAchievements from './components/DeveloperAchievements'
import CommunitySection from './components/CommunitySection'
import RecommendedNextStep from './components/RecommendedNextStep'
import SiteAnalytics from './components/SiteAnalytics'
import Footer from './components/Footer'

import CourseDetailModal from './components/CourseDetailModal'
import LabSimulatorModal from './components/LabSimulatorModal'
import GlobalSearchModal from './components/GlobalSearchModal'

import { COURSES, VIRTUAL_LABS, Course, VirtualLab, CourseCategory, CourseLevel } from './lib/courseData'

export default function App() {
  // Course State & Enrollment
  const [courses, setCourses] = useState<Course[]>(COURSES)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseModalOpen, setCourseModalOpen] = useState<boolean>(false)

  // Virtual Lab Simulation State
  const [selectedLab, setSelectedLab] = useState<VirtualLab | null>(null)
  const [labModalOpen, setLabModalOpen] = useState<boolean>(false)

  // Global Search Modal State
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  // My Learning View Toggle
  const [showMyLearning, setShowMyLearning] = useState<boolean>(true)

  // Enrolled courses list
  const enrolledCourses = courses.filter(c => c.enrolled)

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle Enrollment Toggle
  const handleEnrollToggle = useCallback((courseId: number) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const isEnrolled = !c.enrolled
          return {
            ...c,
            enrolled: isEnrolled,
            progress: isEnrolled ? (c.progress || 10) : 0,
          }
        }
        return c
      })
    )
    // Also update selectedCourse if currently viewed
    setSelectedCourse(prev => {
      if (prev && prev.id === courseId) {
        const isEnrolled = !prev.enrolled
        return {
          ...prev,
          enrolled: isEnrolled,
          progress: isEnrolled ? (prev.progress || 10) : 0,
        }
      }
      return prev
    })
  }, [])

  // Open Course Detail Modal
  const handleSelectCourse = useCallback((course: Course) => {
    setSelectedCourse(course)
    setCourseModalOpen(true)
  }, [])

  // Open Lab Simulator Modal
  const handleOpenLab = useCallback((lab: VirtualLab) => {
    setSelectedLab(lab)
    setLabModalOpen(true)
  }, [])

  // Open Lab by Lab ID
  const handleOpenLabById = useCallback((labId: string) => {
    const lab = VIRTUAL_LABS.find(l => l.id === labId)
    if (lab) {
      setSelectedLab(lab)
      setLabModalOpen(true)
    }
  }, [])

  // Open Course by Course ID
  const handleOpenCourseById = useCallback((courseId: number) => {
    const c = courses.find(item => item.id === courseId)
    if (c) {
      setSelectedCourse(c)
      setCourseModalOpen(true)
    }
  }, [courses])

  // Filter triggers from Skill or Level selection
  const handleSelectSkill = (category: CourseCategory) => {
    scrollToSection('courses')
  }

  const handleSelectLevel = (level: CourseLevel) => {
    scrollToSection('courses')
  }

  return (
    <div className="w-full max-w-full min-h-screen antialiased bg-[#f6f8fc] text-[#1c1d1f] overflow-x-hidden">
      {/* ── Global Header & Navigation ── */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onToggleMyLearning={() => setShowMyLearning(v => !v)}
        showMyLearning={showMyLearning}
      />

      <main className="w-full max-w-full overflow-x-hidden">
        {/* Institutional Marquee Bulletin */}
        <Marquee />

        {/* 1. Interactive Hero (Build Your Chip Design Journey + RTL-GDSII flow picker) */}
        <Hero
          onExploreLearning={() => scrollToSection('courses')}
          onExploreProjects={() => scrollToSection('projects')}
        />

        {/* 2. "What do you want to do?" Action Choice Section */}
        <ActionChoiceSection onNavigate={scrollToSection} />

        {/* 3. Platform Statistics */}
        <Stats />

        {/* 4. "Discover Something New" Dynamic Spotlight */}
        <DiscoverSpotlight />

        {/* 5. "Your Learning Journey" Dashboard (Open edX Continuous Loop + Progress Tracks) */}
        {showMyLearning && (
          <LearningDashboard
            enrolledCourses={enrolledCourses}
            allCourses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenLab={handleOpenLabById}
            onExploreCourses={() => scrollToSection('courses')}
          />
        )}

        {/* 6. "What do you want to learn?" Skills & Level Explorer */}
        <ExploreBySkill
          onSelectSkill={handleSelectSkill}
          onSelectLevel={handleSelectLevel}
        />

        {/* 7. Open edX Course Discovery & Filtering Catalog */}
        <CourseCatalog
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />

        {/* 8. Interactive Semiconductor Roadmap (RTL → GDSII 9-Stage Flow) */}
        <LearningRoadmap
          onSelectCourse={handleSelectCourse}
          onOpenLab={handleOpenLab}
        />

        {/* 9. Interactive Virtual Laboratories with Live Statuses */}
        <VirtualLabs
          onOpenLab={handleOpenLab}
        />

        {/* 10. "Build Something Real" Open-Source Project Explorer */}
        <OpenSourceProjects
          onOpenLab={handleOpenLabById}
          onOpenCourse={handleOpenCourseById}
        />

        {/* 11. GitHub Projects & Repositories Hub */}
        <GitHubHub />

        {/* 12. EDA Tools Directory */}
        <EDAToolsExplorer
          onNavigateToCourses={() => scrollToSection('courses')}
          onNavigateToLabs={() => scrollToSection('labs')}
        />

        {/* 13. Technology Explorer Wall */}
        <TechnologyExplorer
          onSelectCourse={handleSelectCourse}
          onOpenLab={handleOpenLab}
        />

        {/* 14. Semiconductor Workshops Catalog */}
        <WorkshopsCatalog />

        {/* 15. Developer Achievements & Milestone Badges */}
        <DeveloperAchievements />

        {/* 16. Community & Open-Source Dashboard */}
        <CommunitySection />

        {/* 17. "What's Next?" Continuous Learning Recommender */}
        <RecommendedNextStep onNavigate={scrollToSection} />

        {/* 18. Academic & Industry Alliances */}
        <Collaborations />

        {/* 19. Site Analytics & Lab Activity */}
        <SiteAnalytics />

        {/* 20. Gallery of ChipCraft Virtual Labs */}
        <Gallery />

        {/* 21. Key Platform Highlights */}
        <Highlights />
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Modals & Dialogs ── */}
      {/* Open edX Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        open={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onEnrollToggle={handleEnrollToggle}
        onOpenLab={handleOpenLabById}
      />

      {/* Interactive Cloud Virtual Lab Simulator */}
      <LabSimulatorModal
        lab={selectedLab}
        open={labModalOpen}
        onClose={() => setLabModalOpen(false)}
      />

      {/* Global Unified Command Search Modal */}
      <GlobalSearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCourse={handleSelectCourse}
        onSelectLab={handleOpenLab}
        onSelectTech={() => scrollToSection('technologies')}
      />
    </div>
  )
}