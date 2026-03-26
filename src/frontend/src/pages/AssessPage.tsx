import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveProfile } from "../hooks/useQueries";

const SUGGESTED_SKILLS = [
  "Python",
  "JavaScript",
  "React",
  "SQL",
  "Excel",
  "Figma",
  "Communication",
  "Leadership",
  "Java",
  "TypeScript",
  "Node.js",
  "CSS",
  "HTML",
  "Git",
  "Machine Learning",
  "Data Analysis",
  "UX Design",
  "Project Management",
  "Agile",
  "Scrum",
];

export default function AssessPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;

  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: saveProfile, isPending } = useSaveProfile();

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setInputValue("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.replace(",", ""));
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please log in to save your profile");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }
    try {
      await saveProfile({ name: name.trim(), skills });
      toast.success("Profile saved! Finding your matches...");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-background px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="w-full max-w-md shadow-card border-border text-center"
              data-ocid="auth.dialog"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Sign In Required
                </h2>
                <p className="text-muted-foreground mb-6">
                  Log in to save your skill profile and get personalized job
                  matches.
                </p>
                <Button
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  className="w-full bg-primary text-white"
                  data-ocid="auth.login_button"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Log In to Continue"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Skill Assessment
              </h1>
              <p className="text-muted-foreground text-lg">
                Tell us who you are and what you know — we&apos;ll find the
                perfect matches.
              </p>
            </div>

            <Card
              className="shadow-card border-border"
              data-ocid="assess.panel"
            >
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="border-input"
                      data-ocid="assess.name_input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills-input" className="font-medium">
                      Your Skills
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Type a skill and press Enter or comma to add it.
                    </p>

                    <div
                      className="min-h-[80px] border border-input rounded-lg p-3 flex flex-wrap gap-2 cursor-text focus-within:ring-2 focus-within:ring-ring bg-white"
                      data-ocid="assess.skills_input"
                    >
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 pr-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                            aria-label={`Remove ${skill}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        ref={inputRef}
                        id="skills-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={skills.length === 0 ? "Add skills..." : ""}
                        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Suggestions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_SKILLS.filter((s) => !skills.includes(s))
                          .slice(0, 12)
                          .map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => addSkill(skill)}
                              className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                              data-ocid="assess.suggest_skill"
                            >
                              <Plus className="w-3 h-3" />
                              {skill}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90 py-3 text-base font-semibold"
                    disabled={isPending}
                    data-ocid="assess.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Finding Matches...
                      </>
                    ) : (
                      "Find My Job Matches"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
