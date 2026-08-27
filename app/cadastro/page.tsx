'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CadastroCurso() {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', link: '' });
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando o envio para o banco de dados
    setMensagem(`Sucesso! O curso "${formData.titulo}" foi preparado para envio.`);
    setFormData({ titulo: '', descricao: '', link: '' }); // Limpa o formulário
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => setMensagem(''), 5000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 text-gray-900">
      <div className="w-full max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200 border-t-8 border-t-blue-700">
        
        {/* Cabeçalho da Página */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Cadastrar Curso
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Adicione um novo conteúdo acessível à plataforma.
            </p>
          </div>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-gray-100 text-blue-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Voltar para a página inicial"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar
          </Link>
        </header>

        {/* Feedback Visual e Auditivo (Leitores de tela) */}
        {mensagem && (
          <div role="alert" aria-live="polite" className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-900 font-bold rounded-r-lg text-lg flex items-center">
            <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Título */}
          <div className="flex flex-col">
            <label htmlFor="titulo" className="font-bold text-gray-800 text-lg mb-2">
              Título do Curso <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <input 
              id="titulo" type="text" required aria-required="true"
              placeholder="Ex: Introdução à Lógica com Python"
              className="border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
              value={formData.titulo} 
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            />
          </div>

          {/* Campo Descrição */}
          <div className="flex flex-col">
            <label htmlFor="descricao" className="font-bold text-gray-800 text-lg mb-2">
              Breve Descrição <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <textarea 
              id="descricao" required aria-required="true" rows={3}
              placeholder="Descreva o que será ensinado neste curso..."
              className="border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all resize-y"
              value={formData.descricao} 
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            ></textarea>
          </div>

          {/* Campo Link */}
          <div className="flex flex-col">
            <label htmlFor="link" className="font-bold text-gray-800 text-lg mb-2">
              Link do Vídeo no YouTube <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <input 
              id="link" type="url" required aria-required="true" 
              placeholder="https://www.youtube.com/watch?v=..."
              className="border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
              value={formData.link} 
              onChange={(e) => setFormData({...formData, link: e.target.value})}
            />
          </div>

          {/* Botão Salvar */}
          <button type="submit" className="w-full bg-blue-700 text-white font-extrabold text-xl py-4 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 flex justify-center items-center mt-4 shadow-lg hover:shadow-xl">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Salvar e Publicar Curso
          </button>
        </form>
      </div>
    </main>
  );
}