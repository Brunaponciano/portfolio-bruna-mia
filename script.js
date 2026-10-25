/**
 * ====================================================================
 * PORTFÓLIO BRUNA — SCRIPT PRINCIPAL & ASSISTENTE VIRTUAL MIA
 * ====================================================================
 * Este arquivo contém todo o código JavaScript responsável por:
 * 1. Abrir e fechar a janela de conversa da Mia com animação suave.
 * 2. Capturar o que o visitante digita ou clica.
 * 3. Exibir balões de conversa dinâmicos na tela.
 * 4. Processar perguntas e responder com inteligência programada.
 *
 * ÍNDICE DE SEÇÕES:
 * 1. Inicialização segura com DOMContentLoaded
 * 2. Seleção de Elementos da Página (DOM)
 * 3. Controle da Janela de Conversa (Abrir & Fechar)
 * 4. Escutadores de Eventos (Cliques & Teclas)
 * 5. Criação Dinâmica dos Balões de Mensagem
 * 6. Normalização de Texto (Remoção de Acentos e Maiúsculas)
 * 7. Cérebro da Mia: Base de Conhecimento & Respostas
 * 8. Envio de Mensagens & Efeito de Digitação
 * ====================================================================
 */

// --------------------------------------------------------------------
// 1. INICIALIZAÇÃO SEGURA
// O evento 'DOMContentLoaded' garante que o código só execute após
// todo o HTML estar completamente carregado pelo navegador.
// --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------
    // 2. SELEÇÃO DE ELEMENTOS DO DOM (Document Object Model)
    // Guardamos referências aos elementos HTML em constantes (const)
    // para poder interagir com eles rapidamente no código.
    // ----------------------------------------------------------------
    const miaAssistente  = document.getElementById('mia-assistente'); // Avatar/botão flutuante
    const miaChat        = document.getElementById('mia-chat');       // Janela principal do chat
    const miaBtnFechar   = document.getElementById('mia-btn-fechar');  // Botão ✕ de fechar
    const miaMensagens   = document.getElementById('mia-mensagens');   // Área onde ficam os balões
    const miaForm        = document.getElementById('mia-form');        // Formulário de envio
    const miaInput       = document.getElementById('mia-input');       // Campo onde o usuário digita
    const chipsSugestoes = document.querySelectorAll('.mia-chip');     // Botões com sugestões rápidas

    // Variável de controle (booleana) para enviar as boas-vindas apenas 1 vez
    let boasVindasEnviadas = false;

    // ----------------------------------------------------------------
    // 3. CONTROLE DA JANELA DE CONVERSA (Abrir & Fechar)
    // ----------------------------------------------------------------

    /**
     * Exibe a mensagem inicial de boas-vindas da Mia na primeira abertura.
     */
    function enviarBoasVindas() {
        if (!boasVindasEnviadas) {
            adicionarMensagem(
                'mia',
                'Olá! Eu sou a **Mia**, a assistente virtual da Bruna! 💜✨\n\nEstou aqui para te apresentar a trajetória, formação e projetos dela. Você pode escolher uma pergunta sugerida abaixo ou digitar o que gostaria de saber!'
            );
            boasVindasEnviadas = true;
        }
    }

    /**
     * Abre a janela de conversa:
     * - Remove a classe 'mia-chat-oculto' (faz a janela surgir na tela).
     * - Envia a mensagem de boas-vindas.
     * - Coloca o cursor piscando no campo de digitação (focus).
     */
    function abrirChat() {
        miaChat.classList.remove('mia-chat-oculto');
        enviarBoasVindas();

        // Aguarda 300ms (tempo da animação da janela) para focar no input
        setTimeout(() => {
            miaInput.focus();
        }, 300);
    }

    /**
     * Fecha a janela de conversa adicionando de volta a classe 'mia-chat-oculto'.
     */
    function fecharChat() {
        miaChat.classList.add('mia-chat-oculto');
    }

    // ----------------------------------------------------------------
    // 4. ESCUTADORES DE EVENTOS (Cliques e Teclas do Teclado)
    // ----------------------------------------------------------------

    // Clique no avatar flutuante da Mia: alterna entre abrir e fechar
    if (miaAssistente) {
        miaAssistente.addEventListener('click', () => {
            const estaOculto = miaChat.classList.contains('mia-chat-oculto');
            if (estaOculto) {
                abrirChat();
            } else {
                fecharChat();
            }
        });

        // Acessibilidade: permite abrir o chat usando a tecla Enter ou Espaço
        miaAssistente.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                abrirChat();
            }
        });
    }

    // Clique no botão ✕ do cabeçalho para fechar
    if (miaBtnFechar) {
        miaBtnFechar.addEventListener('click', (evento) => {
            evento.stopPropagation(); // Evita que o clique se propague para outros elementos
            fecharChat();
        });
    }

    // Fecha o chat automaticamente se a tecla Escape (Esc) for pressionada
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && !miaChat.classList.contains('mia-chat-oculto')) {
            fecharChat();
        }
    });

    // ----------------------------------------------------------------
    // 5. CRIAÇÃO DINÂMICA DOS BALÕES DE MENSAGEM
    // ----------------------------------------------------------------

    /**
     * Cria e insere um novo balão de mensagem no chat.
     * @param {'usuario' | 'mia'} remetente - Quem enviou a mensagem
     * @param {string} texto - O conteúdo do texto
     */
    function adicionarMensagem(remetente, texto) {
        // 1. Cria a tag <div> que representará o balão
        const elementoMsg = document.createElement('div');
        elementoMsg.classList.add('mia-msg');

        // 2. Aplica a classe correspondente ao remetente
        if (remetente === 'usuario') {
            elementoMsg.classList.add('mia-msg-usuario');
            elementoMsg.textContent = texto; // textContent é seguro contra injeção de HTML malicioso
        } else {
            elementoMsg.classList.add('mia-msg-mia');
            
            // Permite formatação simples: **negrito** e quebras de linha (\n)
            const textoFormatado = texto
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            elementoMsg.innerHTML = textoFormatado;
        }

        // 3. Adiciona o novo balão dentro da área de mensagens
        miaMensagens.appendChild(elementoMsg);

        // 4. Rola a barra de rolagem até o final para exibir a mensagem mais recente
        miaMensagens.scrollTop = miaMensagens.scrollHeight;
    }

    // ----------------------------------------------------------------
    // 6. NORMALIZAÇÃO DE TEXTO
    // ----------------------------------------------------------------

    /**
     * Limpa uma string para facilitar a comparação:
     * - Converte para letras minúsculas (ex: "Oi" -> "oi").
     * - Remove acentos gráficos (ex: "formação" -> "formacao").
     * - Remove pontuações e espaços extras nas pontas.
     * @param {string} textoOriginal
     * @returns {string} textoLimpo
     */
    function normalizar(textoOriginal) {
        return textoOriginal
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
            .trim();
    }

    // ----------------------------------------------------------------
    // 7. CÉREBRO DA MIA: BASE DE CONHECIMENTO & RESPOSTAS
    // Avalia o texto enviado pelo visitante e encontra a melhor resposta.
    // ----------------------------------------------------------------

    /**
     * Retorna a resposta programada com base nas palavras-chave encontradas.
     * @param {string} perguntaOriginal
     * @returns {string} respostaFormatada
     */
    function obterRespostaMia(perguntaOriginal) {
        const p = normalizar(perguntaOriginal);

        // 1. Saudações e Cumprimentos
        if (p.includes('oi') || p.includes('ola') || p.includes('bom dia') || p.includes('boa tarde') || p.includes('boa noite') || p.includes('hey') || p.includes('tudo bem')) {
            return 'Olá! Que bom ter você aqui! 💜 Como posso te ajudar hoje? Fique à vontade para me perguntar sobre a **formação**, **habilidades**, **projetos** ou **contato** da Bruna!';
        }

        // 2. Sobre quem é a Mia
        if (p.includes('quem e voce') || (p.includes('voce') && p.includes('mia')) || p.includes('assistente')) {
            return 'Eu sou a **Mia**, a assistente virtual deste portfólio! 🤖💜 Fui programada com JavaScript para interagir com você e tirar dúvidas sobre a carreira e os projetos da Bruna.';
        }

        // 3. Sobre a Bruna e sua Trajetória
        if (p.includes('quem') || p.includes('sobre') || p.includes('bruna') || p.includes('trajetoria') || p.includes('historia') || p.includes('saude') || p.includes('agente')) {
            return 'A **Bruna** é estudante de **Análise e Desenvolvimento de Sistemas** e está em transição de carreira para a área de tecnologia! 🚀\n\nEla também atua como Agente Comunitária de Saúde, o que despertou seu interesse por sistemas de informação, organização de dados e no desenvolvimento de soluções tecnológicas que façam a diferença na vida das pessoas.';
        }

        // 4. Formação Acadêmica
        if (p.includes('formacao') || p.includes('faculdade') || p.includes('estuda') || p.includes('curso') || p.includes('ads') || p.includes('graduacao')) {
            return '🎓 **Formação Acadêmica da Bruna:**\n\nA Bruna está **estudando atualmente** no Ensino Superior, cursando **Análise e Desenvolvimento de Sistemas (ADS)**.\n\nEla está focada no aprendizado contínuo de lógica de programação, arquitetura de software, desenvolvimento web e Inteligência Artificial.';
        }

        // 5. Conhecimentos e Tecnologias em Estudo
        if (p.includes('habilidade') || p.includes('habilidades') || p.includes('tecnologia') || p.includes('tecnologias') || p.includes('skills') || p.includes('linguagem') || p.includes('conhecimento') || p.includes('python') || p.includes('java') || p.includes('html') || p.includes('css') || p.includes('javascript') || p.includes('git')) {
            return '💻 **Tecnologias que a Bruna está Estudando:**\n\n• **Front-end:** HTML5, CSS3 e JavaScript (estudando e praticando).\n• **Back-end & Lógica:** Python e Java (em aprendizado ativo).\n• **Ferramentas:** Git, GitHub e VS Code.\n• **Interesses:** Inteligência Artificial e tecnologia aplicada à saúde pública.';
        }

        // 6. Projetos
        if (p.includes('projeto') || p.includes('projetos') || p.includes('cuidar') || p.includes('memoria') || p.includes('aps') || p.includes('trabalho')) {
            return '📂 **Projetos e Estudos da Bruna:**\n\n1. **CUIDAR+**: Sistema em desenvolvimento em Python para organização de medicamentos e consultas.\n2. **Jogo da Memória**: Projeto planejado como próximo objetivo de estudo prático (ainda não desenvolvido).\n3. **APS Digital**: Projeto conceitual inspirado na vivência na Atenção Primária à Saúde.\n\nConfira os detalhes na seção de Projetos do site!';
        }

        // 7. Contato e Redes Sociais
        if (p.includes('contato') || p.includes('linkedin') || p.includes('github') || p.includes('email') || p.includes('falar') || p.includes('mensagem') || p.includes('conectar')) {
            return '📬 **Vamos nos conectar?**\n\nVocê pode encontrar a Bruna no **LinkedIn** e acompanhar os repositórios de código dela no **GitHub**!\n\nConfira os links diretos na seção de Contato no final da página.';
        }

        // 8. Mensagens de Agradecimento
        if (p.includes('obrigad') || p.includes('valeu') || p.includes('legal') || p.includes('parabens') || p.includes('show') || p.includes('gostei')) {
            return 'Por nada! Fico muito feliz em ajudar! 💜 Se precisar de mais alguma informação sobre a Bruna, é só me chamar!';
        }

        // 9. Resposta Padrão (Fallback quando a Mia não reconhece a pergunta)
        return 'Hum, ainda estou aprendendo e não consegui compreender totalmente essa pergunta! 🤔\n\nQue tal tentar uma das opções abaixo?\n• **Sobre a Bruna**\n• **Formação**\n• **Habilidades**\n• **Projetos**\n• **Contato**';
    }

    // ----------------------------------------------------------------
    // 8. ENVIO DE MENSAGENS & EFEITO DE DIGITAÇÃO
    // ----------------------------------------------------------------

    /**
     * Orquestra o envio da mensagem do usuário e a resposta da Mia.
     * @param {string} texto - Texto digitado ou pergunta sugerida clicada
     */
    function processarEnvio(texto) {
        const mensagemTexto = texto.trim();
        if (mensagemTexto === '') return; // Não envia mensagens vazias

        // 1. Exibe o balão com o texto do visitante
        adicionarMensagem('usuario', mensagemTexto);
        miaInput.value = ''; // Limpa o campo de texto

        // 2. Simula um pequeno tempo de digitação (450ms) antes da Mia responder
        setTimeout(() => {
            const resposta = obterRespostaMia(mensagemTexto);
            adicionarMensagem('mia', resposta);
        }, 450);
    }

    // Evento de envio pelo formulário (funciona ao clicar no botão ou ao apertar Enter)
    if (miaForm) {
        miaForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Impede o recarregamento padrão da página
            processarEnvio(miaInput.value);
        });
    }

    // Evento de clique nas perguntas sugeridas (Chips rápidos)
    chipsSugestoes.forEach((chip) => {
        chip.addEventListener('click', () => {
            const pergunta = chip.getAttribute('data-pergunta') || chip.textContent;
            processarEnvio(pergunta);
        });
    });
});
