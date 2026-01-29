// ===== CONFIGURAÇÃO DOS AVATARES =====
// Substitua os caminhos abaixo pelos caminhos das suas imagens
const avatarImages = {
    neutral: 'images/avatar-neutral.png',      // Neutro - início, fim de jogo
    asking: 'images/avatar-asking.png',        // Perguntando - fazendo pedidos
    happy: 'images/avatar-happy.png',          // Feliz - carta correta
    disappointed: 'images/avatar-disappointed.png'  // Decepcionado - carta errada
};

// Função para mudar expressão do avatar
function changeAvatarExpression(expression) {
    const gameAvatar = document.getElementById('recruiterAvatarImg');
    const introAvatar = document.getElementById('introAvatarImg');
    
    if (avatarImages[expression]) {
        if (gameAvatar) gameAvatar.src = avatarImages[expression];
        if (introAvatar) introAvatar.src = avatarImages[expression];
    }
}

// Inicializar com expressão neutra
changeAvatarExpression('neutral');

// ===== CONTROLE DA TELA DE INTRODUÇÃO =====
function startInterview() {
    const bubble = document.getElementById('introBubble');
    const buttons = document.getElementById('introButtons');
    const response = document.getElementById('introResponse');
    
    // Esconder botões
    buttons.style.display = 'none';
    
    // Mudar texto do balão
    bubble.textContent = 'Ok, vamos começar!';
    
    // Mostrar resposta
    response.textContent = '✨ Preparando sua entrevista...';
    response.classList.add('show');
    
    // Iniciar jogo após 2 segundos
    setTimeout(() => {
        document.getElementById('introScreen').classList.add('hidden');
        initGame();
    }, 2000);
}

function declineInterview() {
    const bubble = document.getElementById('introBubble');
    const buttons = document.getElementById('introButtons');
    const response = document.getElementById('introResponse');
    
    // Esconder botões
    buttons.style.display = 'none';
    
    // Mudar texto do balão
    bubble.textContent = 'Que tal se preparar e voltar mais tarde?';
    
    // Mostrar resposta
    response.textContent = '😅 Hmm...';
    response.classList.add('show');
    
    // Após 1.5 segundos, mudar de ideia
    setTimeout(() => {
        bubble.textContent = 'Ok... Por que não tentamos mesmo assim!? Quem sabe!';
        response.textContent = '✨ Vamos lá então!';
        
        // Iniciar jogo após mais 2 segundos
        setTimeout(() => {
            document.getElementById('introScreen').classList.add('hidden');
            initGame();
        }, 2000);
    }, 1500);
}

// ===== DADOS DOS PROJETOS =====
const projectsData = [
    {
        id: 1,
        title: "Landing Page Responsiva",
        type: "Website",
        icon: "🎨",
        techs: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/seu-usuario/projeto1"
    },
    {
        id: 2,
        title: "Dashboard Admin",
        type: "Dashboard",
        icon: "📊",
        techs: ["React", "Chart.js", "API"],
        link: "https://github.com/seu-usuario/projeto2"
    },
    {
        id: 3,
        title: "E-commerce",
        type: "Website",
        icon: "🛒",
        techs: ["JavaScript", "CSS", "API"],
        link: "https://github.com/seu-usuario/projeto3"
    },
    {
        id: 4,
        title: "To-Do App",
        type: "Aplicativo",
        icon: "✅",
        techs: ["React", "LocalStorage"],
        link: "https://github.com/seu-usuario/projeto4"
    },
    {
        id: 5,
        title: "Blog Pessoal",
        type: "Website",
        icon: "📝",
        techs: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/seu-usuario/projeto5"
    },
    {
        id: 6,
        title: "Calculadora",
        type: "Aplicativo",
        icon: "🔢",
        techs: ["JavaScript", "CSS"],
        link: "https://github.com/seu-usuario/projeto6"
    },
    {
        id: 7,
        title: "Portfolio Site",
        type: "Website",
        icon: "💼",
        techs: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/seu-usuario/projeto7"
    },
    {
        id: 8,
        title: "Weather App",
        type: "Aplicativo",
        icon: "🌤️",
        techs: ["API", "JavaScript", "CSS"],
        link: "https://github.com/seu-usuario/projeto8"
    },
    {
        id: 9,
        title: "Quiz Game",
        type: "Jogo",
        icon: "🎮",
        techs: ["JavaScript", "HTML", "CSS"],
        link: "https://github.com/seu-usuario/projeto9"
    },
    {
        id: 10,
        title: "Chat Interface",
        type: "Aplicativo",
        icon: "💬",
        techs: ["React", "CSS", "WebSocket"],
        link: "https://github.com/seu-usuario/projeto10"
    }
];

