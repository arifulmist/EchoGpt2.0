import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQ_ITEMS } from "@/data/mockData";

export function FaqAccordion() {
  const items = FAQ_ITEMS.map((item, idx) => ({
    id: `faq-${idx}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-border/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="default" size="md">
            Got Questions?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about models, privacy, the Chrome Side Panel, and key management.
          </p>
        </div>

        <Accordion items={items} />
      </div>
    </section>
  );
}
