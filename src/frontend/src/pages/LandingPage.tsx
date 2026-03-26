import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle,
  ChevronRight,
  MapIcon,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: Brain,
    title: "Skill Assessment",
    description:
      "Take our comprehensive skill assessment to identify your strengths and areas for improvement across technical and soft skills.",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description:
      "Get matched with real internships and entry-level positions based on your current skill profile and career interests.",
  },
  {
    icon: MapIcon,
    title: "Personalized Roadmaps",
    description:
      "Receive customized learning paths with curated courses, projects, and milestones to bridge your skill gaps.",
  },
];

const steps = [
  {
    step: 1,
    icon: Brain,
    title: "Assess Skills",
    desc: "Tell us what you know",
  },
  {
    step: 2,
    icon: Briefcase,
    title: "Get Matched",
    desc: "See job fit percentages",
  },
  {
    step: 3,
    icon: MapIcon,
    title: "Learn & Grow",
    desc: "Follow your roadmap",
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Succeed",
    desc: "Land your dream role",
  },
];

const sampleJobs = [
  {
    title: "Software Engineer Intern",
    company: "TechCorp Solutions",
    category: "technology",
    match: 92,
    skills: ["React", "JavaScript", "Git"],
  },
  {
    title: "Data Analyst Trainee",
    company: "DataInsight Co.",
    category: "data",
    match: 88,
    skills: ["SQL", "Excel", "Python"],
  },
  {
    title: "UX Design Intern",
    company: "Creative Studio",
    category: "design",
    match: 95,
    skills: ["Figma", "UX Design", "CSS"],
  },
  {
    title: "Marketing Analyst",
    company: "GrowthLab Inc.",
    category: "business",
    match: 79,
    skills: ["Excel", "Communication", "Data Analysis"],
  },
];

const testimonials = [
  {
    name: "Aisha Patel",
    role: "CS Graduate, now at Meta",
    initials: "AP",
    color: "bg-blue-500",
    quote:
      "SkillPath showed me exactly which skills I was missing for my dream job. Within 3 months of following the roadmap, I landed an internship at Meta!",
  },
  {
    name: "Marcus Rivera",
    role: "Data Science Student",
    initials: "MR",
    color: "bg-green-500",
    quote:
      "I never realized how close I was to being job-ready. The match percentages gave me real confidence and a clear direction.",
  },
  {
    name: "Sophie Chen",
    role: "UX Design Graduate",
    initials: "SC",
    color: "bg-purple-500",
    quote:
      "The personalized learning roadmap saved me months of guessing. I knew exactly what to learn next and why it mattered.",
  },
];

const STARS = [0, 1, 2, 3, 4];

const categoryColors: Record<string, string> = {
  technology: "bg-blue-100 text-blue-700",
  data: "bg-green-100 text-green-700",
  design: "bg-purple-100 text-purple-700",
  business: "bg-orange-100 text-orange-700",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0B5E7A 0%, #2E86B6 60%, #1a6d9a 100%)",
        }}
      >
        {/* Decorative swooshes */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="absolute -top-20 -right-20 w-96 h-96 opacity-20"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="200" cy="200" r="200" fill="#F28C28" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-64 h-64 opacity-10"
            viewBox="0 0 300 300"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="150" cy="150" r="150" fill="#F6A23A" />
          </svg>
          <svg
            className="absolute top-1/2 left-1/3"
            viewBox="0 0 800 400"
            fill="none"
            aria-hidden="true"
            style={{
              width: "800px",
              height: "400px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <path
              d="M0 200 Q200 50 400 200 Q600 350 800 200"
              stroke="#F28C28"
              strokeWidth="2"
              strokeOpacity="0.3"
              fill="none"
            />
            <path
              d="M0 250 Q200 100 400 250 Q600 400 800 250"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.1"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                🎯 Career Guidance Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Navigate Your Career Path from Student to Professional
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                SkillPath analyzes your skills, matches you with real job
                opportunities, and creates a personalized learning roadmap to
                bridge the gap between where you are and where you want to be.
              </p>
              <Link to="/assess">
                <Button
                  size="lg"
                  className="bg-[#F28C28] hover:bg-[#F6A23A] text-white font-semibold px-8 py-3 text-base shadow-lg"
                  data-ocid="hero.primary_button"
                >
                  Start Your Assessment Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="/assets/generated/students-hero.dim_800x600.jpg"
                  alt="Students collaborating around a laptop"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-20" id="roadmaps">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How SkillPath Transforms Your Future
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three powerful tools working together to accelerate your career
              journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center p-6 shadow-card hover:shadow-card-hover transition-shadow border-border">
                  <CardContent className="pt-2">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary py-16 md:py-20" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unlock Your Career Potential
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four simple steps to go from uncertain to unstoppable.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {steps.map((step, i) => (
              <div key={step.step} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center w-40"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg mb-3">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                    Step {step.step}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    {step.desc}
                  </p>
                </motion.div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block w-6 h-6 text-primary/40 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Job Cards */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tailored Opportunities
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover positions that match your skill profile with real
              compatibility scores.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sampleJobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card
                  className="shadow-card hover:shadow-card-hover transition-all border-border h-full"
                  data-ocid={`jobs.item.${i + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        className={`text-xs ${categoryColors[job.category]}`}
                      >
                        {job.category}
                      </Badge>
                      <span className="text-2xl font-bold text-green-600">
                        {job.match}%
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-secondary text-foreground/70 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Link to="/assess">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs border-primary text-primary hover:bg-primary hover:text-white"
                        data-ocid={`jobs.view_roadmap.${i + 1}`}
                      >
                        View Roadmap
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from students who transformed their careers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="shadow-card border-border h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4" aria-label="5 stars">
                      {STARS.map((s) => (
                        <Star
                          key={s}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Quick Roadmap
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Get a personalized learning roadmap based on your skills and
                  target roles — completely free.
                </p>
                <Link to="/assess">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    data-ocid="cta.view_roadmap_button"
                  >
                    View Roadmap
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card
              className="shadow-card"
              style={{
                background: "linear-gradient(135deg, #0B5E7A, #2E86B6)",
              }}
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  Empower Your Career Now
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Join thousands of students who are actively building the
                  career they deserve.
                </p>
                <Link to="/assess">
                  <Button
                    className="bg-white text-primary hover:bg-white/90 font-semibold"
                    data-ocid="cta.signup_button"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