// ===== PEDIDOS DO RECRUTADOR =====
const recruiterRequests = [
    { text: "Preciso de um", tag: "Website", match: "type" },
    { text: "Você sabe", tag: "React", match: "tech" },
    { text: "Tem experiência com", tag: "JavaScript", match: "tech" },
    { text: "Preciso de um", tag: "Dashboard", match: "type" },
    { text: "Você domina", tag: "CSS", match: "tech" },
    { text: "Preciso de um", tag: "Aplicativo", match: "type" },
    { text: "Tem algum projeto de", tag: "API", match: "tech" },
    { text: "Já fez algum", tag: "Jogo", match: "type" },
];

// ===== ESTADO DO JOGO =====
let deck = [...projectsData];
let hand = [];
let playedCards = [];
let currentRequest = null;
let progress = 50; // Começa em 50% (meio)
let requestIndex = 0;
let deckTopCard = null; // Carta do topo do deck

// ===== INICIALIZAÇÃO =====
function initGame() {
    shuffleDeck();
    updateDeckCounter();
    createDeckTopCard();
    makeNextRequest();
}

function shuffleDeck() {
    deck.sort(() => Math.random() - 0.5);
}

function updateDeckCounter() {
    document.getElementById('deckCounter').textContent = `${deck.length} / 10`;
}

// ===== PEDIDOS DO RECRUTADOR =====
function makeNextRequest() {
    if (requestIndex >= recruiterRequests.length) {
        requestIndex = 0;
    }
    
    currentRequest = recruiterRequests[requestIndex];
    requestIndex++;

    // Mudar para expressão de pergunta
    changeAvatarExpression('asking');

    const speech = document.getElementById('recruiterSpeech');
    speech.innerHTML = `${currentRequest.text} <span class="request-tag">${currentRequest.tag}</span>?`;
}

// ===== CRIAÇÃO DE CARTAS =====
function createCard(project, faceDown = false) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = project.id;
    card.dataset.type = project.type;
    card.dataset.techs = project.techs.join(',');
    card.dataset.link = project.link;

    if (faceDown) {
        // Carta virada para baixo (verso)
        card.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 60px;">
                🎴
            </div>
        `;
        card.classList.add('face-down');
    } else {
        // Carta virada para cima (frente)
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${project.icon}</div>
                <div class="card-title">${project.title}</div>
            </div>
            <div class="card-body">
                <div class="card-type">${project.type}</div>
                <div class="card-techs">
                    ${project.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <a href="${project.link}" target="_blank" class="card-link">Ver Projeto →</a>
        `;
    }

    return card;
}

// ===== SISTEMA DE DECK =====
function createDeckTopCard() {
    if (deck.length === 0) {
        checkDeckEmpty();
        return;
    }

    const project = deck[0];
    deckTopCard = createCard(project, true);
    deckTopCard.classList.add('deck-top-card');
    
    const deckPile = document.getElementById('deckPile');
    deckPile.appendChild(deckTopCard);
    
    deckTopCard.style.position = 'absolute';
    deckTopCard.style.left = '0';
    deckTopCard.style.top = '0';
    deckTopCard.style.zIndex = '101';

    makeDeckCardDraggable(deckTopCard);
}

