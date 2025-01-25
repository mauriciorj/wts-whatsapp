import { ChartPie, Rabbit, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = async () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Porque escolher a nossa solução
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <ChartPie className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
            <p className="text-muted-foreground">
              Saiba quem são os seus clientes. Localidade, sistema operacional,
              tipo de dispositivo e etc.
            </p>
          </Card>
          <Card className="p-6">
            <Rabbit className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Configuração Rápida</h3>
            <p className="text-muted-foreground">
              Tenha seu sistema funcionando em menos de 2 minutos.
            </p>
          </Card>
          <Card className="p-6">
            <Shield className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Segurança</h3>
            <p className="text-muted-foreground">
              Sistema totalmente seguro e confiável.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
