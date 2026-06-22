const WPP_NUMBER = "5532998422047";

// ===== CARROSSEL PRINCIPAL (banner) =====
const track = document.getElementById('carouselTrack');
const images = track.children;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.getElementById('indicators');
let index = 0;

function createIndicators() {
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { index = i; updateCarousel(); });
    indicators.appendChild(dot);
  }
}

function updateIndicators() {
  document.querySelectorAll('.indicator').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function updateCarousel() {
  const width = images[0].clientWidth;
  track.style.transform = `translateX(-${index * width}px)`;
  updateIndicators();
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateCarousel();
});

createIndicators();
setInterval(() => { index = (index + 1) % images.length; updateCarousel(); }, 5000);


// ===== CARROSSEL DE PRODUTOS (cards) =====
document.querySelectorAll(".containerP").forEach(container => {
  const cardsContainer = container.querySelector(".cards");
  const nextBtnP = container.querySelector(".nextP");
  const prevBtnP = container.querySelector(".prevP");

  const originalCards = cardsContainer.querySelectorAll(".card");
  const firstClone = originalCards[0].cloneNode(true);
  const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

  cardsContainer.appendChild(firstClone);
  cardsContainer.prepend(lastClone);

  const cards = cardsContainer.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20;
  let indexP = 1;

  cardsContainer.style.transform = `translateX(-${indexP * cardWidth}px)`;

  nextBtnP.addEventListener("click", () => {
    if (indexP >= cards.length - 1) return;
    indexP++;
    cardsContainer.style.transition = "0.5s";
    cardsContainer.style.transform = `translateX(-${indexP * cardWidth}px)`;
  });

  prevBtnP.addEventListener("click", () => {
    if (indexP <= 0) return;
    indexP--;
    cardsContainer.style.transition = "0.5s";
    cardsContainer.style.transform = `translateX(-${indexP * cardWidth}px)`;
  });

  cardsContainer.addEventListener("transitionend", () => {
    if (cards[indexP] === firstClone) {
      cardsContainer.style.transition = "none";
      indexP = 1;
      cardsContainer.style.transform = `translateX(-${indexP * cardWidth}px)`;
    }
    if (cards[indexP] === lastClone) {
      cardsContainer.style.transition = "none";
      indexP = cards.length - 2;
      cardsContainer.style.transform = `translateX(-${indexP * cardWidth}px)`;
    }
  });
});


// ===== MODAL + WHATSAPP =====
function gerarLinkWpp(nome, preco) {
  const msg = `Olá! Tenho interesse em comprar:\n\n🛒 *${nome}*\n💰 Valor: ${preco}\n\nPoderia me ajudar com a compra?`;
  return `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function abrirModal(card) {
  const nome     = card.dataset.nome;
  const descricao = card.dataset.descricao;
  const preco    = card.dataset.preco;
  const precoAnt = card.dataset.precoAntigo;
  const img      = card.dataset.img;

  document.getElementById('modalImg').src = img;
  document.getElementById('modalImg').onerror = function () { this.src = 'img/racao-cachorro.jpg'; };
  document.getElementById('modalNome').textContent = nome;
  document.getElementById('modalDescricao').textContent = descricao;
  document.getElementById('modalPrecoPor').textContent = preco;

  const de = document.getElementById('modalPrecoDe');
  if (precoAnt) {
    de.textContent = `De: ${precoAnt}`;
    de.style.display = 'block';
  } else {
    de.style.display = 'none';
  }

  document.getElementById('modalBtnWpp').href = gerarLinkWpp(nome, preco);
  document.getElementById('modalOverlay').classList.add('ativo');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('ativo');
}

// Delegação de evento — funciona nos cards originais E nos clones
document.addEventListener('click', (e) => {
  const btnComprar = e.target.closest('.card-comprar');
  if (btnComprar) {
    e.preventDefault();
    const card = btnComprar.closest('.card');
    if (card && card.dataset.nome) {
      window.open(gerarLinkWpp(card.dataset.nome, card.dataset.preco), '_blank');
    }
    return;
  }

  const card = e.target.closest('.carouselCard .card');
  if (card && card.dataset.nome) {
    abrirModal(card);
    return;
  }

  if (e.target === document.getElementById('modalOverlay')) {
    fecharModal();
  }
});

document.getElementById('modalFechar').addEventListener('click', fecharModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

function pesquisar() {
  const termo = document.getElementById('searchInput').value.trim();
  if (termo) {
    window.location.href = `produtos.html?busca=${encodeURIComponent(termo)}`;
  }
}

// Pesquisa ao apertar Enter também
document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') pesquisar();
});