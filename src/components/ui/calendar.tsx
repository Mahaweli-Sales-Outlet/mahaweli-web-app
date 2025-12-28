import * as React from "react";
import { cn } from "@/utils";

interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date | { from?: Date; to?: Date };
  onSelect?: (date: any) => void;
  numberOfMonths?: number;
  className?: string;
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  numberOfMonths = 1,
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (
      mode === "range" &&
      selected &&
      typeof selected === "object" &&
      "from" in selected
    ) {
      if (!selected.from || (selected.from && selected.to)) {
        onSelect?.({ from: newDate, to: undefined });
      } else {
        onSelect?.({ from: selected.from, to: newDate });
      }
    } else {
      onSelect?.(newDate);
    }
  };

  const renderMonth = (monthOffset: number) => {
    const displayMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      1
    );
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(displayMonth);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div key={monthOffset} className="p-3">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium">
            {monthNames[month]} {year}
          </h3>
          {monthOffset === 0 && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="rounded p-1 hover:bg-gray-100"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="rounded p-1 hover:bg-gray-100"
              >
                →
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="p-2 font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            let isSelected = false;

            if (mode === "single" && selected instanceof Date) {
              isSelected = date.toDateString() === selected.toDateString();
            } else if (
              mode === "range" &&
              selected &&
              typeof selected === "object" &&
              "from" in selected
            ) {
              const { from, to } = selected;
              if (from && to) {
                isSelected = date >= from && date <= to;
              } else if (from) {
                isSelected = date.toDateString() === from.toDateString();
              }
            }

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDateClick(day)}
                className={cn(
                  "rounded p-2 text-sm hover:bg-gray-100",
                  isSelected && "bg-gray-900 text-white hover:bg-gray-800"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn("rounded-md border border-gray-200 bg-white", className)}
    >
      <div className={cn("grid", numberOfMonths > 1 && "grid-cols-2")}>
        {Array.from({ length: numberOfMonths }).map((_, i) => renderMonth(i))}
      </div>
    </div>
  );
}
