
import { Calendar, Heart } from "lucide-react";
import { format } from "date-fns";

export function CheckInHeader() {
  const today = format(new Date(), "EEEE, MMMM do");
  
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Daily Relationship Check-in</h1>
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <Calendar className="h-4 w-4" />
        <p>{today}</p>
      </div>
      <p className="text-gray-600 mt-2">Take a moment to reflect on your relationship today</p>
    </div>
  );
}