function makeDeckCardDraggable(card) {
    Draggable.create(card, {
        type: "x,y",
        zIndexBoost: false,
        onDragStart: function() {
            card.classList.add('dragging');
            card.style.zIndex = '1000';
            highlightEmptySlots(true);
        },
        onDragEnd: function() {
            card.classList.remove('dragging');
            highlightEmptySlots(false);
            
            const playerHand = document.getElementById('playerHand');
            
            if (this.hitTest(playerHand, "50%")) {
                addCardToHand(card);
            } else {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }
    });
}

function highlightEmptySlots(highlight) {
    const handSlots = document.querySelectorAll('.hand-slot');
    handSlots.forEach(slot => {
        if (!slot.hasChildNodes()) {
            if (highlight) {
                slot.style.borderColor = 'rgba(46, 213, 115, 0.8)';
                slot.style.background = 'rgba(46, 213, 115, 0.1)';
            } else {
                slot.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                slot.style.background = 'rgba(0,0,0,0.2)';
            }
        }
    });
}

function addCardToHand(card) {
    if (hand.length >= 3) {
        showFeedback('Mão cheia!', 'wrong');
        gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        return;
    }
    
    Draggable.get(card).kill();
    
    const projectId = parseInt(card.dataset.id);
    const project = projectsData.find(p => p.id === projectId);
    
    deck.shift();
    updateDeckCounter();
    
    const handSlots = document.querySelectorAll('.hand-slot');
    let targetSlot = null;
    handSlots.forEach(slot => {
        if (!slot.hasChildNodes() && !targetSlot) {
            targetSlot = slot;
        }
    });
    
    if (!targetSlot) return;
    
    const cardRect = card.getBoundingClientRect();
    const slotRect = targetSlot.getBoundingClientRect();
    
    document.body.appendChild(card);
    card.style.position = 'fixed';
    card.style.left = cardRect.left + 'px';
    card.style.top = cardRect.top + 'px';
    card.style.zIndex = '500';
    
    gsap.to(card, {
        left: slotRect.left,
        top: slotRect.top,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
            card.remove();
            
            const newCard = createCard(project, false);
            newCard.style.position = 'relative';
            targetSlot.appendChild(newCard);
            
            hand.push(newCard);
            makeCardDraggable(newCard);
            
            deckTopCard = null;
            createDeckTopCard();
        }
    });
}

function checkDeckEmpty() {
    return deck.length === 0;
}

// ===== SISTEMA DE CARTAS NA MÃO =====
function makeCardDraggable(card) {
    Draggable.create(card, {
        type: "x,y",
        onDragStart: function() {
            card.classList.add('dragging');
            document.getElementById('dropZone').classList.add('active');
        },
        onDragEnd: function() {
            card.classList.remove('dragging');
            document.getElementById('dropZone').classList.remove('active');
            
            const dropZone = document.getElementById('dropZone');
            
            if (this.hitTest(dropZone, "50%")) {
                playCard(card);
            } else {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    duration: 0.3
                });
            }
        }
    });
}

