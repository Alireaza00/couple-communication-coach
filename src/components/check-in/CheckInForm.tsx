
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveCheckIn } from "@/services/supabaseApi";
import { MessageCircleHeart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckIn } from "@/types";

import { MoodSlider } from "./MoodSlider";
import { TextAreaField } from "./TextAreaField";
import { SupportCheckbox } from "./SupportCheckbox";

const formSchema = z.object({
  mood: z.number().min(1).max(10),
  highlight: z.string().min(3, "Please share at least a few words"),
  challenge: z.string().min(3, "Please share at least a few words"),
  gratitude: z.string().min(3, "Please share at least a few words"),
  needsSupport: z.boolean().default(false),
  supportDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CheckInForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: 5,
      highlight: "",
      challenge: "",
      gratitude: "",
      needsSupport: false,
      supportDetails: "",
    },
  });

  const needsSupport = form.watch("needsSupport");

  const checkInMutation = useMutation({
    mutationFn: (values: FormValues) => {
      if (!user) {
        throw new Error("User must be logged in to submit a check-in");
      }
      
      const checkInData: Omit<CheckIn, "id"> = {
        userId: user.uid,
        user_id: user.uid,
        date: new Date().toISOString(),
        mood: values.mood,
        highlight: values.highlight,
        challenge: values.challenge,
        gratitude: values.gratitude,
        needsSupport: values.needsSupport,
        needs_support: values.needsSupport,
        supportDetails: values.needsSupport ? values.supportDetails : null,
        support_details: values.needsSupport ? values.supportDetails : null,
        created_at: new Date().toISOString()
      };
      
      return saveCheckIn(checkInData);
    },
    onSuccess: () => {
      toast.success("Your daily check-in has been saved!");
      queryClient.invalidateQueries({ queryKey: ['checkIns', user?.uid] });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error('Error saving check-in:', error);
      toast.error("Failed to save your check-in. Please try again.");
    }
  });

  const onSubmit = (values: FormValues) => {
    if (!user) {
      toast.error("Please sign in to save your check-in");
      return;
    }
    
    checkInMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <MoodSlider control={form.control} />

        <TextAreaField
          control={form.control}
          name="highlight"
          label="What was a highlight in your relationship today?"
          placeholder="Share a positive moment or experience..."
          description="Reflecting on positive moments helps strengthen your connection"
        />

        <TextAreaField
          control={form.control}
          name="challenge"
          label="Did you face any relationship challenges today?"
          placeholder="Share any difficulties or tensions..."
          description="Acknowledging challenges is the first step to addressing them"
        />

        <TextAreaField
          control={form.control}
          name="gratitude"
          label="What are you grateful for in your relationship right now?"
          placeholder="Express appreciation for your partner..."
          description="Practicing gratitude increases relationship satisfaction"
        />

        <SupportCheckbox control={form.control} />

        {needsSupport && (
          <TextAreaField
            control={form.control}
            name="supportDetails"
            label="What specific support do you need?"
            placeholder="Describe what you need help or support with..."
            description="Being specific about your needs helps your partner understand how to support you"
          />
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            <MessageCircleHeart className="mr-2 h-4 w-4" />
            Submit Daily Check-in
          </Button>
        </div>
      </form>
    </Form>
  );
}
