'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CadastroCurso() {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', link: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No futuro, aqui chamaremos a API do backend
    alert('Pronto para integrar o backend! Título capturado: ' + formData.titulo);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border-2 border-gray-200">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Cadastrar Novo Curso</h1>
          <Link href="/" className="text-blue-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-1">
            Voltar para o Início
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Título */}
          <div className="flex flex-col">
            <label htmlFor="titulo" className="font-bold mb-1">
              Título do Curso <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <input 
              id="titulo" type="text" required aria-required="true"
              className="border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
              value={formData.titulo} 
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            />
          </div>

          {/* Campo Descrição */}
          <div className="flex flex-col">
            <label htmlFor="descricao" className="font-bold mb-1">
              Breve Descrição <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <textarea 
              id="descricao" required aria-required="true" rows="3"
              className="border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
              value={formData.descricao} 
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            ></textarea>
          </div>

          {/* Campo Link */}
          <div className="flex flex-col">
            <label htmlFor="link" className="font-bold mb-1">
              Link do YouTube <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <input 
              id="link" type="url" required aria-required="true" placeholder="https://youtube.com/..."
              className="border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
              value={formData.link} 
              onChange={(e) => setFormData({...formData, link: e.target.value})}
            />
          </div>

          {/* Botão Salvar */}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-orange-500">
            Salvar Curso
          </button>
        </form>
      </div>
    </div>
  );
}