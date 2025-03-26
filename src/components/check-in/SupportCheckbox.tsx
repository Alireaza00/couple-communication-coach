
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface SupportCheckboxProps {
  control: Control<any>;
}

export function SupportCheckbox({ control }: SupportCheckboxProps) {
  return (
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
  );
}
