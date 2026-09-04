'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// 🌟 NOVOS ÍCONES: Adicionados Mic (Microfone), Pencil (Lápis) e Save (Salvar)
import { MonitorPlay, Palette, Accessibility, Languages, Briefcase, Lightbulb, Search, Trash2, Lock, Unlock, CheckCircle, X, Mic, Pencil, Save } from 'lucide-react';

const cursosPadrao = [
  { id: 1, tag: 'Tecnologia', titulo: 'HTML e CSS Inclusivo', descricao: 'Aprenda a construir sites do zero focando nas diretrizes de acessibilidade (WCAG).', link: 'https://www.youtube.com/watch?v=kMhE_cM4_Eo', icone: 'MonitorPlay' },
  { id: 2, tag: 'Tecnologia', titulo: 'Lógica com Python', descricao: 'Dê os primeiros passos na programação com uma linguagem simples, poderosa e muito requisitada.', link: 'https://www.youtube.com/watch?v=S9uPNppGsGo', icone: 'MonitorPlay' },
  { id: 3, tag: 'Design', titulo: 'UX/UI Design para Todos', descricao: 'Entenda como projetar interfaces amigáveis e empáticas para todos os perfis de usuários.', link: 'https://www.youtube.com/watch?v=wnLzGjS6Xik', icone: 'Palette' },
  { id: 4, tag: 'Tecnologia', titulo: 'JavaScript Dinâmico', descricao: 'Crie interações, valide formulários e deixe suas páginas web vivas com JS.', link: 'https://www.youtube.com/watch?v=BXqUH86F-kA', icone: 'MonitorPlay' },
  { id: 5, tag: 'Acessibilidade', titulo: 'Dominando Leitores de Tela', descricao: 'Testes práticos usando NVDA e VoiceOver para garantir que seu site é 100% navegável por cegos.', link: 'https://www.youtube.com/watch?v=v0I8Eic4c_g', icone: 'Accessibility' },
  { id: 6, tag: 'Carreira', titulo: 'Preparação para Entrevistas de TI', descricao: 'Dicas de currículo, portfólio no GitHub e como se destacar nas seleções de tecnologia.', link: 'https://www.youtube.com/watch?v=T1-HhFhR41M', icone: 'Briefcase' },
  { id: 7, tag: 'Idiomas', titulo: 'Libras Básico', descricao: 'Aprenda os sinais básicos da Língua Brasileira de Sinais para comunicação no dia a dia.', link: 'https://www.youtube.com/watch?v=4T1T2W7OEEU', icone: 'Languages' }
];

const RenderizadorDeIcone = ({ nomeIcone, altoContraste }: { nomeIcone: string, altoContraste: boolean }) => {
  const t = 36;
  const c = altoContraste ? "text-yellow-300" : "text-blue-700";
  switch (nomeIcone) {
    case 'MonitorPlay': return <MonitorPlay size={t} className={c} />;
    case 'Palette': return <Palette size={t} className={c} />;
    case 'Accessibility': return <Accessibility size={t} className={c} />;
    case 'Languages': return <Languages size={t} className={c} />;
    case 'Briefcase': return <Briefcase size={t} className={c} />;
    default: return <Lightbulb size={t} className={c} />;
  }
};

