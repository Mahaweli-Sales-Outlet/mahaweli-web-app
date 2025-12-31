import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickLink {
  title: string;
  description: string;
  onClick: () => void;
}

interface QuickLinksSectionProps {
  links: QuickLink[];
}

export function QuickLinksSection({ links }: QuickLinksSectionProps) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-4">
      {links.map((link, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={link.onClick}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{link.title}</h3>
            <p className="text-sm text-gray-600">{link.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
