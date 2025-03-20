
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Brain, 
  LineChart, 
  Calendar, 
  Clock, 
  Mic, 
  Heart, 
  RefreshCw, 
  CheckCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="glass rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Welcome back, Jessica</h1>
                  <p className="mt-2 text-foreground/70">Let's continue improving your communication today.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground/70">Partner:</span>
                  <span className="flex items-center text-sm font-medium">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mr-2">M</span>
                    Mark
                  </span>
                  <span className="inline-flex items-center rounded-full bg-mint-100 px-2.5 py-0.5 text-xs font-medium text-mint-600">
                    <CheckCircle className="h-3 w-3 mr-1" /> Connected
                  </span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-3">Your communication score</h3>
                  <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-foreground/70">
                    <span>0</span>
                    <span className="font-medium text-primary">78%</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleToggleRecording}
                    variant={isRecording ? "destructive" : "default"}
                    className={cn(
                      "h-12 px-6 flex items-center gap-2",
                      isRecording && "animate-pulse"
                    )}
                  >
                    {isRecording ? (
                      <>
                        <span className="relative flex h-3 w-3 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5" /> Start Recording
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" className="h-12 px-6 border-primary/20">
                    <RefreshCw className="h-5 w-5 mr-2" /> Daily Check-in
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Quick Actions Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/analysis" className="glass rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                <div className="feature-icon mb-4">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Communication Analysis</h3>
                <p className="mt-2 text-sm text-foreground/70">Review your latest conversation insights</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  View analysis <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
              
              <Link to="/interventions" className="glass rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                <div className="feature-icon mb-4">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Today's Exercise</h3>
                <p className="mt-2 text-sm text-foreground/70">Complete your daily communication practice</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  Start exercise <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
              
              <Link to="/date-night" className="glass rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                <div className="feature-icon mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Plan Date Night</h3>
                <p className="mt-2 text-sm text-foreground/70">Get personalized date ideas for this week</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  See suggestions <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
              
              <Link to="/progress" className="glass rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                <div className="feature-icon mb-4">
                  <LineChart className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Track Progress</h3>
                <p className="mt-2 text-sm text-foreground/70">View your relationship improvement metrics</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  See progress <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            </div>
          </section>
          
          {/* Recent Activity Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="glass rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="p-6 flex items-start">
                  <div className="bg-ocean-100 rounded-full p-2 mr-4">
                    <MessageSquare className="h-5 w-5 text-ocean-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Communication Analysis</h3>
                      <span className="text-sm text-foreground/60 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> 2 hours ago
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      Your last conversation showed improved active listening skills.
                    </p>
                    <div className="mt-3 text-sm">
                      <Link to="/analysis" className="text-primary font-medium">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex items-start">
                  <div className="bg-love-100 rounded-full p-2 mr-4">
                    <Heart className="h-5 w-5 text-love-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Emotional Check-in</h3>
                      <span className="text-sm text-foreground/60 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Yesterday
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      You both shared your feelings about work stress and made a plan to support each other.
                    </p>
                    <div className="mt-3 text-sm">
                      <Link to="/progress" className="text-primary font-medium">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex items-start">
                  <div className="bg-mint-100 rounded-full p-2 mr-4">
                    <Calendar className="h-5 w-5 text-mint-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Date Night Completed</h3>
                      <span className="text-sm text-foreground/60 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> 3 days ago
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      You enjoyed a cooking class together. How would you rate the experience?
                    </p>
                    <div className="mt-3 flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button 
                          key={rating}
                          className="text-gray-300 hover:text-yellow-400"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Next Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Weekly Challenge</h3>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Practice "appreciation communication" by sharing one thing you appreciate about your partner each day this week.
                  </p>
                  <Button className="w-full">Start Challenge</Button>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Brain className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Recommended Resource</h3>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    "Active Listening: How to really hear what your partner is saying" - A 5-minute read that can transform your conversations.
                  </p>
                  <Button variant="outline" className="w-full">Read Article</Button>
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

export default Dashboard;
