
import React from "react";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

export interface SupportCheckboxProps {
  control: Control<any>;
}

export const SupportCheckbox = ({ control }: SupportCheckboxProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
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
              <FormLabel>
                I could use some extra support today
              </FormLabel>
              <FormDescription>
                Check this if you'd like your partner to know you need extra support
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      {/* Show textarea only if needs support is checked */}
      <FormField
        control={control}
        name="supportDetails"
        render={({ field }) => (
          <FormItem className="hidden-form-item">
            <FormControl>
              <Textarea
                placeholder="What kind of support would be helpful today?"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
