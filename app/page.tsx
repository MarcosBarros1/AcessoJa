'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);

  useEffect(() => {
    const salvo = localStorage.getItem('alto-contraste');
    if (salvo === 'ativo') setAltoContraste(true);
  }, []);

  const toggleContraste = () => {
    const novoEstado = !altoContraste;
    setAltoContraste(novoEstado);
    localStorage.setItem('alto-contraste', novoEstado ? 'ativo' : 'inativo');
  };

  // 🌟 NOSSO BANCO DE DADOS FALSO (Mock)
  // Para adicionar mais cursos, é só colocar mais itens nessa lista!
  const cursos = [
    {
      id: 1,
      tag: 'Front-end',
      titulo: 'HTML e CSS Inclusivo',
      descricao: 'Aprenda a construir sites do zero focando nas diretrizes de acessibilidade (WCAG).',
      link: 'https://youtube.com',
      icone: '🌐'
    },
    {
      id: 2,
      tag: 'Back-end',
      titulo: 'Lógica com Python',
      descricao: 'Dê os primeiros passos na programação com uma linguagem simples, poderosa e muito requisitada.',
      link: 'https://youtube.com',
      icone: '🐍'
    },
    {
      id: 3,
      tag: 'Design',
      titulo: 'UX/UI Design para Todos',
      descricao: 'Entenda como projetar interfaces amigáveis e empáticas para todos os perfis de usuários.',
      link: 'https://youtube.com',
      icone: '🎨'
    },
    {
      id: 4,
      tag: 'Front-end',
      titulo: 'JavaScript Dinâmico',
      descricao: 'Crie interações, valide formulários e deixe suas páginas web vivas com JS.',
      link: 'https://youtube.com',
      icone: '⚡'
    },
    {
      id: 5,
      tag: 'Acessibilidade',
      titulo: 'Dominando Leitores de Tela',
      descricao: 'Testes práticos usando NVDA e VoiceOver para garantir que seu site é 100% navegável por cegos.',
      link: 'https://youtube.com',
      icone: '🎙️'
    },
    {
      id: 6,
      tag: 'Carreira',
      titulo: 'Preparação para Entrevistas de TI',
      descricao: 'Dicas de currículo, portfólio no GitHub e como se destacar nas seleções de tecnologia.',
      link: 'https://youtube.com',
      icone: '🚀'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-800'}`} style={{ fontSize: `${tamanhoFonte}px` }}>
      
      {/* Link de Pulo para Acessibilidade */}
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-orange-500 focus:text-black focus:font-bold focus:z-50 focus:rounded-br-lg shadow-xl">
        Pular para o conteúdo principal
      </a>

      {/* Cabeçalho */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 shadow-sm px-6 py-4 flex justify-between items-center ${altoContraste ? 'bg-black/90 border-yellow-300' : 'bg-white/90 border-slate-200'}`}>
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-3 text-blue-700">
          <span aria-hidden="true" className="text-3xl">♿</span> 
          <span className={altoContraste ? 'text-yellow-300' : 'text-blue-800'}>AcessoJá</span>
        </h1>
        <nav aria-label="Ferramentas de acessibilidade" className="flex gap-2">
          <button onClick={() => setTamanhoFonte(prev => Math.min(prev + 2, 24))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Aumentar tamanho da fonte">A+</button>
          <button onClick={() => setTamanhoFonte(prev => Math.max(prev - 2, 12))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Diminuir tamanho da fonte">A-</button>
          <button onClick={toggleContraste} className={`font-bold px-4 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform flex items-center gap-2 ${altoContraste ? 'border-yellow-300 bg-yellow-300 text-black' : 'border-slate-800 bg-slate-800 text-white'}`} aria-label="Alternar modo de alto contraste">
            ◐ Contraste
          </button>
        </nav>
      </header>

      <main id="conteudo-principal">
        {/* Área de Destaque (Hero) com gradiente bonitão */}
        <section className={`py-20 px-6 text-center ${altoContraste ? 'bg-black border-b-4 border-yellow-300' : 'bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-900 text-white shadow-inner'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
              Educação e Inclusão <br className="hidden md:block"/> em um só lugar.
            </h2>
            <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${altoContraste ? 'text-yellow-300' : 'text-blue-100'}`}>
              Descubra cursos gratuitos de tecnologia adaptados para o seu desenvolvimento profissional.
            </p>
            <a href="#cursos" className={`inline-block font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-yellow-300 text-black' : 'bg-white text-blue-900 hover:bg-blue-50'}`}>
              Explorar Cursos ↓
            </a>
          </div>
        </section>

        {/* Grade de Cursos */}
        <section id="cursos" className="max-w-7xl mx-auto py-16 px-6">
          <h3 className="text-3xl font-black mb-10 text-center uppercase tracking-wider">Cursos Disponíveis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* O React vai mapear a lista e gerar um card para cada curso automaticamente */}
            {cursos.map((curso) => (
              <article key={curso.id} className={`flex flex-col p-8 rounded-2xl border-2 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${altoContraste ? 'border-yellow-300 bg-black' : 'border-slate-200 bg-white'}`}>
                
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wide ${altoContraste ? 'bg-transparent border border-yellow-300 text-yellow-300' : 'bg-blue-100 text-blue-800'}`}>
                    {curso.tag}
                  </span>
                  <span className="text-4xl" aria-hidden="true">{curso.icone}</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-3 leading-tight">{curso.titulo}</h4>
                <p className={`mb-8 flex-grow text-lg ${altoContraste ? 'text-yellow-100' : 'text-slate-600'}`}>
                  {curso.descricao}
                </p>
                
                <a href={curso.link} target="_blank" className={`text-center font-bold px-6 py-3 rounded-xl transition-colors focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-700 text-white hover:bg-blue-800'}`} aria-label={`Assistir ao curso ${curso.titulo} no YouTube. Abre em nova guia.`}>
                  Acessar Curso →
                </a>
              </article>
            ))}

          </div>
        </section>
      </main>

      {/* Script do VLibras */}
      <Script src="https://vlibras.gov.br/app/vlibras-plugin.js" strategy="lazyOnload" onLoad={() => new window.VLibras.Widget('https://vlibras.gov.br/app')} />
      
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true"><div className="vw-plugin-top-wrapper"></div></div>
      </div>
    </div>
  );
}