
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Heart, Calendar, Smile, Frown, Star, MessageCircleHeart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveCheckIn } from "@/services/supabaseApi";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckIn } from "@/types";

const formSchema = z.object({
  mood: z.number().min(1).max(10),
  highlight: z.string().min(3, "Please share at least a few words"),
  challenge: z.string().min(3, "Please share at least a few words"),
  gratitude: z.string().min(3, "Please share at least a few words"),
  needsSupport: z.boolean().default(false),
  supportDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DailyCheckIn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = format(new Date(), "EEEE, MMMM do");
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
      
      const checkInData = {
        user_id: user.uid,
        date: new Date().toISOString(),
        mood: values.mood,
        highlight: values.highlight,
        challenge: values.challenge,
        gratitude: values.gratitude,
        needs_support: values.needsSupport,
        support_details: values.needsSupport ? values.supportDetails : null,
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
    <div className="container max-w-3xl py-8 px-4 md:px-0">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Daily Relationship Check-in</h1>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <p>{today}</p>
        </div>
        <p className="text-gray-600 mt-2">Take a moment to reflect on your relationship today</p>
      </div>

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>How would you rate your mood today? (1-10)</FormLabel>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Frown className="h-5 w-5 text-red-500 mr-1" />
                          <span className="text-sm">Low</span>
                        </div>
                        <div className="flex items-center">
                          <Smile className="h-5 w-5 text-green-500 mr-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="text-center">
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {field.value}
                        </Badge>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="highlight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What was a highlight in your relationship today?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share a positive moment or experience..." 
                        {...field} 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Reflecting on positive moments helps strengthen your connection
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Did you face any relationship challenges today?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share any difficulties or tensions..." 
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Acknowledging challenges is the first step to addressing them
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gratitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you grateful for in your relationship right now?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Express appreciation for your partner..." 
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Practicing gratitude increases relationship satisfaction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="needsSupport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I need support with something specific</FormLabel>
                      <FormDescription>
                        Check this if you'd like to discuss something important with your partner
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {needsSupport && (
                <FormField
                  control={form.control}
                  name="supportDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What specific support do you need?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what you need help or support with..." 
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Being specific about your needs helps your partner understand how to support you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyCheckIn;
