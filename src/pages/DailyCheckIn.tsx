
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckInHeader } from "@/components/check-in/CheckInHeader";
import { CheckInForm } from "@/components/check-in/CheckInForm";

const DailyCheckIn = () => {
  return (
    <div className="container max-w-3xl py-8 px-4 md:px-0">
      <CheckInHeader />

      <Card className="bg-white/80 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-500" />
            <span>How are you feeling today?</span>
          </CardTitle>
          <CardDescription>
            Your daily check-in helps build awareness and connection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CheckInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyCheckIn;
