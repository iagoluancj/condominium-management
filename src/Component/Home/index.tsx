import React from 'react';

export default function HomePage() {
    return (
        <div className="container mx-auto p-4 mt-[15vh]">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">Bem-vindo à Página Inicial</h1>
                <p className="text-lg text-gray-600 mt-2">Descubra as principais funcionalidades e novidades do nosso sistema de gerenciamento de condomínio.</p>
            </header>
            <main>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Principais Recursos</h2>
                    <ul className="list-disc list-inside pl-5">
                        <li className="mb-2">Cadastro de Inquilinos: Facilite o registro e a administração dos moradores do seu condomínio.</li>
                        <li className="mb-2">Visualização dos Inquilinos: Acesse uma lista atualizada dos inquilinos com informações detalhadas.</li>
                        <li className="mb-2">Visão Geral do Condomínio: Obtenha uma visão completa das operações e status do seu condomínio.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Notícias e Atualizações</h2>
                    <p className="mb-4">Mantenha-se informado sobre as últimas novidades e desenvolvimentos no nosso sistema.</p>
                    <ul className="list-disc list-inside pl-5">
                        <li className="mb-2">Guia de Moradores em Desenvolvimento: Em breve, um guia completo para auxiliar no gerenciamento dos moradores.</li>
                        <li className="mb-2">Guia de Visitantes em Desenvolvimento: Estamos preparando um guia para facilitar o acesso e a gestão de visitantes.</li>
                        <li className="mb-2">Formulário Completo: Nosso formulário para cadastro e solicitações está agora 100% funcional em suas validações e pronto para uso.</li>
                    </ul>
                </section>
            </main>
            <footer className="text-end mt-8">
                <p className="text-gray-600">© 2024 Condominium Management. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
