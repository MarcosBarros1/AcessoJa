'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react'; // 🌟 Import do ícone de sucesso

export default function CadastroCurso() {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', link: '', tag: 'Tecnologia' });
  const [tagPersonalizada, setTagPersonalizada] = useState('');
  const [toast, setToast] = useState(''); // 🌟 Agora usando sistema Toast

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

    // 🌟 Ativa o Toast Flutuante
    setToast(`Curso "${formData.titulo}" publicado com sucesso!`);
    setFormData({ titulo: '', descricao: '', link: '', tag: 'Tecnologia' }); 
    setTagPersonalizada('');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen p-4 text-gray-900 bg-slate-50 sm:p-8">
      
      {/* 🌟 NOVO: Notificação Toast Flutuante da Página de Cadastro */}
      {toast && (
        <div role="alert" className="fixed z-50 flex items-center gap-3 px-6 py-4 text-lg font-bold text-white bg-green-600 border-2 border-white shadow-2xl bottom-8 right-8 rounded-xl animate-in slide-in-from-bottom-5">
          <CheckCircle size={28} /> {toast}
        </div>
      )}

      <div className="w-full max-w-3xl p-8 bg-white border border-t-8 border-gray-200 shadow-xl sm:p-12 rounded-2xl border-t-blue-700">
        
        <header className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Cadastrar Curso</h1>
            <p className="mt-2 text-lg text-gray-600">Adicione um novo conteúdo acessível à plataforma.</p>
          </div>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 font-bold text-blue-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-blue-800 focus:outline-none focus:ring-4 focus:ring-orange-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col">
            <label htmlFor="tag" className="mb-2 text-lg font-bold text-gray-800">Categoria do Curso <span aria-hidden="true" className="text-red-600">*</span></label>
            <select 
              id="tag" required aria-required="true"
              className="p-4 text-lg transition-all bg-white border-2 border-gray-300 rounded-lg outline-none cursor-pointer focus:border-blue-700 focus:ring-4 focus:ring-orange-500"
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
              <label htmlFor="tagPersonalizada" className="mb-2 text-lg font-bold text-gray-800">Digite a nova categoria <span aria-hidden="true" className="text-red-600">*</span></label>
              <input 
                id="tagPersonalizada" type="text" required aria-required="true"
                placeholder="Ex: Marketing, Gestão..."
                className="p-4 text-lg transition-all border-2 border-blue-400 rounded-lg outline-none bg-blue-50 focus:border-blue-700 focus:ring-4 focus:ring-orange-500"
                value={tagPersonalizada} 
                onChange={(e) => setTagPersonalizada(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="titulo" className="mb-2 text-lg font-bold text-gray-800">Título do Curso <span aria-hidden="true" className="text-red-600">*</span></label>
            <input id="titulo" type="text" required placeholder="Ex: Introdução à Lógica com Python" className="p-4 text-lg transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-700 focus:ring-4 focus:ring-orange-500" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="descricao" className="mb-2 text-lg font-bold text-gray-800">Breve Descrição <span aria-hidden="true" className="text-red-600">*</span></label>
            <textarea id="descricao" required rows={3} placeholder="Descreva o que será ensinado neste curso..." className="p-4 text-lg transition-all border-2 border-gray-300 rounded-lg outline-none resize-y focus:border-blue-700 focus:ring-4 focus:ring-orange-500" value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})}></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="link" className="mb-2 text-lg font-bold text-gray-800">Link do Vídeo no YouTube <span aria-hidden="true" className="text-red-600">*</span></label>
            <input id="link" type="url" required placeholder="https://www.youtube.com/watch?v=..." className="p-4 text-lg transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-700 focus:ring-4 focus:ring-orange-500" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} />
          </div>

          <button type="submit" className="flex items-center justify-center w-full py-4 mt-4 text-xl font-extrabold text-white transition-colors bg-blue-700 rounded-lg shadow-lg outline-none hover:bg-blue-800 focus:ring-4 focus:ring-orange-500 hover:shadow-xl">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Salvar e Publicar Curso
          </button>
        </form>
      </div>
    </main>
  );
}