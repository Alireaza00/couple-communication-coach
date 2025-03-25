
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, Calendar, Smile, Frown, Star, MessageCircleHeart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckIn } from "@/types";
import { getCheckIns } from "@/services/supabaseApi";
import { useQuery } from "@tanstack/react-query";

const CheckInHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: checkIns = [], isLoading, error } = useQuery({
    queryKey: ['checkIns', user?.uid],
    queryFn: () => user ? getCheckIns(user.uid) : Promise.resolve([]),
    enabled: !!user,
  });

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return "😄";
    if (mood >= 6) return "🙂";
    if (mood >= 4) return "😐";
    if (mood >= 2) return "🙁";
    return "😞";
  };

  const navigateToCheckIn = () => {
    navigate("/daily-check-in");
  };

  // Check if user has completed a check-in today
  const hasCheckedInToday = () => {
    if (checkIns.length === 0) return false;
    
    const today = new Date().setHours(0, 0, 0, 0);
    const latestCheckInDate = new Date(checkIns[0].date).setHours(0, 0, 0, 0);
    
    return today === latestCheckInDate;
  };

  return (
    <Card className="bg-white/80 shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-500" />
            <span>Relationship Check-ins</span>
          </div>
        </CardTitle>
        
        <Button 
          onClick={navigateToCheckIn}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {hasCheckedInToday() ? "Update Today's Check-in" : "Complete Today's Check-in"}
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading check-ins...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error loading check-ins. Please try again.</p>
          </div>
        ) : checkIns.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircleHeart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No check-ins yet</h3>
            <p className="text-gray-500 mb-4">
              Start your daily relationship reflection to build a stronger connection.
            </p>
            <Button 
              onClick={navigateToCheckIn}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Complete Your First Check-in
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {checkIns.slice(0, 5).map((checkIn) => (
              <div key={checkIn.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(checkIn.date), { addSuffix: true })}
                    </span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <span className="mr-1">{getMoodEmoji(checkIn.mood)}</span>
                    Mood: {checkIn.mood}/10
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500" />
                      Highlight
                    </h4>
                    <p className="text-sm pl-5">{checkIn.highlight}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Frown className="h-3.5 w-3.5 text-orange-500" />
                      Challenge
                    </h4>
                    <p className="text-sm pl-5">{checkIn.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Smile className="h-3.5 w-3.5 text-green-500" />
                      Gratitude
                    </h4>
                    <p className="text-sm pl-5">{checkIn.gratitude}</p>
                  </div>
                  
                  {checkIn.needs_support && (
                    <div>
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <MessageCircleHeart className="h-3.5 w-3.5 text-red-500" />
                        Support Needed
                      </h4>
                      <p className="text-sm pl-5">{checkIn.support_details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {checkIns.length > 5 && (
              <div className="text-center pt-2">
                <Button variant="outline" className="text-purple-600 border-purple-200">
                  View All Check-ins
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckInHistory;