export default function Home() {
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);
  const [cursos, setCursos] = useState<any[]>([]);
  
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [toast, setToast] = useState('');
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // 🌟 ESTADOS DA PESQUISA POR VOZ E EDIÇÃO
  const [isListening, setIsListening] = useState(false);
  const [cursoEmEdicao, setCursoEmEdicao] = useState<any | null>(null);

  // 🌟 Efeito para alterar a fonte na raiz do documento (HTML) para o Tailwind calcular os rems corretamente
  useEffect(() => {
    document.documentElement.style.fontSize = `${tamanhoFonte}px`;
    return () => { document.documentElement.style.fontSize = '16px'; };
  }, [tamanhoFonte]);

  useEffect(() => {
    const salvoContraste = localStorage.getItem('alto-contraste');
    if (salvoContraste === 'ativo') setAltoContraste(true);

    const cursosSalvos = localStorage.getItem('@acessoja:cursos');
    if (cursosSalvos) {
      setCursos(JSON.parse(cursosSalvos));
    } else {
      localStorage.setItem('@acessoja:cursos', JSON.stringify(cursosPadrao));
      setCursos(cursosPadrao);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showLoginModal) fecharModalLogin();
        if (cursoEmEdicao) setCursoEmEdicao(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLoginModal, cursoEmEdicao]);

  const toggleContraste = () => {
    const novoEstado = !altoContraste;
    setAltoContraste(novoEstado);
    localStorage.setItem('alto-contraste', novoEstado ? 'ativo' : 'inativo');
  };

  const mostrarToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // 🌟 FUNÇÃO DE EXCLUIR (DELETE)
  const deletarCurso = (id: number, titulo: string) => {
    if (confirm(`Tem certeza que deseja apagar o curso "${titulo}"?`)) {
      const novaLista = cursos.filter(c => c.id !== id);
      setCursos(novaLista);
      localStorage.setItem('@acessoja:cursos', JSON.stringify(novaLista));
      mostrarToast('Curso apagado com sucesso!');
    }
  };

  // 🌟 FUNÇÃO DE SALVAR EDIÇÃO (UPDATE)
  const salvarEdicao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cursoEmEdicao) return;

    // Atualiza o curso específico na lista
    const novaLista = cursos.map(c => c.id === cursoEmEdicao.id ? cursoEmEdicao : c);
    setCursos(novaLista);
    localStorage.setItem('@acessoja:cursos', JSON.stringify(novaLista));
    
    setCursoEmEdicao(null); // Fecha o modal
    mostrarToast('Curso atualizado com sucesso!');
  };

  // 🌟 FUNÇÃO DE PESQUISA POR VOZ (MICROFONE)
  const iniciarPesquisaPorVoz = () => {
    // Verifica se o navegador tem suporte à API de voz
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta pesquisa por voz. Tente usar o Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR'; // Define o idioma para Português do Brasil
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcricao = event.results[0][0].transcript;
      setBusca(transcricao); // Coloca o que foi falado na barra de pesquisa
    };
    
    recognition.onerror = (event: any) => {
      console.error("Erro no microfone:", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const fecharModalLogin = () => {
    setShowLoginModal(false);
    setSenhaAdmin('');
    setErroLogin('');
  };

  const clickBotaoCadeado = () => {
    if (isAdmin) {
      setIsAdmin(false);
      mostrarToast('Modo administrador desativado.');
    } else {
      setShowLoginModal(true);
    }
  };

  const fazerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaAdmin === 'Ace$$oJa2026') {
      setIsAdmin(true);
      fecharModalLogin();
      mostrarToast('Login de administrador realizado com sucesso!');
    }
  };

  const categorias = ['Todos', ...Array.from(new Set(cursos.map((c: any) => c.tag)))];
  
  const cursosExibidos = cursos.filter((c: any) => {
    const matchCategoria = filtroAtivo === 'Todos' || c.tag === filtroAtivo;
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) || c.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  if (cursos.length === 0) return null; 

  return (
    // 🌟 AQUI: Removido o style={{fontSize}} para que o useEffect faça o trabalho corretamente
    <div className={`min-h-screen transition-colors duration-300 relative pb-20 ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Notificação Toast */}
      {toast && (
        <div role="alert" className="fixed z-50 flex items-center gap-3 px-6 py-4 text-lg font-bold text-white bg-green-600 border-2 border-white shadow-2xl bottom-8 right-8 rounded-xl animate-in slide-in-from-bottom-5">
          <CheckCircle size={28} /> {toast}
        </div>
      )}

      {/* 🌟 MODAL DE EDIÇÃO DE CURSO */}
      {cursoEmEdicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-editar-titulo">
          <div className={`w-full max-w-lg p-8 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 border-2 ${altoContraste ? 'bg-black border-yellow-300' : 'bg-white border-blue-700'}`}>
            
            <button onClick={() => setCursoEmEdicao(null)} className={`absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'text-yellow-300 hover:bg-yellow-900/50' : 'text-slate-500 hover:bg-slate-100'}`} aria-label="Cancelar edição">
              <X size={24} />
            </button>

            <h2 id="modal-editar-titulo" className="flex items-center gap-2 mb-6 text-2xl font-extrabold">
              <Pencil className={altoContraste ? 'text-yellow-300' : 'text-blue-700'} /> Editar Curso
            </h2>

            <form onSubmit={salvarEdicao} className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-1 font-bold">Título</label>
                <input required value={cursoEmEdicao.titulo} onChange={(e) => setCursoEmEdicao({...cursoEmEdicao, titulo: e.target.value})} className={`w-full p-3 rounded-lg border-2 outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 text-black'}`} />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 font-bold">Categoria (Tag)</label>
                <input required value={cursoEmEdicao.tag} onChange={(e) => setCursoEmEdicao({...cursoEmEdicao, tag: e.target.value})} className={`w-full p-3 rounded-lg border-2 outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 text-black'}`} />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-bold">Descrição</label>
                <textarea required rows={3} value={cursoEmEdicao.descricao} onChange={(e) => setCursoEmEdicao({...cursoEmEdicao, descricao: e.target.value})} className={`w-full p-3 rounded-lg border-2 outline-none focus:ring-4 focus:ring-orange-500 resize-y ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 text-black'}`}></textarea>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-bold">Link do Vídeo</label>
                <input required type="url" value={cursoEmEdicao.link} onChange={(e) => setCursoEmEdicao({...cursoEmEdicao, link: e.target.value})} className={`w-full p-3 rounded-lg border-2 outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 text-black'}`} />
              </div>

              <button type="submit" className={`w-full font-bold text-lg py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500 flex justify-center items-center gap-2 mt-4 transition-colors ${altoContraste ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
                <Save size={20} /> Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE LOGIN ADMIN */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
          <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 border-2 ${altoContraste ? 'bg-black border-yellow-300' : 'bg-white border-blue-700'}`}>
            <button onClick={fecharModalLogin} className={`absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'text-yellow-300 hover:bg-yellow-900/50' : 'text-slate-500 hover:bg-slate-100'}`}>
              <X size={24} />
            </button>
            <h2 id="modal-titulo" className="flex items-center gap-2 mb-2 text-2xl font-extrabold">
              <Lock className={altoContraste ? 'text-yellow-300' : 'text-blue-700'} /> Acesso Restrito
            </h2>
            <p className={`mb-6 ${altoContraste ? 'text-yellow-100' : 'text-slate-600'}`}>Faça login para gerenciar e excluir cursos.</p>
            <form onSubmit={fazerLogin} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="senha" className="mb-2 font-bold">Senha do Administrador</label>
                <input id="senha" type="password" autoFocus required value={senhaAdmin} onChange={(e) => setSenhaAdmin(e.target.value)} className={`w-full p-3 rounded-lg border-2 outline-none focus:ring-4 focus:ring-orange-500 transition-all ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 text-black'}`} />
              </div>
              {erroLogin && <p role="alert" className="p-2 text-sm font-bold text-red-600 bg-red-100 border border-red-300 rounded-lg">{erroLogin}</p>}
              <button type="submit" className={`w-full font-bold text-lg py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500 transition-colors ${altoContraste ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>Entrar</button>
            </form>
          </div>
        </div>
      )}

      <a href="#conteudo-principal" className="shadow-xl sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-orange-500 focus:text-black focus:font-bold focus:z-50 focus:rounded-br-lg">
        Pular para o conteúdo principal
      </a>

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 shadow-sm px-6 py-4 flex justify-between items-center flex-wrap gap-4 ${altoContraste ? 'bg-black/90 border-yellow-300' : 'bg-white/90 border-slate-200'}`}>
        <h1 className="flex items-center gap-3 text-2xl font-black tracking-tight text-blue-700">
          <Accessibility size={32} className={altoContraste ? 'text-yellow-300' : 'text-blue-700'} aria-hidden="true" />
          <span className={altoContraste ? 'text-yellow-300' : 'text-blue-800'}>AcessoJá</span>
        </h1>
        <nav aria-label="Ferramentas de acessibilidade e sistema" className="flex items-center gap-2">
          <button onClick={clickBotaoCadeado} aria-pressed={isAdmin} aria-label={isAdmin ? "Sair do modo administrador" : "Fazer login como administrador"} title={isAdmin ? "Sair do Modo Admin" : "Acessar Modo Admin"} className={`p-2 rounded-lg border-2 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 hover:scale-105 ${isAdmin ? 'bg-red-600 text-white border-red-600' : (altoContraste ? 'border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 text-slate-600 hover:bg-slate-100')}`}>
            {isAdmin ? <Unlock size={20} /> : <Lock size={20} />}
          </button>
          <div className="w-px h-8 mx-2 bg-gray-300" aria-hidden="true"></div>
          <button onClick={() => setTamanhoFonte(prev => Math.min(prev + 2, 24))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Aumentar tamanho da fonte">A+</button>
          <button onClick={() => setTamanhoFonte(prev => Math.max(prev - 2, 12))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Diminuir tamanho da fonte">A-</button>
          <button onClick={toggleContraste} className={`font-bold px-4 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 flex items-center gap-2 ${altoContraste ? 'border-yellow-300 bg-yellow-300 text-black' : 'border-slate-800 bg-slate-800 text-white'}`} aria-label="Alternar modo de alto contraste">
            ◐ Contraste
          </button>
        </nav>
      </header>

      <main id="conteudo-principal">
        <section className={`py-20 px-6 text-center ${altoContraste ? 'bg-black border-b-4 border-yellow-300' : 'bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-900 text-white shadow-inner'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl drop-shadow-md">Educação e Inclusão <br className="hidden md:block"/> em um só lugar.</h2>
            <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${altoContraste ? 'text-yellow-300' : 'text-blue-100'}`}> Estude de graça e sem barreiras. Aqui você encontra cursos de programação e design com ferramentas de acessibilidade e tradução para Libras para apoiar o seu crescimento profissional.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#cursos" className={`w-full sm:w-auto inline-block font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-yellow-300 text-black' : 'bg-white text-blue-900 hover:bg-blue-50'}`}>Explorar Cursos ↓</a>
              <Link href="/cadastro" className={`w-full sm:w-auto inline-block font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all focus:outline-none focus:ring-4 focus:ring-orange-500 border-2 ${altoContraste ? 'border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-white text-white hover:bg-white/20'}`}>+ Cadastrar Novo Curso</Link>
            </div>
          </div>
        </section>

        <section id="cursos" className="px-6 py-16 mx-auto max-w-7xl">
          <h3 className="mb-8 text-3xl font-black tracking-wider text-center uppercase">Cursos Disponíveis</h3>
          
          {/* 🌟 BARRA DE PESQUISA COM MICROFONE */}
          <div className="relative flex items-center max-w-2xl mx-auto mb-10">
            <div className="absolute pointer-events-none left-4">
              <Search className={altoContraste ? 'text-yellow-300' : 'text-slate-400'} />
            </div>
            <input 
              type="search" 
              placeholder="Buscar por título ou assunto..." 
              aria-label="Pesquisar cursos"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={`w-full pl-12 pr-16 py-4 rounded-full font-bold text-lg border-2 outline-none transition-all focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300 placeholder-yellow-600' : 'bg-white border-slate-300 text-slate-800 focus:border-blue-700 shadow-sm'}`}
            />
            {/* Botão de Voz */}
            <button 
              onClick={iniciarPesquisaPorVoz} 
              aria-label="Pesquisar por voz"
              title="Pesquisar por voz"
              className={`absolute right-2 p-3 rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-orange-500 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                  : (altoContraste ? 'text-yellow-300 hover:bg-yellow-900/50' : 'text-slate-500 hover:bg-slate-100')
              }`}
            >
              <Mic size={24} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filtrar cursos por categoria">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setFiltroAtivo(categoria)}
                aria-pressed={filtroAtivo === categoria}
                className={`px-5 py-2 rounded-full font-bold text-sm sm:text-base outline-none transition-all focus:ring-4 focus:ring-orange-500 ${
                  filtroAtivo === categoria
                    ? (altoContraste ? 'bg-yellow-300 text-black shadow-md' : 'bg-blue-700 text-white shadow-md')
                    : (altoContraste ? 'bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-900/50' : 'bg-slate-200 text-slate-700 hover:bg-slate-300')
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cursosExibidos.length > 0 ? (
              cursosExibidos.map((curso: any) => (
                <article key={curso.id} className={`relative flex flex-col p-8 rounded-2xl border-2 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${altoContraste ? 'border-yellow-300 bg-black' : 'border-slate-200 bg-white'}`}>
                  
                  {/* 🌟 BOTÕES DE ADMIN (EDITAR E DELETAR) */}
                  {isAdmin && (
                    <div className="absolute z-10 flex gap-2 -top-4 -right-4">
                      <button 
                        onClick={() => setCursoEmEdicao(curso)}
                        aria-label={`Editar curso ${curso.titulo}`}
                        title="Editar Curso"
                        className="p-3 text-white transition-transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        onClick={() => deletarCurso(curso.id, curso.titulo)}
                        aria-label={`Apagar curso ${curso.titulo}`}
                        title="Excluir Curso"
                        className="p-3 text-white transition-transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wide ${altoContraste ? 'bg-transparent border border-yellow-300 text-yellow-300' : 'bg-blue-100 text-blue-800'}`}>
                      {curso.tag}
                    </span>
                    <RenderizadorDeIcone nomeIcone={curso.icone} altoContraste={altoContraste} />
                  </div>
                  
                  <h4 className="mb-3 text-2xl font-bold leading-tight">{curso.titulo}</h4>
                  <p className={`mb-8 flex-grow text-lg ${altoContraste ? 'text-yellow-100' : 'text-slate-600'}`}>
                    {curso.descricao}
                  </p>
                  
                  <a href={curso.link} target="_blank" rel="noopener noreferrer" className={`text-center font-bold px-6 py-3 rounded-xl outline-none transition-colors focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-700 text-white hover:bg-blue-800'}`} aria-label={`Assistir ao curso ${curso.titulo} no YouTube. Abre em nova guia.`}>
                    Acessar Curso →
                  </a>
                </article>
              ))
            ) : (
              <div className="py-10 text-center col-span-full">
                <p className="text-xl font-bold">Nenhum curso encontrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}