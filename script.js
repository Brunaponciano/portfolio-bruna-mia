/**
 * ====================================================================
 * PORTFÓLIO BRUNA — SCRIPT PRINCIPAL & ASSISTENTE VIRTUAL MIA
 * ====================================================================
 * Este script gerencia:
 * 1. Abertura e fechamento da janela de conversa da Mia.
 * 2. Envio e exibição de mensagens no chat.
 * 3. Base de conhecimento e respostas automáticas inteligentes da Mia.
 * 4. Interação com perguntas sugeridas (chips rápidos).
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const miaAssistente = document.getElementById('mia-assistente');
    const miaChat = document.getElementById('mia-chat');
    const miaBtnFechar = document.getElementById('mia-btn-fechar');
    const miaMensagens = document.getElementById('mia-mensagens');
    const miaForm = document.getElementById('mia-form');
    const miaInput = document.getElementById('mia-input');
    const chipsSugestoes = document.querySelectorAll('.mia-chip');

    // Variável para controlar se as boas-vindas já foram enviadas
    let boasVindasEnviadas = false;

    // --- MENSAGEM DE BOAS-VINDAS INICIAL ---
    function enviarBoasVindas() {
        if (!boasVindasEnviadas) {
            adicionarMensagem(
                'mia',
                'Olá! Eu sou a **Mia**, a assistente virtual da Bruna! 💜✨\n\nEstou aqui para te apresentar a trajetória, formação e projetos dela. Você pode escolher uma pergunta sugerida abaixo ou digitar o que gostaria de saber!'
            );
            boasVindasEnviadas = true;
        }
    }

    // --- CONTROLE DE ABERTURA E FECHAMENTO DO CHAT ---
    function abrirChat() {
        miaChat.classList.remove('mia-chat-oculto');
        enviarBoasVindas();
        // Dá foco no campo de digitação para facilitar o uso no computador
        setTimeout(() => {
            miaInput.focus();
        }, 300);
    }

    function fecharChat() {
        miaChat.classList.add('mia-chat-oculto');
    }

    // Eventos de clique no avatar e no botão de fechar
    if (miaAssistente) {
        miaAssistente.addEventListener('click', () => {
            const estaOculto = miaChat.classList.contains('mia-chat-oculto');
            if (estaOculto) {
                abrirChat();
            } else {
                fecharChat();
            }
        });

        // Acessibilidade via teclado (Enter ou Espaço no avatar da Mia)
        miaAssistente.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirChat();
            }
        });
    }

    if (miaBtnFechar) {
        miaBtnFechar.addEventListener('click', (e) => {
            e.stopPropagation();
            fecharChat();
        });
    }

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !miaChat.classList.contains('mia-chat-oculto')) {
            fecharChat();
        }
    });

    // --- FUNÇÃO PARA ADICIONAR MENSAGENS NO CHAT ---
    function adicionarMensagem(remetente, texto) {
        const elementoMsg = document.createElement('div');
        elementoMsg.classList.add('mia-msg');

        if (remetente === 'usuario') {
            elementoMsg.classList.add('mia-msg-usuario');
            elementoMsg.textContent = texto;
        } else {
            elementoMsg.classList.add('mia-msg-mia');
            // Formata negrito simples (**texto**) e quebras de linha (\n)
            const textoFormatado = texto
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            elementoMsg.innerHTML = textoFormatado;
        }

        miaMensagens.appendChild(elementoMsg);

        // Rola automaticamente para a última mensagem
        miaMensagens.scrollTop = miaMensagens.scrollHeight;
    }

    // --- FUNÇÃO PARA NORMALIZAR TEXTO (remove acentos e maiúsculas) ---
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
            .trim();
    }

    // --- BASE DE CONHECIMENTO E RESPOSTAS DA MIA ---
    function obterRespostaMia(perguntaOriginal) {
        const p = normalizar(perguntaOriginal);

        // 1. Saudações
        if (p.includes('oi') || p.includes('ola') || p.includes('bom dia') || p.includes('boa tarde') || p.includes('boa noite') || p.includes('hey') || p.includes('tudo bem')) {
            return 'Olá! Que bom ter você aqui! 💜 Como posso te ajudar hoje? Fique à vontade para me perguntar sobre a **formação**, **habilidades**, **projetos** ou **contato** da Bruna!';
        }

        // 2. Sobre a Mia
        if (p.includes('quem e voce') || (p.includes('voce') && p.includes('mia')) || p.includes('assistente')) {
            return 'Eu sou a **Mia**, a assistente virtual deste portfólio! 🤖💜 Fui programada com JavaScript para interagir com você e tirar dúvidas sobre a carreira e os projetos da Bruna.';
        }

        // 3. Sobre a Bruna / Trajetória
        if (p.includes('quem') || p.includes('sobre') || p.includes('bruna') || p.includes('trajetoria') || p.includes('historia') || p.includes('saude') || p.includes('agente')) {
            return 'A **Bruna** é estudante de **Análise e Desenvolvimento de Sistemas** e está em transição de carreira para a área de tecnologia! 🚀\n\nEla também atua como Agente Comunitária de Saúde, o que despertou seu interesse por sistemas de informação, organização de dados e no desenvolvimento de soluções tecnológicas que façam a diferença na vida das pessoas.';
        }

        // 4. Formação Acadêmica
        if (p.includes('formacao') || p.includes('faculdade') || p.includes('estuda') || p.includes('curso') || p.includes('ads') || p.includes('graduacao')) {
            return '🎓 **Formação Acadêmica da Bruna:**\n\nEla cursa o Ensino Superior em **Análise e Desenvolvimento de Sistemas (ADS)**.\n\nDurante o curso e em estudos contínuos, ela desenvolve conhecimentos sólidos em lógica de programação, arquitetura de software, desenvolvimento web e Inteligência Artificial.';
        }

        // 5. Conhecimentos e Tecnologias
        if (p.includes('habilidade') || p.includes('habilidades') || p.includes('tecnologia') || p.includes('tecnologias') || p.includes('skills') || p.includes('linguagem') || p.includes('conhecimento') || p.includes('python') || p.includes('java') || p.includes('html') || p.includes('css') || p.includes('javascript') || p.includes('git')) {
            return '💻 **Conhecimentos e Tecnologias:**\n\n• **Front-end:** HTML5, CSS3, JavaScript e interfaces responsivas.\n• **Back-end & Lógica:** Python e Java.\n• **Ferramentas:** Git, GitHub e VS Code.\n• **Interesses:** Inteligência Artificial e sistemas de informação para a saúde.';
        }

        // 6. Projetos
        if (p.includes('projeto') || p.includes('projetos') || p.includes('cuidar') || p.includes('memoria') || p.includes('aps') || p.includes('trabalho')) {
            return '📂 **Projetos em Destaque:**\n\n1. **CUIDAR+**: Sistema em Python para organização de medicamentos, registro de doses e acompanhamento de consultas.\n2. **Jogo da Memória**: Projeto interativo com HTML, CSS e JavaScript para praticar manipulação do DOM.\n3. **APS Digital**: Projeto conceitual voltado à melhoria dos fluxos e atendimentos na Atenção Primária à Saúde.\n\nConfira todos os detalhes rolando a página até a seção de Projetos!';
        }

        // 7. Contato e Redes
        if (p.includes('contato') || p.includes('linkedin') || p.includes('github') || p.includes('email') || p.includes('falar') || p.includes('mensagem') || p.includes('conectar')) {
            return '📬 **Vamos nos conectar?**\n\nVocê pode encontrar a Bruna no **LinkedIn** e acompanhar os repositórios de código dela no **GitHub**!\n\nConfira os links diretos na seção de Contato no final da página.';
        }

        // 8. Agradecimentos
        if (p.includes('obrigad') || p.includes('valeu') || p.includes('legal') || p.includes('parabens') || p.includes('show') || p.includes('gostei')) {
            return 'Por nada! Fico muito feliz em ajudar! 💜 Se precisar de mais alguma informação sobre a Bruna, é só me chamar!';
        }

        // 9. Resposta Padrão (Fallback)
        return 'Hum, ainda estou aprendendo e não consegui compreender totalmente essa pergunta! 🤔\n\nQue tal tentar uma das opções abaixo?\n• **Sobre a Bruna**\n• **Formação**\n• **Habilidades**\n• **Projetos**\n• **Contato**';
    }

    // --- PROCESSAMENTO DO ENVIO DE MENSAGENS ---
    function processarEnvio(texto) {
        const mensagemTexto = texto.trim();
        if (mensagemTexto === '') return;

        // 1. Exibe a mensagem do usuário
        adicionarMensagem('usuario', mensagemTexto);
        miaInput.value = '';

        // 2. Simula um pequeno tempo de resposta ("digitando...")
        setTimeout(() => {
            const resposta = obterRespostaMia(mensagemTexto);
            adicionarMensagem('mia', resposta);
        }, 450);
    }

    // Evento do formulário (botão enviar ou tecla Enter)
    if (miaForm) {
        miaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processarEnvio(miaInput.value);
        });
    }

    // Evento de clique nas perguntas sugeridas (chips)
    chipsSugestoes.forEach((chip) => {
        chip.addEventListener('click', () => {
            const pergunta = chip.getAttribute('data-pergunta') || chip.textContent;
            processarEnvio(pergunta);
        });
    });
});
