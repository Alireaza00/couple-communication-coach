
import { useState } from "react";
import { 
  LineChart as LineChartIcon, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  Heart, 
  MessageSquare, 
  Activity,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressGraph from "@/components/ProgressGraph";
import CommunicationChart from "@/components/CommunicationChart";
import { useAuth } from "@/contexts/AuthContext";

const Progress = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");
  
  // Mock progress data
  const progressData = [
    { date: "Jan 1", overall: 65, communication: 60, emotional: 70, conflict: 65 },
    { date: "Jan 8", overall: 68, communication: 65, emotional: 72, conflict: 67 },
    { date: "Jan 15", overall: 70, communication: 75, emotional: 70, conflict: 65 },
    { date: "Jan 22", overall: 72, communication: 78, emotional: 72, conflict: 66 },
    { date: "Jan 29", overall: 75, communication: 80, emotional: 75, conflict: 70 },
    { date: "Feb 5", overall: 78, communication: 82, emotional: 78, conflict: 74 },
    { date: "Feb 12", overall: 80, communication: 85, emotional: 80, conflict: 75 },
    { date: "Feb 19", overall: 83, communication: 87, emotional: 82, conflict: 80 },
    { date: "Feb 26", overall: 85, communication: 85, emotional: 85, conflict: 85 },
    { date: "Mar 5", overall: 87, communication: 88, emotional: 87, conflict: 86 },
    { date: "Mar 12", overall: 90, communication: 92, emotional: 90, conflict: 88 },
  ];
  
  // Mock communication metrics
  const communicationMetrics = [
    { name: "Active Listening", value: 85, color: "#3B82F6" },
    { name: "Emotional Expression", value: 78, color: "#10B981" },
    { name: "Conflict Resolution", value: 72, color: "#F59E0B" },
    { name: "Non-verbal Communication", value: 88, color: "#8B5CF6" },
    { name: "Empathy", value: 90, color: "#EC4899" },
  ];
  
  const handleExportData = () => {
    // In a real app, this would generate a CSV or PDF report
    console.log("Exporting data...");
    alert("Report downloaded successfully!");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container max-w-6xl px-4 md:px-0">
          {/* Header Section */}
          <section className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Progress Tracking</h1>
              <p className="text-foreground/70 max-w-2xl">
                Monitor your relationship journey and see how your communication and connection have improved over time.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2"
              onClick={handleExportData}
            >
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </section>
          
          {/* Stats Overview Section */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">90%</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Communication Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+7%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Emotional Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+2%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conflict Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">88%</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+3%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Progress Chart Section */}
          <section className="mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Relationship Progress</CardTitle>
                  <p className="text-sm text-muted-foreground">Track your progress over time</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={timeframe === "week" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeframe("week")}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={timeframe === "month" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeframe("month")}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={timeframe === "year" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeframe("year")}
                  >
                    Year
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProgressGraph data={progressData} />
              </CardContent>
            </Card>
          </section>
          
          {/* Communication Metrics Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Communication Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed analysis of communication quality</p>
              </CardHeader>
              <CardContent>
                <CommunicationChart data={communicationMetrics} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Milestones</CardTitle>
                <p className="text-sm text-muted-foreground">Key achievements in your relationship</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">March 10, 2023</span>
                    </div>
                    <h3 className="font-medium">Conflict Resolution Level Up</h3>
                    <p className="text-sm text-muted-foreground">Successfully used the structured conflict resolution framework during a disagreement.</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">February 28, 2023</span>
                    </div>
                    <h3 className="font-medium">90-Day Check-in Completed</h3>
                    <p className="text-sm text-muted-foreground">Completed a comprehensive relationship assessment with significant improvements noted.</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">February 14, 2023</span>
                    </div>
                    <h3 className="font-medium">Emotional Awareness Achievement</h3>
                    <p className="text-sm text-muted-foreground">Both partners consistently practiced naming emotions during challenging conversations.</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">January 20, 2023</span>
                    </div>
                    <h3 className="font-medium">Communication Pattern Breakthrough</h3>
                    <p className="text-sm text-muted-foreground">Identified and changed a negative communication pattern that was causing frequent misunderstandings.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Featured Insights Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-full w-fit">
                    <Eye className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Active Listening Improvement</h3>
                  <p className="text-muted-foreground text-sm">
                    Your active listening skills have improved by 12% over the past month. Continue practicing by summarizing what your partner says before responding.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-green-100 text-green-700 p-2 rounded-full w-fit">
                    <Heart className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Emotional Connection Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    Your emotional connection has strengthened significantly. You're both more vulnerable and responsive to each other's needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-full w-fit">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">Conflict Resolution Patterns</h3>
                  <p className="text-muted-foreground text-sm">
                    You've shown consistent improvement in how you handle conflicts. Focus next on implementing repair attempts earlier in disagreements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
