import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Clock, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { TIME_PERIOD_OPTIONS } from "../constants";

interface TimePeriodFilterProps {
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
  customDateRange: { from?: Date; to?: Date };
  onCustomDateChange: (range: { from?: Date; to?: Date }) => void;
}

export default function TimePeriodFilter({
  timePeriod,
  onTimePeriodChange,
  customDateRange,
  onCustomDateChange,
}: TimePeriodFilterProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900">Time Period:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={timePeriod} onValueChange={onTimePeriodChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_PERIOD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {timePeriod === "custom" && (
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateRange.from ? (
                      customDateRange.to ? (
                        <>
                          {format(customDateRange.from, "MMM dd")} -{" "}
                          {format(customDateRange.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(customDateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Select dates"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: customDateRange.from,
                      to: customDateRange.to,
                    }}
                    onSelect={(range) =>
                      onCustomDateChange({
                        from: range?.from,
                        to: range?.to,
                      })
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