// ===== JOGAR CARTA =====
function playCard(card) {
    const cardType = card.dataset.type;
    const cardTechs = card.dataset.techs.split(',');
    const isCorrect = checkCardMatch(cardType, cardTechs);

    if (isCorrect) {
        changeAvatarExpression('happy');
        showFeedback('✓ Perfeito!', 'correct');
        updateProgress(10);
        
        const index = hand.indexOf(card);
        if (index > -1) hand.splice(index, 1);
        
        const playedArea = document.getElementById('playedCardsArea');
        document.body.appendChild(card);
        
        const areaRect = playedArea.getBoundingClientRect();
        const cardsInArea = playedArea.children.length;
        
        const targetX = areaRect.left;
        const targetY = areaRect.top + (cardsInArea * 240);
        
        gsap.to(card, {
            x: targetX,
            y: targetY,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                card.classList.add('played');
                playedArea.appendChild(card);
                gsap.set(card, { x: 0, y: 0, position: 'relative' });
                playedCards.push(card);
            }
        });
        
        setTimeout(() => {
            makeNextRequest();
        }, 1500);
        
    } else {
        changeAvatarExpression('disappointed');
        showFeedback('✗ Não serve!', 'wrong');
        updateProgress(-10);
        
        card.classList.add('shaking');
        
        setTimeout(() => {
            card.classList.remove('shaking');
            
            const index = hand.indexOf(card);
            if (index > -1) hand.splice(index, 1);
            
            gsap.to(card, {
                opacity: 0,
                scale: 0.5,
                rotation: 180,
                duration: 0.5,
                onComplete: () => {
                    card.remove();
                    
                    if (checkDeckEmpty() && hand.length === 0) {
                        setTimeout(() => {
                            endGameDeckEmpty();
                        }, 500);
                    }
                }
            });
        }, 500);
        
        setTimeout(() => {
            if (!(checkDeckEmpty() && hand.length === 0)) {
                makeNextRequest();
            }
        }, 2000);
    }
}

function checkCardMatch(cardType, cardTechs) {
    if (currentRequest.match === 'type') {
        return cardType === currentRequest.tag;
    } else if (currentRequest.match === 'tech') {
        return cardTechs.includes(currentRequest.tag);
    }
    return false;
}

// ===== BARRA DE PROGRESSO =====
function updateProgress(amount) {
    progress += amount;
    progress = Math.max(0, Math.min(100, progress));
    
    const progressBar = document.getElementById('progressBar');
    gsap.to(progressBar, {
        width: progress + '%',
        duration: 0.5,
        ease: "power2.out"
    });

    if (progress >= 90) {
        setTimeout(() => endGame(true), 1000);
    } else if (progress <= 10) {
        setTimeout(() => endGame(false), 1000);
    }
}

// ===== FEEDBACK VISUAL =====
function showFeedback(text, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = text;
    feedback.className = `feedback ${type}`;
    
    gsap.fromTo(feedback, 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3 }
    );
    
    gsap.to(feedback, {
        opacity: 0,
        scale: 1.5,
        duration: 0.3,
        delay: 1
    });
}

// ===== FIM DE JOGO =====
function endGame(hired) {
    changeAvatarExpression('neutral');
    
    const modal = document.getElementById('gameOverModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    if (hired) {
        modalContent.className = 'modal-content hired';
        modalTitle.innerHTML = '<img src="images/avatar-happy.png" class="modal-icon"> CONTRATADO!';
        modalText.textContent = 'Parabéns! Você impressionou o recrutador com seus projetos! Seus skills demonstram excelente conhecimento técnico.';
    } else {
        modalContent.className = 'modal-content rejected';
        modalTitle.innerHTML = '<img src="images/avatar-disappointed.png" class="modal-icon"> REJEITADO';
        modalText.textContent = 'Não foi dessa vez! Continue desenvolvendo seus projetos e tente novamente. A prática leva à perfeição!';
    }

    modal.classList.add('active');
}

function endGameDeckEmpty() {
    changeAvatarExpression('neutral');
    
    const modal = document.getElementById('gameOverModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    modalContent.className = 'modal-content rejected';
    modalTitle.innerHTML = '<img src="images/avatar-disappointed.png" class="modal-icon"> Deck Vazio!';
    modalText.textContent = 'Que pena! Acabaram seus projetos. Volte com mais projetos e te daremos outra chance!';

    modal.classList.add('active');
}

function restartGame() {
    location.reload();
}

// ===== PASSAR VEZ (ESPAÇO) =====
document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
        if (checkDeckEmpty() && hand.length === 0) {
            endGameDeckEmpty();
            return;
        }
        
        showFeedback('✗ Passou a vez!', 'wrong');
        updateProgress(-10);
        setTimeout(() => {
            makeNextRequest();
        }, 1500);
    }
});
