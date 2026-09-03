'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Accessibility } from 'lucide-react'; // 🌟 Importamos o ícone de Acessibilidade

export default function CadastroCurso() {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', link: '', tag: 'Tecnologia' });
  const [tagPersonalizada, setTagPersonalizada] = useState('');
  const [toast, setToast] = useState('');

  // 🌟 NOVOS ESTADOS: Controle de Acessibilidade
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);

  // 🌟 NOVO: Carrega as preferências assim que a página abre
  useEffect(() => {
    const salvoContraste = localStorage.getItem('alto-contraste');
    if (salvoContraste === 'ativo') setAltoContraste(true);
  }, []);

  const toggleContraste = () => {
    const novoEstado = !altoContraste;
    setAltoContraste(novoEstado);
    localStorage.setItem('alto-contraste', novoEstado ? 'ativo' : 'inativo');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagFinal = formData.tag === 'Outro' ? tagPersonalizada : formData.tag;
    const cursosSalvos = JSON.parse(localStorage.getItem('@acessoja:cursos') || '[]');

    let iconeEscolhido = 'Lightbulb'; 
    if (tagFinal === 'Tecnologia') iconeEscolhido = 'MonitorPlay';
    if (tagFinal === 'Design') iconeEscolhido = 'Palette';
    if (tagFinal === 'Acessibilidade') iconeEscolhido = 'Accessibility';
    if (tagFinal === 'Idiomas') iconeEscolhido = 'Languages';
    if (tagFinal === 'Carreira') iconeEscolhido = 'Briefcase';

    const novoCurso = {
      id: Date.now(),
      tag: tagFinal,
      titulo: formData.titulo,
      descricao: formData.descricao,
      link: formData.link,
      icone: iconeEscolhido 
    };

    localStorage.setItem('@acessoja:cursos', JSON.stringify([...cursosSalvos, novoCurso]));

    setToast(`Curso "${formData.titulo}" publicado com sucesso!`);
    setFormData({ titulo: '', descricao: '', link: '', tag: 'Tecnologia' }); 
    setTagPersonalizada('');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    // 🌟 Atualizamos a div principal para reagir ao alto contraste e fonte
    <div className={`min-h-screen transition-colors duration-300 relative ${altoContraste ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-800'}`} style={{ fontSize: `${tamanhoFonte}px` }}>
      
      {/* 🌟 NOVO: Cabeçalho idêntico ao da página inicial */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 shadow-sm px-6 py-4 flex justify-between items-center flex-wrap gap-4 ${altoContraste ? 'bg-black/90 border-yellow-300' : 'bg-white/90 border-slate-200'}`}>
        <h1 className="flex items-center gap-3 text-2xl font-black tracking-tight">
          <Accessibility size={32} className={altoContraste ? 'text-yellow-300' : 'text-blue-700'} aria-hidden="true" />
          {/* Transformamos o título em um link para voltar pra home clicando no logo */}
          <Link href="/" className={altoContraste ? 'text-yellow-300 hover:underline' : 'text-blue-800 hover:underline'}>
            AcessoJá
          </Link>
        </h1>
        
        <nav aria-label="Ferramentas de acessibilidade" className="flex items-center gap-2">
          <button onClick={() => setTamanhoFonte(prev => Math.min(prev + 2, 24))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Aumentar tamanho da fonte">A+</button>
          <button onClick={() => setTamanhoFonte(prev => Math.max(prev - 2, 12))} className={`font-bold px-3 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Diminuir tamanho da fonte">A-</button>
          <button onClick={toggleContraste} className={`font-bold px-4 py-1.5 rounded-lg border-2 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 flex items-center gap-2 ${altoContraste ? 'border-yellow-300 bg-yellow-300 text-black' : 'border-slate-800 bg-slate-800 text-white'}`} aria-label="Alternar modo de alto contraste">
            ◐ Contraste
          </button>
        </nav>
      </header>

      <main className="flex items-center justify-center p-4 mt-4 sm:p-8">
        
        {toast && (
          <div role="alert" className="fixed z-50 flex items-center gap-3 px-6 py-4 text-lg font-bold text-white bg-green-600 border-2 border-white shadow-2xl bottom-8 right-8 rounded-xl animate-in slide-in-from-bottom-5">
            <CheckCircle size={28} /> {toast}
          </div>
        )}

        {/* 🌟 Caixote do Formulário com cores dinâmicas */}
        <div className={`w-full max-w-3xl p-8 sm:p-12 rounded-2xl shadow-xl border-2 border-t-8 transition-colors ${altoContraste ? 'bg-black border-yellow-300 border-t-yellow-300' : 'bg-white border-gray-200 border-t-blue-700'}`}>
          
          <header className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cadastrar Curso</h2>
              <p className={`mt-2 text-lg ${altoContraste ? 'text-yellow-100' : 'text-gray-600'}`}>Adicione um novo conteúdo acessível à plataforma.</p>
            </div>
            <Link href="/" className={`inline-flex items-center justify-center font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-orange-500 ${altoContraste ? 'border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black' : 'bg-gray-100 text-blue-700 hover:bg-gray-200 hover:text-blue-800'}`}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Voltar
            </Link>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col">
              <label htmlFor="tag" className="mb-2 text-lg font-bold">Categoria do Curso <span aria-hidden="true" className="text-red-600">*</span></label>
              <select 
                id="tag" required aria-required="true"
                className={`border-2 rounded-lg p-4 text-lg outline-none focus:ring-4 focus:ring-orange-500 transition-all cursor-pointer ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300' : 'bg-white border-gray-300 focus:border-blue-700 text-black'}`}
                value={formData.tag} 
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
              >
                <option value="Tecnologia">Tecnologia</option>
                <option value="Design">Design</option>
                <option value="Acessibilidade">Acessibilidade</option>
                <option value="Idiomas">Idiomas</option>
                <option value="Carreira">Carreira</option>
                <option value="Outro">Outro (Especificar)</option> 
              </select>
            </div>

            {formData.tag === 'Outro' && (
              <div className="flex flex-col duration-300 animate-in fade-in slide-in-from-top-2">
                <label htmlFor="tagPersonalizada" className="mb-2 text-lg font-bold">Digite a nova categoria <span aria-hidden="true" className="text-red-600">*</span></label>
                <input 
                  id="tagPersonalizada" type="text" required aria-required="true"
                  placeholder="Ex: Marketing, Gestão..."
                  className={`border-2 rounded-lg p-4 text-lg outline-none focus:ring-4 focus:ring-orange-500 transition-all ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300 placeholder-yellow-700' : 'bg-blue-50 border-blue-400 focus:border-blue-700 text-black'}`}
                  value={tagPersonalizada} 
                  onChange={(e) => setTagPersonalizada(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="titulo" className="mb-2 text-lg font-bold">Título do Curso <span aria-hidden="true" className="text-red-600">*</span></label>
              <input id="titulo" type="text" required placeholder="Ex: Introdução à Lógica com Python" className={`border-2 rounded-lg p-4 text-lg outline-none focus:ring-4 focus:ring-orange-500 transition-all ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300 placeholder-yellow-700' : 'bg-white border-gray-300 focus:border-blue-700 text-black'}`} value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="descricao" className="mb-2 text-lg font-bold">Breve Descrição <span aria-hidden="true" className="text-red-600">*</span></label>
              <textarea id="descricao" required rows={3} placeholder="Descreva o que será ensinado neste curso..." className={`border-2 rounded-lg p-4 text-lg outline-none focus:ring-4 focus:ring-orange-500 transition-all resize-y ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300 placeholder-yellow-700' : 'bg-white border-gray-300 focus:border-blue-700 text-black'}`} value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})}></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="link" className="mb-2 text-lg font-bold">Link do Vídeo no YouTube <span aria-hidden="true" className="text-red-600">*</span></label>
              <input id="link" type="url" required placeholder="https://www.youtube.com/watch?v=..." className={`border-2 rounded-lg p-4 text-lg outline-none focus:ring-4 focus:ring-orange-500 transition-all ${altoContraste ? 'bg-black border-yellow-300 text-yellow-300 placeholder-yellow-700' : 'bg-white border-gray-300 focus:border-blue-700 text-black'}`} value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} />
            </div>

            <button type="submit" className={`w-full font-extrabold text-xl py-4 rounded-lg transition-colors outline-none focus:ring-4 focus:ring-orange-500 flex justify-center items-center mt-4 shadow-lg hover:shadow-xl ${altoContraste ? 'bg-yellow-300 text-black hover:bg-yellow-400' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Salvar e Publicar Curso
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}