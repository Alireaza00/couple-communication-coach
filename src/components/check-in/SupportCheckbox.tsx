
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

export interface SupportCheckboxProps {
  control: Control<any>;
}

export function SupportCheckbox({ control }: SupportCheckboxProps) {
  return (
    <>
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
              <FormLabel>I need support with something specific</FormLabel>
              <FormDescription>
                Check this if you'd like to discuss something important with your partner
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Conditionally render the support details field */}
      <FormField
        control={control}
        name="supportDetails"
        render={({ field }) => (
          <FormItem className="mt-4" style={{ display: field.value ? 'block' : 'none' }}>
            <FormLabel>What would you like support with?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Share what you'd like to discuss..." 
                {...field} 
                className="min-h-[100px]"
              />
            </FormControl>
            <FormDescription>
              Be specific about what you need from your partner
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
