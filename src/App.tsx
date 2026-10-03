import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Scale, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle,
  Lock,
  ChevronDown,
  UserCheck,
  FileSearch,
  Award,
  BookOpen,
  X
} from 'lucide-react';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    valor: '',
    data: ''
  });

  const whatsappNumber = "5511999999999"; // Substitua pelo seu número

  const handleNextStep = (field: 'valor' | 'data', value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    if (step === 1) {
      setStep(2);
    } else {
      // Finalizar e enviar para o WhatsApp
      const msg = `Olá, Prof. Lucas! Preciso de ajuda com uma fraude.\n*O valor aproximado do prejuízo foi:* ${newData.valor}\n*Ocorreu:* ${newData.data}\n\nGostaria de uma análise do meu caso.`;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappLink, '_blank');
      setIsModalOpen(false);
      
      // Resetar form após enviar
      setTimeout(() => {
        setStep(1);
        setFormData({ valor: '', data: '' });
      }, 500);
    }
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-blue-500/30 relative">
      
      {/* Qualification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="flex gap-2 mb-6">
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {step === 1 ? "Qual foi o valor aproximado do prejuízo?" : "Quando o golpe ocorreu?"}
                </h3>
                <p className="text-slate-500 text-sm">
                  {step === 1 ? "Isso nos ajuda a direcionar seu caso para a equipe correta." : "O tempo é crucial para tentar bloqueios e medidas cautelares."}
                </p>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  {[
                    "Até R$ 5.000,00",
                    "De R$ 5.000,00 a R$ 20.000,00",
                    "Acima de R$ 20.000,00"
                  ].map((opcao) => (
                    <button
                      key={opcao}
                      onClick={() => handleNextStep('valor', opcao)}
                      className="w-full text-left px-6 py-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-700 font-medium flex items-center justify-between group"
                    >
                      {opcao}
                      <ChevronRight size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-3">
                  {[
                    "Nas últimas 24 horas",
                    "Nos últimos 7 dias",
                    "Há mais de 7 dias"
                  ].map((opcao) => (
                    <button
                      key={opcao}
                      onClick={() => handleNextStep('data', opcao)}
                      className="w-full text-left px-6 py-4 rounded-xl border border-slate-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-slate-700 font-medium flex items-center justify-between group"
                    >
                      {opcao}
                      <WhatsAppIcon size={18} className="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-900 rounded-lg shadow-md border-b-2 border-blue-600">
              <span className="text-white font-serif font-bold text-2xl tracking-tighter">LK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 tracking-widest leading-none mb-1">LUCAS KARAM</span>
              <span className="text-blue-600 text-[9.5px] font-bold tracking-[0.27em] uppercase">Advocacia Digital</span>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
          >
            Falar com a Equipe
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-200 text-sm font-semibold mb-8 uppercase tracking-wide">
                  <AlertTriangle size={16} />
                  <span>Vítima de Fraude Bancária?</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900">
                  O Banco Falhou na Segurança.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Ele Deve Indenizar Você.
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed font-light">
                  A culpa não é sua. Como especialistas em <strong>Cibersegurança e Direito Digital</strong>, provamos as falhas sistêmicas das instituições financeiras para recuperar o seu patrimônio perdido no Golpe do PIX.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:-translate-y-1"
                  >
                    <WhatsAppIcon size={24} />
                    Falar com Especialista no WhatsApp
                  </button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center gap-2"><Lock size={16} className="text-blue-500"/> Sigilo Absoluto</span>
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Atendimento Nacional</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block relative"
              >
                <div className="relative bg-white border border-slate-200 p-10 rounded-2xl shadow-xl">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl rotate-12 opacity-10 blur-xl"></div>
                  <h3 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" size={32} />
                    Falhas Bancárias Comuns
                  </h3>
                  <ul className="space-y-6">
                    {[
                      { title: "Falsa Central de Atendimento", desc: "Spoofing de números oficiais dos bancos." },
                      { title: "Clonagem de WhatsApp", desc: "Engenharia social e falha na autenticação 2FA." },
                      { title: "Fraude de Intermediário (OLX/Mercado Livre)", desc: "Contas laranja não bloqueadas pelo banco." },
                      { title: "Transações Atípicas", desc: "PIX aprovado fora do seu perfil de consumo." }
                    ].map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 bg-blue-50 p-1.5 rounded-full">
                          <CheckCircle2 className="text-blue-600 shrink-0" size={18} />
                        </div>
                        <div>
                          <strong className="text-slate-900 block text-lg">{item.title}</strong>
                          <span className="text-slate-600 text-sm">{item.desc}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured In Media Section - Enhanced with actual images */}
        <section className="py-24 bg-white border-y border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center space-x-2 mb-4">
                <span className="h-px w-8 bg-blue-600"></span>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Reconhecimento Nacional</p>
                <span className="h-px w-8 bg-blue-600"></span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">A Voz da Cibersegurança na Grande Mídia</h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Referência nacional, o Prof. Lucas Karam é frequentemente requisitado pelos maiores veículos de comunicação do país para traduzir a complexidade dos crimes digitais e orientar a população.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {[
                { src: "/media/imagem_1.jpg", alt: "Entrevista sobre Fraudes", channel: "SBT Brasil - Especialista" },
                { src: "/media/imagem_2.jpg", alt: "Análise Digital", channel: "TV Globo - Cibersegurança" },
                { src: "/media/imagem_3.jpg", alt: "Crimes Virtuais", channel: "Record News - Direito Digital" },
                { src: "/media/imagem_4.jpg", alt: "Proteção de Dados", channel: "Metrópoles - Fraude Bancária" },
                { src: "/media/imagem_5.jpg", alt: "Segurança da Informação", channel: "Análise - Crimes Cibernéticos" },
                { src: "/media/imagem_6.jpg", alt: "Entrevista Nacional", channel: "TV Senado - Legislação Digital" },
                { src: "/media/imagem_7.jpg", alt: "Participação", channel: "BandNews - Especialista" },
                { src: "/media/imagem_8.jpg", alt: "Entrevista", channel: "Jovem Pan - Deepfake" },
                { src: "/media/imagem_9.jpg", alt: "Especialista", channel: "SBT - Proteção de Dados" },
                { src: "/media/imagem_10.jpg", alt: "Comentário", channel: "Análise - Vazamento de Dados" },
                { src: "/media/imagem_11.jpg", alt: "Participação", channel: "Record TV - Golpes Financeiros" },
                { src: "/media/imagem_13.jpg", alt: "Entrevista", channel: "SBT - Segurança em Redes" },
                { src: "/media/imagem_14.jpg", alt: "Especialista", channel: "Metrópoles - Análise de Casos" },
                { src: "/media/imagem_15.jpg", alt: "Comentário", channel: "Record - IA e Fraudes" },
                { src: "/media/imagem_16.jpg", alt: "Participação", channel: "TV Justiça - Direito Digital" },
                { src: "/media/imagem_17.jpg", alt: "Especialista", channel: "GloboNews - Cibersegurança" },
                { src: "/media/imagem_18.jpg", alt: "Entrevista", channel: "CNN Brasil - Fraudes no PIX" },
                { src: "/media/imagem_19.jpg", alt: "Comentário", channel: "SBT - Clonagem de WhatsApp" },
                { src: "/media/imagem_20.jpg", alt: "Participação", channel: "Record - Responsabilidade Civil" },
                { src: "/media/imagem_21.jpg", alt: "Especialista", channel: "Band - Invasão de Contas" },
                { src: "/media/imagem_22.jpg", alt: "Entrevista", channel: "TV Senado - STJ e Fraudes" },
                { src: "/media/imagem_23.jpg", alt: "Participação", channel: "Especialista em Direito Digital" }
              ].map((media, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-100">
                  <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img 
                    src={media.src} 
                    alt={media.alt} 
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="block text-white font-bold text-xs sm:text-sm border-l-2 border-blue-500 pl-3 drop-shadow-md leading-tight">{media.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Digital Law Section */}
        <section className="py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-50 pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Por que a expertise em <span className="text-blue-600">Direito Digital</span> muda tudo?
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-16 font-light">
              Advogados tradicionais tratam fraudes como um problema comum de consumo. Nós investigamos os <strong>rastros digitais, o algoritmo antifraude do banco e os protocolos de segurança</strong> (Súmula 479 do STJ) para provar a responsabilidade da instituição.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  icon: <FileSearch className="text-blue-600" size={32} />,
                  title: "Auditoria Cibernética",
                  desc: "Mapeamos como a fraude ocorreu tecnicamente para demonstrar a negligência do banco em bloquear a transação."
                },
                {
                  icon: <Lock className="text-blue-600" size={32} />,
                  title: "Bloqueio Estratégico",
                  desc: "Ação rápida utilizando os mecanismos do Banco Central (MED) e ordens judiciais de bloqueio de contas recebedoras."
                },
                {
                  icon: <UserCheck className="text-blue-600" size={32} />,
                  title: "Inteligência Artificial",
                  desc: "Utilizamos as mais modernas ferramentas de IA para cruzar dados e fundamentar sua defesa com jurisprudências atualizadas."
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5 group">
                  <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Como atuamos no seu caso</h2>
              <p className="text-xl text-slate-600 font-light">Uma metodologia técnica, rápida e focada em resultados para vítimas de fraudes financeiras.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-white via-blue-200 to-white z-0"></div>
              
              {[
                { step: "01", title: "Análise de Viabilidade", desc: "Avaliamos provas (BO, extratos, conversas) para identificar a falha de segurança do banco." },
                { step: "02", title: "Notificação Estratégica", desc: "Acionamos os mecanismos do BACEN (MED) e exigimos o estorno fundamentado." },
                { step: "03", title: "Bloqueio Judicial", desc: "Ação de urgência para tentar bloquear contas recebedoras e evitar a fuga do capital." },
                { step: "04", title: "Ação Indenizatória", desc: "Processo para restituição integral dos valores roubados e indenização." }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 transition-colors shadow-sm group">
                  <div className="w-14 h-14 bg-blue-50 border-2 border-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authority / About Section */}
        <section className="py-32 relative overflow-hidden bg-slate-50 border-y border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            
            <div className="inline-flex items-center justify-center space-x-2 mb-8">
              <span className="h-px w-12 bg-blue-200"></span>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em]">Conheça o Especialista</p>
              <span className="h-px w-12 bg-blue-200"></span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6">Prof. Lucas Karam</h2>
            <h3 className="text-2xl text-blue-600 font-light mb-12">Pioneiro na interseção entre Direito e Tecnologia no Brasil</h3>
            
            <div className="space-y-8 text-xl text-slate-600 mb-16 font-light leading-relaxed max-w-3xl mx-auto">
              <p>
                <strong>Professor, autor e especialista referência em Direito Digital, Cibersegurança e Proteção de Dados (LGPD).</strong> 
                Com um profundo conhecimento da arquitetura de sistemas, o Prof. Lucas Karam vai além das leis: ele entende exatamente 
                o <em>código</em> por trás das fraudes bancárias.
              </p>
              <p>
                Sua atuação focada em vítimas de golpes digitais o tornou figura constante na grande mídia (TV Globo, Record, SBT, CNN) 
                por expor como as instituições financeiras falham gravemente na segurança dos seus próprios clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-xl group">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Award className="text-blue-600" size={24} />
                </div>
                <h4 className="text-slate-900 font-bold text-lg mb-2">Certificações Globais</h4>
                <p className="text-sm text-slate-600 font-light">EXIN, IAPP, ISO/IEC 27701. Padrão internacional de segurança.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-xl group">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <h4 className="text-slate-900 font-bold text-lg mb-2">Docência Superior</h4>
                <p className="text-sm text-slate-600 font-light">Coordenador da pós-graduação "IA para Advogados" na EBPOS.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-xl group">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Scale className="text-blue-600" size={24} />
                </div>
                <h4 className="text-slate-900 font-bold text-lg mb-2">Credencial OAB</h4>
                <p className="text-sm text-slate-600 font-light">Registro OAB/BA 59.907. Atuação 100% digital em todo o Brasil.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
              <p className="text-slate-600 font-light text-lg">Respostas claras para quem foi vítima de fraude bancária.</p>
            </div>
            <div className="space-y-4">
              <FAQItem 
                question="Caí em um golpe. Ainda dá tempo de recuperar o dinheiro?" 
                answer="Sim, mas o tempo é crucial. Quanto mais rápido acionarmos os mecanismos do Banco Central (como o MED) e prepararmos a ação, maiores as chances de bloquear os valores antes que sejam sacados." 
              />
              <FAQItem 
                question="O banco é realmente obrigado a me ressarcir?" 
                answer="Em muitos casos, sim. A Súmula 479 do STJ estabelece que as instituições financeiras respondem objetivamente pelos danos gerados por fortuito interno, relativos a fraudes e delitos praticados por terceiros no âmbito de operações bancárias." 
              />
              <FAQItem 
                question="Como funciona a consultoria inicial?" 
                answer="Nossa equipe fará uma análise técnica do seu caso. Vamos avaliar os prints, boletim de ocorrência e a resposta do banco para entender a viabilidade jurídica da sua recuperação e orientar os próximos passos." 
              />
              <FAQItem 
                question="Vocês atendem clientes de fora de São Paulo?" 
                answer="Sim! Nosso escritório é 100% digital. Atuamos em todo o território nacional, com processos eletrônicos e reuniões por videoconferência, garantindo agilidade e transparência em qualquer lugar do Brasil." 
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-900 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              O tempo está contra você. Aja agora.
            </h2>
            <p className="text-blue-100 text-xl mb-12 font-light">
              Quanto mais rápido judicializarmos o caso, maiores as chances de rastrear e bloquear os valores roubados antes que sejam pulverizados.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-xl font-bold text-xl hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
            >
              <WhatsAppIcon size={28} className="text-[#25D366]" />
              Falar com o Prof. Lucas Karam
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg border border-white/20 border-b-2 border-b-blue-500">
                <span className="text-white font-serif font-bold text-2xl tracking-tighter">LK</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-extrabold text-white tracking-widest leading-none mb-1">LUCAS KARAM</span>
                <span className="text-blue-400 text-[9.5px] font-bold tracking-[0.27em] uppercase">Advocacia Digital</span>
              </div>
            </div>
            <div className="text-center md:text-right text-sm">
              <p>Direito Digital e Cibersegurança</p>
              <p>Atendimento 100% Digital para todo o Brasil.</p>
            </div>
          </div>
          <div className="text-xs text-center border-t border-slate-800 pt-8">
            <p>&copy; {new Date().getFullYear()} Lucas Karam Advocacia. Todos os direitos reservados. Site protegido e otimizado para conversão.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* Pulsing Ring Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping"></span>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Falar pelo WhatsApp"
        >
          <WhatsAppIcon size={32} />
          {/* Tooltip para desktop */}
          <span className="absolute right-full mr-4 bg-white text-slate-900 text-sm font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg hidden md:block">
            Fale com nossa equipe
            <span className="absolute top-1/2 -mt-1 -right-2 border-4 border-transparent border-l-white"></span>
          </span>
        </button>
      </div>
    </div>
  );
}


// Simple FAQ Accordion Component
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-slate-50 overflow-hidden transition-colors hover:border-blue-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-bold text-slate-900 text-lg pr-4">{question}</span>
        <ChevronDown 
          className={`text-blue-600 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-slate-600 font-light leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
