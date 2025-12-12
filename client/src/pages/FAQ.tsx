import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-heading font-black uppercase tracking-tighter mb-4">FAQ</h1>
          <p className="text-muted-foreground text-lg">
            Common questions about orders, shipping, and product care.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-border px-6 data-[state=open]:bg-secondary/5 transition-colors">
            <AccordionTrigger className="text-lg font-heading font-bold uppercase py-6 hover:no-underline hover:text-primary">
              Shipping Information
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              We ship primarily within Bangladesh. Standard delivery takes 3-5 business days. Express shipping options are available at checkout. Tracking numbers are provided via email once your order has been dispatched.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border px-6 data-[state=open]:bg-secondary/5 transition-colors">
            <AccordionTrigger className="text-lg font-heading font-bold uppercase py-6 hover:no-underline hover:text-primary">
              Size Guide
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              Our streetwear fits are generally oversized. 
              <br/><br/>
              <strong>M:</strong> Chest 40-42" | Length 28"<br/>
              <strong>L:</strong> Chest 42-44" | Length 29"<br/>
              <strong>XL:</strong> Chest 44-46" | Length 30"
              <br/><br/>
              For a more fitted look, we recommend sizing down.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border px-6 data-[state=open]:bg-secondary/5 transition-colors">
            <AccordionTrigger className="text-lg font-heading font-bold uppercase py-6 hover:no-underline hover:text-primary">
              Care Instructions
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              To maintain the premium quality of your Layven garments:<br/>
              - Wash cold with like colors<br/>
              - Do not bleach<br/>
              - Hang dry or tumble dry low<br/>
              - Iron on low heat if needed, avoiding prints
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-border px-6 data-[state=open]:bg-secondary/5 transition-colors">
            <AccordionTrigger className="text-lg font-heading font-bold uppercase py-6 hover:no-underline hover:text-primary">
              Returns & Exchanges
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              We accept returns or exchanges within 7 days of delivery for unworn, unwashed items with original tags attached. Please contact support@layven.com to initiate a return.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
}
