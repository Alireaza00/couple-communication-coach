
import { Frown, Smile } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Control } from "react-hook-form";

interface MoodSliderProps {
  control: Control<any>;
}

export function MoodSlider({ control }: MoodSliderProps) {
  return (
    <FormField
      control={control}
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
  );
}
