import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, Briefcase, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetJobsByPercent, useGetStudentProfile } from "../hooks/useQueries";

const SKELETON_ITEMS = [0, 1, 2, 3, 4, 5];

const categoryColors: Record<string, string> = {
  technology: "bg-blue-100 text-blue-700",
  data: "bg-green-100 text-green-700",
  design: "bg-purple-100 text-purple-700",
  business: "bg-orange-100 text-orange-700",
  cybersecurity: "bg-red-100 text-red-700",
};

function getMatchColor(pct: number): string {
  if (pct >= 80) return "text-green-600";
  if (pct >= 50) return "text-yellow-600";
  return "text-red-500";
}

function getProgressColor(pct: number): string {
  if (pct >= 80) return "[&>div]:bg-green-500";
  if (pct >= 50) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-red-500";
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: profile, isLoading: profileLoading } = useGetStudentProfile();
  const { data: jobs, isLoading: jobsLoading } = useGetJobsByPercent();

  useEffect(() => {
    if (!profileLoading && profile && !profile.name) {
      navigate({ to: "/assess" });
    }
  }, [profile, profileLoading, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-background px-4">
          <Card
            className="w-full max-w-md shadow-card text-center"
            data-ocid="auth.dialog"
          >
            <CardContent className="p-8">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Sign In Required
              </h2>
              <p className="text-muted-foreground mb-6">
                Log in to view your personalized job matches.
              </p>
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full bg-primary text-white"
                data-ocid="auth.login_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {profileLoading
                    ? "Loading..."
                    : `Welcome back, ${profile?.name || "Student"}!`}
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here are your personalized job matches based on your skills.
                </p>
              </div>
              <Link to="/assess">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  data-ocid="dashboard.update_skills_button"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Update Skills
                </Button>
              </Link>
            </div>

            {profile?.skills && profile.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>

          {jobsLoading ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="dashboard.loading_state"
            >
              {SKELETON_ITEMS.map((n) => (
                <Card key={n} className="shadow-card border-border">
                  <CardContent className="p-5">
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <Skeleton className="h-3 w-1/2 mb-4" />
                    <Skeleton className="h-2 w-full mb-2" />
                    <Skeleton className="h-8 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((match, i) => {
                const pct = Number(match.matchPercent);
                return (
                  <motion.div
                    key={match.job.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    data-ocid={`jobs.item.${i + 1}`}
                  >
                    <Card className="shadow-card hover:shadow-card-hover transition-all border-border h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            className={`text-xs ${categoryColors[match.job.category] ?? "bg-gray-100 text-gray-700"}`}
                          >
                            {match.job.category}
                          </Badge>
                          <span
                            className={`text-2xl font-bold ${getMatchColor(pct)}`}
                          >
                            {pct}%
                          </span>
                        </div>

                        <h3 className="font-semibold text-foreground mb-1">
                          {match.job.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {match.job.company}
                        </p>

                        <Progress
                          value={pct}
                          className={`h-2 mb-3 ${getProgressColor(pct)}`}
                        />

                        <div className="text-xs text-muted-foreground mb-4">
                          {match.job.requiredSkills.length -
                            match.missingSkills.length}{" "}
                          of {match.job.requiredSkills.length} skills matched
                        </div>

                        <Link
                          to="/job/$title"
                          params={{
                            title: encodeURIComponent(match.job.title),
                          }}
                        >
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20" data-ocid="jobs.empty_state">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No matches yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete your skill assessment to see personalized job matches.
              </p>
              <Link to="/assess">
                <Button
                  className="bg-primary text-white"
                  data-ocid="jobs.assess_button"
                >
                  Start Assessment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
