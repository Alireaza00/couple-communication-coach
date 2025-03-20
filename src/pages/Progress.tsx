
import { useState } from "react";
import { 
  LineChart, 
  TrendingUp, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Brain,
  Activity,
  CheckCircle2,
  ArrowRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressGraph from "@/components/ProgressGraph";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Progress = () => {
  const [timeRange, setTimeRange] = useState("3m");
  
  const progressData = [
    { date: "Jan 5", overall: 65, communication: 60, emotional: 70, conflict: 55 },
    { date: "Jan 12", overall: 68, communication: 65, emotional: 72, conflict: 58 },
    { date: "Jan 19", overall: 64, communication: 62, emotional: 68, conflict: 62 },
    { date: "Jan 26", overall: 70, communication: 68, emotional: 73, conflict: 65 },
    { date: "Feb 2", overall: 72, communication: 70, emotional: 75, conflict: 68 },
    { date: "Feb 9", overall: 74, communication: 75, emotional: 77, conflict: 70 },
    { date: "Feb 16", overall: 73, communication: 72, emotional: 76, conflict: 72 },
    { date: "Feb 23", overall: 76, communication: 78, emotional: 78, conflict: 74 },
    { date: "Mar 2", overall: 78, communication: 80, emotional: 79, conflict: 75 },
    { date: "Mar 9", overall: 80, communication: 82, emotional: 80, conflict: 78 },
    { date: "Mar 16", overall: 83, communication: 85, emotional: 82, conflict: 80 },
    { date: "Mar 23", overall: 85, communication: 88, emotional: 84, conflict: 82 },
  ];
  
  const milestones = [
    {
      id: 1,
      title: "Communication Breakthrough",
      description: "You've reduced interruptions by 70% and increased active listening.",
      date: "Mar 10",
      icon: MessageSquare,
      category: "communication",
    },
    {
      id: 2,
      title: "Emotional Connection Deepened",
      description: "You're consistently expressing appreciation and affection.",
      date: "Feb 25",
      icon: Heart,
      category: "emotional",
    },
    {
      id: 3,
      title: "Conflict Resolution Improved",
      description: "You're using 'I' statements more often during disagreements.",
      date: "Feb 12",
      icon: Brain,
      category: "conflict",
    },
  ];
  
  const calculateImprovement = (metric: string) => {
    const dataLength = progressData.length;
    if (dataLength < 2) return 0;
    
    const latestValue = progressData[dataLength - 1][metric as keyof typeof progressData[0]] as number;
    const firstValue = progressData[0][metric as keyof typeof progressData[0]] as number;
    
    return latestValue - firstValue;
  };
  
  const handleExport = () => {
    toast.success("Progress report downloaded", {
      description: "Your relationship progress report has been saved to your device."
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Progress Tracking</h1>
                <p className="text-foreground/70 max-w-2xl">
                  Visualize your relationship improvements over time and celebrate your milestones.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">Last Month</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
          
          {/* Overview Section */}
          <section className="mb-12">
            <div className="glass rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-6">Relationship Progress Overview</h2>
              <ProgressGraph data={progressData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Overall Score */}
              <div className="glass rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Overall Score</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">85%</span>
                      <span className="ml-2 text-sm font-medium text-green-600">+{calculateImprovement("overall")}%</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              {/* Communication Score */}
              <div className="glass rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Communication</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">88%</span>
                      <span className="ml-2 text-sm font-medium text-green-600">+{calculateImprovement("communication")}%</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              
              {/* Emotional Connection */}
              <div className="glass rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Emotional Connection</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">84%</span>
                      <span className="ml-2 text-sm font-medium text-green-600">+{calculateImprovement("emotional")}%</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
              
              {/* Conflict Resolution */}
              <div className="glass rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Conflict Resolution</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">82%</span>
                      <span className="ml-2 text-sm font-medium text-green-600">+{calculateImprovement("conflict")}%</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Milestones Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Milestones</h2>
            <div className="relative">
              {/* Connect the milestones with a line */}
              <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-primary/20" aria-hidden="true"></div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.id} 
                    className="glass rounded-xl p-6 shadow-sm ml-10 relative"
                  >
                    <div 
                      className={cn(
                        "absolute -left-10 top-6 h-12 w-12 rounded-full flex items-center justify-center",
                        milestone.category === "communication" ? "bg-green-100" : 
                        milestone.category === "emotional" ? "bg-amber-100" : 
                        "bg-purple-100"
                      )}
                    >
                      <milestone.icon 
                        className={cn(
                          "h-6 w-6",
                          milestone.category === "communication" ? "text-green-600" : 
                          milestone.category === "emotional" ? "text-amber-600" : 
                          "text-purple-600"
                        )} 
                      />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{milestone.title}</h3>
                        <p className="text-foreground/70 mt-1">{milestone.description}</p>
                      </div>
                      <span className="text-sm text-foreground/60">{milestone.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Goals Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Relationship Goals</h2>
            <div className="glass rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Goal */}
                <div className="bg-white/80 rounded-lg p-5 border border-primary/20">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">Practice Active Listening</h3>
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 mt-2">
                    Complete 4 listening exercises this month to improve communication.
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">Progress</span>
                      <span className="text-xs font-medium">3/4 completed</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center bg-primary text-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-xs ml-2 text-foreground/70">No interruptions exercise</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center bg-primary text-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-xs ml-2 text-foreground/70">Paraphrasing practice</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center bg-primary text-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-xs ml-2 text-foreground/70">Empathetic response training</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                      <span className="text-xs ml-2 text-foreground/70">Emotional validation exercise</span>
                    </div>
                  </div>
                </div>
                
                {/* Next Goal */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">Develop Conflict Resolution Skills</h3>
                    <div className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                      Next Up
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 mt-2">
                    Learn and practice techniques for resolving disagreements constructively.
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">Starting in</span>
                      <span className="text-xs font-medium">2 weeks</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Preview Exercises
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Insights Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Most Improved Area</h3>
                  </div>
                  <p className="text-lg font-semibold mb-2">Communication Quality</p>
                  <p className="text-foreground/70 mb-4">
                    You've made significant progress in reducing interruptions and practicing active listening.
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    View Communication Analysis <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Brain className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Focus Area Recommendation</h3>
                  </div>
                  <p className="text-lg font-semibold mb-2">Conflict De-escalation</p>
                  <p className="text-foreground/70 mb-4">
                    Working on techniques to prevent conflicts from escalating could further strengthen your relationship.
                  </p>
                  <Button className="w-full flex items-center justify-center">
                    View Recommended Exercises <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
