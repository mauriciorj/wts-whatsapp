import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona?",
    answer:
      "Você vai ter um link e poderá cadastrar os seus WhatsApp. O nosso sistema fará um distribuição ",
  },
  {
    question: "Posso usar WhatsApp business?",
    answer:
      "Sim, não existe nenhuma restrição. O nosso sistema vai redirecionar para qualquer tipo de WhatsApp.",
  },
  {
    question: "Qual a garantia?",
    answer: "Damos garantia total de 7 dias - 100% de reembolso do valor pago.",
  },
  {
    question: "Posso mudar meu plano?",
    answer: "Sim! Você pode mudar de plano a qualquer momento.",
  },
  {
    question: "Tem suporte?",
    answer:
      "Sim. Além de tutoriais você pode entrar em contato através de e-mail.",
  },
];

const FAQ = async () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Perguntas Frequentes
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
