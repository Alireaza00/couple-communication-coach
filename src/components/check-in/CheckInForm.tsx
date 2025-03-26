
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { saveCheckIn } from "@/services/supabaseApi";
import { MoodSlider } from "./MoodSlider";
import { TextAreaField } from "./TextAreaField";
import { SupportCheckbox } from "./SupportCheckbox";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkInSchema = z.object({
  mood: z.number().min(1).max(10),
  highlight: z.string().min(1, "Please share a highlight"),
  challenge: z.string().min(1, "Please share a challenge"),
  gratitude: z.string().min(1, "Please share something you're grateful for"),
  needsSupport: z.boolean(),
  supportDetails: z.string().optional(),
});

type CheckInFormValues = z.infer<typeof checkInSchema>;

export function CheckInForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      mood: 5,
      highlight: "",
      challenge: "",
      gratitude: "",
      needsSupport: false,
      supportDetails: "",
    },
  });

  const handleSubmit = async (values: CheckInFormValues) => {
    if (!user) {
      toast.error("You must be logged in to submit a check-in");
      navigate("/auth?mode=login");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const checkInData = {
        userId: user.uid, // Using uid instead of id
        user_id: user.uid, // Adding the snake_case version
        date: new Date().toISOString(),
        mood: values.mood,
        highlight: values.highlight,
        challenge: values.challenge,
        gratitude: values.gratitude,
        needsSupport: values.needsSupport,
        needs_support: values.needsSupport, // Adding the snake_case version
        supportDetails: values.needsSupport ? values.supportDetails : null,
        support_details: values.needsSupport ? values.supportDetails : null, // Adding the snake_case version
        created_at: new Date().toISOString(),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <MoodSlider control={form.control} />
        
        <TextAreaField
          control={form.control}
          name="highlight"
          label="What was a highlight of your relationship today?"
          placeholder="Share something positive that happened..."
          description="Focus on moments of connection and joy"
        />
        
        <TextAreaField
          control={form.control}
          name="challenge"
          label="What was challenging in your relationship today?"
          placeholder="Share a challenge you faced..."
          description="Being honest about challenges helps growth"
        />
        
        <TextAreaField
          control={form.control}
          name="gratitude"
          label="What are you grateful for in your relationship?"
          placeholder="Express gratitude for your partner or relationship..."
          description="Practicing gratitude strengthens bonds"
        />
        
        <SupportCheckbox control={form.control} />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Check-in"}
        </Button>
      </form>
    </Form>
  );
}
