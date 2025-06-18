import { useEffect, useRef } from 'react';
import { Eye, Home, Clock, CheckCircle2, FileCheck, Shield, Building2, Clock3, Smartphone, Users, BadgeCheck, Sparkles, Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './components/Button';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';
import { Carousel } from './components/Carousel';
import { SectionWrapper } from './components/SectionWrapper';

const historySlides = [
  { year: 'Ago - 2024', title: 'O Início da Inovação', description: 'Tudo se inicia, um empresário e um colaborador se conhecem!' },
  { year: 'Nov - 2024', title: 'Grande amizade', description: 'A amizade é colocada a prova por tudo que a vida implicava e apresentava pra ambos' },
  { year: 'Jan - 2025', title: 'Confiança', description: 'Quando tudo ia contra ambos, contra a amizade o trabalho os números, um voto de confiança trouxe fé, e trouxe luz pros caminhos.' },
  { year: 'Mai - 2025', title: 'Aprendizado', description: 'Um curso em campinas é o divisor de água na vida de ambos, pra motivar, criar, conquistar tudo que ambos almejavam.' },
  { year: 'Mai - 2025', title: 'Ação e reação', description: 'A ideia surgiu, a conversa animou os dois e os olhos brilharam. Foi nesse momento que a visão e a força se uniram. Um funcionário e seu patrão decidiram dar um passo além e se tornaram sócios. Juntos, criaram algo que ninguém imaginava e mostraram para todos que pensar à frente é o verdadeiro caminho para o sucesso.' }
];

const steps = [
  { icon: Clock, title: 'Agendamento', description: 'Agende sua vistoria através do nosso portal com poucos cliques' },
  { icon: Eye, title: 'Execução', description: 'Vistoria realizada via aplicativo mobile com alta precisão' },
  { icon: CheckCircle2, title: 'Validação', description: 'Correção e validação minuciosa pela nossa equipe especializada' },
  { icon: FileCheck, title: 'Entrega', description: 'Laudo final profissional com QR Code e PDF assinado digitalmente' }
];

const features = [
  { icon: Home, title: 'Organização por Ambiente', description: 'Fotos e comentários organizados por cômodo para fácil visualização.' },
  { icon: Shield, title: 'Assinatura Digital', description: 'Processo seguro e legalmente válido conforme a Lei do Inquilinato.' },
  { icon: FileCheck, title: 'Laudo Automático', description: 'Geração instantânea em PDF com identidade visual profissional.' }
];

const benefits = [
  { icon: Building2, title: 'Redução de Conflitos', description: 'Documentação clara e detalhada evita disputas entre as partes' },
  { icon: Clock3, title: 'Economia de Tempo', description: 'Processo otimizado elimina retrabalho e agiliza entregas' },
  { icon: Smartphone, title: 'Tecnologia Avançada', description: 'App exclusivo e portal inteligente para gestão completa' },
  { icon: Users, title: 'Experiência do Cliente', description: 'Interface intuitiva e suporte especializado' },
  { icon: BadgeCheck, title: 'Conformidade Legal', description: 'Laudos em conformidade com a legislação vigente.' },
  { icon: Sparkles, title: 'Imagem Profissional', description: 'Destaque sua imobiliária com relatórios premium.' }
];

// Esquema de validação com Zod
const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z
    .string()
    .regex(/^\d{10,11}$/, 'WhatsApp deve ter 10 ou 11 dígitos')
    .optional()
    .or(z.literal('')) as z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>,
  mensagem: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(500, 'Mensagem muito longa'),
});

type FormData = z.infer<typeof formSchema>;

