import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetJobsByPercent } from "../hooks/useQueries";

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

export default function JobDetailPage() {
  const { title } = useParams({ from: "/job/$title" });
  const decodedTitle = decodeURIComponent(title);
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: jobs, isLoading } = useGetJobsByPercent();
  const match = jobs?.find((m) => m.job.title === decodedTitle);

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
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Sign In Required
              </h2>
              <p className="text-muted-foreground mb-6">
                Log in to view your job roadmap.
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background py-10 px-4">
          <div
            className="container mx-auto max-w-3xl"
            data-ocid="job.loading_state"
          >
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-10 w-2/3 mb-3" />
            <Skeleton className="h-5 w-1/3 mb-8" />
            <Skeleton className="h-32 w-full mb-6" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background py-10 px-4">
          <div
            className="container mx-auto max-w-3xl text-center py-20"
            data-ocid="job.error_state"
          >
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Job not found
            </h2>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find this job in your matches.
            </p>
            <Link to="/dashboard">
              <Button
                className="bg-primary text-white"
                data-ocid="job.back_button"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pct = Number(match.matchPercent);
  const matchedSkills = match.job.requiredSkills.filter(
    (s) => !match.missingSkills.includes(s),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              data-ocid="job.back_button"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            {/* Header */}
            <Card className="shadow-card border-border mb-6">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                  <div>
                    <Badge
                      className={`mb-2 ${categoryColors[match.job.category] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {match.job.category}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      {match.job.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {match.job.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getMatchColor(pct)}`}>
                      {pct}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Match Score
                    </div>
                  </div>
                </div>

                <Progress
                  value={pct}
                  className={`h-3 mb-3 ${
                    pct >= 80
                      ? "[&>div]:bg-green-500"
                      : pct >= 50
                        ? "[&>div]:bg-yellow-500"
                        : "[&>div]:bg-red-500"
                  }`}
                />

                <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                  {match.job.description}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {/* Matched */}
              <Card className="shadow-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Matched Skills ({matchedSkills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {matchedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-green-100 text-green-700 border-green-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No skills matched yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Missing */}
              <Card className="shadow-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    Skills to Learn ({match.missingSkills.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {match.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {match.missingSkills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-red-100 text-red-700 border-red-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You have all required skills! 🎉
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Learning Resources */}
            {match.missingResources.length > 0 && (
              <Card
                className="shadow-card border-border"
                data-ocid="job.resources_section"
              >
                <CardHeader>
                  <CardTitle className="text-lg">Learning Resources</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Curated courses to help you build missing skills.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {match.missingResources.map((resource, i) => (
                      <motion.div
                        key={`${resource.courseName}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="flex items-start justify-between p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary/50 transition-colors"
                        data-ocid={`job.resource.item.${i + 1}`}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">
                            {resource.courseName}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {resource.provider}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {Number(resource.estimatedHours)}h estimated
                            </span>
                          </div>
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                            data-ocid={`job.resource.link.${i + 1}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {match.missingSkills.length === 0 && (
              <Card className="shadow-card border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    You&apos;re Ready to Apply!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    You have all the required skills for this position. Go for
                    it!
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
