
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { saveCheckIn } from "@/services/supabaseApi";
import { MoodSlider } from "./MoodSlider";
import { TextAreaField } from "./TextAreaField";
import { SupportCheckbox } from "./SupportCheckbox";

export function CheckInForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState<number>(5);
  const [highlight, setHighlight] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [gratitude, setGratitude] = useState<string>("");
  const [needsSupport, setNeedsSupport] = useState<boolean>(false);
  const [supportDetails, setSupportDetails] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit a check-in");
      navigate("/auth?mode=login");
      return;
    }
    
    if (!highlight || !challenge || !gratitude) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const checkInData = {
        userId: user.id,
        date: new Date().toISOString(),
        mood,
        highlight,
        challenge,
        gratitude,
        needsSupport,
        supportDetails: needsSupport ? supportDetails : null,
      };
      
      await saveCheckIn(checkInData);
      
      toast.success("Check-in submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting check-in:", error);
      toast.error("Failed to submit check-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MoodSlider mood={mood} setMood={setMood} />
      
      <TextAreaField
        label="What was a highlight of your relationship today?"
        value={highlight}
        onChange={setHighlight}
        placeholder="Share something positive that happened..."
        maxLength={500}
      />
      
      <TextAreaField
        label="What was challenging in your relationship today?"
        value={challenge}
        onChange={setChallenge}
        placeholder="Share a challenge you faced..."
        maxLength={500}
      />
      
      <TextAreaField
        label="What are you grateful for in your relationship?"
        value={gratitude}
        onChange={setGratitude}
        placeholder="Express gratitude for your partner or relationship..."
        maxLength={500}
      />
      
      <SupportCheckbox
        needsSupport={needsSupport}
        setNeedsSupport={setNeedsSupport}
        supportDetails={supportDetails}
        setSupportDetails={setSupportDetails}
      />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Check-in"}
      </Button>
    </form>
  );
}