export default function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  // Configuração do formulário com react-hook-form e zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Manipulação do envio do formulário para WhatsApp
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const message = `Olá, Visionária Vistorias!%0A%0A` +
                    `Nome: ${encodeURIComponent(data.nome)}%0A` +
                    `E-mail: ${encodeURIComponent(data.email)}%0A` +
                    `WhatsApp: ${data.whatsapp ? encodeURIComponent(data.whatsapp) : 'Não informado'}%0A` +
                    `Mensagem: ${encodeURIComponent(data.mensagem)}`;
    const whatsappUrl = `https://wa.me/5511995641753?text=${message}`;
    window.open(whatsappUrl, '_blank');
    reset();
  };

  // Configuração do mapa Leaflet
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([-23.1865, -46.8978], 15); // Coordenadas aproximadas de Jundiaí, SP
      const marker = L.marker([-23.1865, -46.8978])
        .addTo(map)
        .bindPopup('Visionária Vistorias<br>Rua Dante Belodi, 123, Bairro Eloy Chaves')
        .openPopup();

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />

      {/* Hero */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Logo src="/visio.png" className="w-64 h-64 mx-auto mb-8" />
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Visionária Vistorias</motion.h1>
          <motion.p className="text-white/80 text-xl md:text-2xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Tecnologia, precisão e agilidade em vistorias imobiliárias</motion.p>
          <Button href="https://wa.me/5511995641753" className="text-lg">Solicite uma Demonstração</Button>
        </div>
      </section>

      {/* Sobre */}
      <SectionWrapper id="sobre" title="Sobre a Visionária">
        <p className="text-lg text-center max-w-3xl mx-auto mb-4 text-white/80">A Visionária Vistorias nasceu da convergência de duas trajetórias distintas, unidas por propósitos sólidos e inegociáveis: fé, disciplina, integridade e espírito empreendedor.</p>
        <p className="text-lg text-center max-w-3xl mx-auto text-white/80">Tudo começou quando um empresário e seu colaborador passaram a construir uma relação de confiança mútua. Com o tempo, a parceria profissional se transformou em amizade, e dessa conexão, surgiu o desejo de impactar positivamente o mercado de vistorias imobiliárias. Movidos pela visão estratégica da águia e pela força resiliente do lobo, deram início a um projeto ousado: criar uma empresa capaz de aliar inovação tecnológica, eficiência operacional e sensibilidade humana. Assim foi fundada a Visionária Vistorias, uma especialista em vistorias imobiliárias que oferece confiança, segurança e clareza em cada etapa da locação, do início ao fim. Somos Visionários por natureza. E seguimos sendo.</p>
      </SectionWrapper>

      {/* História */}
      <SectionWrapper id="historia" title="Nossa História" bg="bg-black">
        {/* <Carousel slides={historySlides} /> */}
      </SectionWrapper>

      {/* Como Funciona */}
      <SectionWrapper id="como-funciona" title="Como Funciona">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary/30 -translate-y-1/2 hidden lg:block" />
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <motion.div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center relative z-10" whileHover={{ scale: 1.1 }} initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                <step.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Funcionalidades */}
      <SectionWrapper id="funcionalidades" title="Funcionalidades" bg="bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black border border-secondary/40 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-secondary/10 p-4 rounded-full mb-6">
                <feature.icon className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefícios */}
      <SectionWrapper id="beneficios" title="Benefícios para Imobiliárias">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div key={index} className="p-6 rounded-lg border border-secondary/30 hover:border-secondary transition-all duration-300" whileHover={{ scale: 1.02, backgroundColor: 'rgba(200, 161, 87, 0.1)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <benefit.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contato */}
      <SectionWrapper id="contato" title="Fale com a Visionária" bg="#2A2A2A">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#2E2E2E] p-8 md:p-12 rounded-3xl max-w-5xl mx-auto shadow-2xl border border-gray-700"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Transforme a forma como você realiza vistorias
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Preencha o formulário ou entre em contato direto. Estamos prontos para te ajudar com agilidade e precisão!
            </p>
          </div>

          {/* Botões de contato direto */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
  <motion.a
    href="https://wa.me/5511995641753"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: "linear-gradient(90deg, #C8A157 0%, #A3863F 100%)"
    }}
    className="flex items-center justify-center gap-3 text-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Phone className="w-5 h-5" />
    <span className="font-semibold">WhatsApp</span>
  </motion.a>
  <motion.a
    href="mailto:visionariaev@gmail.com"
    style={{
      background: "linear-gradient(90deg, #C8A157 0%, #A3863F 100%)"
    }}
    className="flex items-center justify-center gap-3 text-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Mail className="w-5 h-5" />
    <span className="font-semibold">Email</span>
  </motion.a>
</div>

          {/* Formulário melhorado */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Nome */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Nome completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    {...register('nome')}
                    className={`w-full p-4 rounded-xl bg-[#2e2e2e] border-2 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 form-input ${
                      errors.nome 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-secondary focus:bg-gray-750'
                    }`}
                  />
                  {errors.nome && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <span>⚠️</span> {errors.nome.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Campo E-mail */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  E-mail *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    className={`w-full p-4 rounded-xl bg-[#2e2e2e] border-2 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 form-input ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-secondary focus:bg-gray-750'
                    }`}
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <span>⚠️</span> {errors.email.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Campo WhatsApp */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                WhatsApp (opcional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register('whatsapp')}
                  className={`w-full p-4 rounded-xl bg-[#2e2e2e] border-2 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 form-input ${
                    errors.whatsapp 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-gray-600 focus:border-secondary focus:bg-gray-750'
                  }`}
                />
                {errors.whatsapp && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.whatsapp.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Campo Mensagem */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Mensagem *
              </label>
              <div className="relative">
                <textarea
                  placeholder="Conte-nos sobre seu interesse em nossos serviços de vistoria..."
                  rows={5}
                  {...register('mensagem')}
                  className={`w-full p-4 rounded-xl bg-[#2e2e2e] border-2 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none form-input ${
                    errors.mensagem 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-gray-600 focus:border-secondary focus:bg-gray-750'
                  }`}
                />
                {errors.mensagem && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.mensagem.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Botão de envio */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-gold text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar via WhatsApp
                  </>
                )}
              </motion.button>
            </form>

            {/* Informações adicionais */}
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm">
                Ao enviar este formulário, você será redirecionado para o WhatsApp com sua mensagem pré-formatada.
              </p>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* Mapa */}
        <SectionWrapper id="mapa" title="Onde Estamos" bg="#1A202C">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
          >
            <div ref={mapRef} className="h-[400px] w-full"></div>
          </motion.div>
        </SectionWrapper>

        {/* Rodapé */}
        <footer className="bg-primary border-t border-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-secondary" />
                    <span>(11) 99564-1753</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-secondary" />
                    <span>visionariaev@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>Jundiaí, SP</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Serviços</h3>
                <ul className="space-y-2 text-white/80">
                  <li>Vistorias de Entrada</li>
                  <li>Vistorias de Saída</li>
                  <li>Laudos Técnicos</li>
                  <li>Consultoria Imobiliária</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Sobre</h3>
                <p className="text-white/80">
                  Especialistas em vistorias imobiliárias com tecnologia de ponta e atendimento personalizado.
                </p>
              </div>
            </div>
            <div className="border-t border-secondary/30 mt-8 pt-8 text-center text-white/60">
              <p>&copy; 2025 Visionária Vistorias. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
