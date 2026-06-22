const WPP_NUMBER = "5532998422047";

const produtos = [
  { id: 1, nome: "Ração Quatree para Cães Gourmet Raças Médias e Grandes 20kg", descricao: "Ração premium Quatree Gourmet para cães adultos de raças médias e grandes. Formulada com sabor de carne, sem corantes artificiais. Enriquecida com vitaminas e minerais para garantir saúde e vitalidade ao seu pet.", preco: 69.90, precoAntigo: 89.90, img: "img/produto-ração-Cães/quatree_cachorro.jpg", categoria: "caes", marca: "quatree", promo: true },
  { id: 2, nome: "Ração Special Dog Carne Adulto Plus 15kg", descricao: "Special Dog Adulto Plus com sabor de carne, desenvolvida especialmente para cães adultos. Rica em proteínas e com adição de ômega 3 e 6 para pelagem saudável e brilhante.", preco: 31.90, precoAntigo: null, img: "img/racao-cachorro.jpg", categoria: "caes", marca: "specialdog", promo: false },
  { id: 3, nome: "Ração Magnus Todo Dia para Cães Adultos Sabor Carne 15kg", descricao: "Magnus Todo Dia é ideal para cães adultos que merecem uma alimentação equilibrada no dia a dia. Sabor carne com nutrientes essenciais para uma vida ativa e saudável.", preco: 54.90, precoAntigo: 72.00, img: "img/racao-cachorro-2.jpg", categoria: "caes", marca: "magnus", promo: true },
  { id: 4, nome: "Ração Quatree Gourmet para Cães Adultos Raças Pequenas 10kg", descricao: "Desenvolvida exclusivamente para cães adultos de raças pequenas. Grânulos menores facilita a mastigação. Com sabor irresistível e alto valor nutricional.", preco: 118.90, precoAntigo: 139.90, img: "img/produto-ração-Cães/quatree_cachorro.jpg", categoria: "caes", marca: "quatree", promo: true },
  { id: 5, nome: "Ração Premier Gatos Adultos Frango 7,5kg", descricao: "Premier é referência em alimentação felina. Esta ração para gatos adultos com sabor frango garante todo o aporte nutricional que seu felino precisa para viver com saúde e energia.", preco: 149.90, precoAntigo: 179.90, img: "img/quatree_gatos.jpg", categoria: "gatos", marca: "premier", promo: true },
  { id: 6, nome: "Ração Special Dog para Gatos Adultos Frango 10,1kg", descricao: "Special Dog para gatos adultos com sabor frango. Fórmula completa com taurina para a saúde ocular e cardíaca dos felinos. Palatabilidade excepcional aprovada pelos gatos mais exigentes.", preco: 79.90, precoAntigo: null, img: "img/gato.png", categoria: "gatos", marca: "specialdog", promo: false },
  { id: 7, nome: "Ração Quatree Supreme Adulto Frango e Batata Doce 15kg", descricao: "Linha Supreme da Quatree com a combinação irresistível de frango e batata doce. Sem corantes artificiais. Indicada para cães adultos de porte médio e grande.", preco: 125.90, precoAntigo: 149.90, img: "img/origens.jpg", categoria: "caes", marca: "quatree", promo: true },
  { id: 8, nome: "Ração Quatree Life Frango e Arroz Cães Raças Médias 15kg", descricao: "Quatree Life é uma ração balanceada com frango e arroz para cães adultos de raças médias e grandes. Fórmula especial sem adição de corantes, garantindo saúde de dentro pra fora.", preco: 204.66, precoAntigo: 227.40, img: "img/origens_gatos.jpg", categoria: "caes", marca: "quatree", promo: false },
  { id: 9, nome: "Ração Úmida Sachê Special Dog para Cães Adultos Sabor Carne 100g", descricao: "Sachê úmido Special Dog com sabor carne para cães adultos. Prático, saboroso e nutritivo. Ideal para complementar a alimentação seca ou oferecer como petisco especial.", preco: 4.90, precoAntigo: 6.50, img: "img/racao-cachorro.jpg", categoria: "caes", marca: "specialdog", promo: true },
  { id: 10, nome: "Ração Premier Golden para Cães Adultos Frango e Arroz 15kg", descricao: "Premier Golden é referência no mercado pet. Formulada com ingredientes de alta qualidade, frango e arroz, para cães adultos de todas as raças. Palatabilidade garantida.", preco: 189.90, precoAntigo: 210.00, img: "img/produto-ração-Cães/quatree_cachorro.jpg", categoria: "caes", marca: "premier", promo: false },
  { id: 11, nome: "Ração Magnus Para Gatos Adultos Sabor Frango 10kg", descricao: "Magnus para gatos adultos, sabor frango. Formulação equilibrada com vitaminas, minerais e taurina. Grânulos crocantes que ajudam a manter a saúde bucal dos felinos.", preco: 62.90, precoAntigo: 79.00, img: "img/quatree_gatos.jpg", categoria: "gatos", marca: "magnus", promo: true },
  { id: 12, nome: "Ração Quatree Gourmet Sem Corantes para Cães Adultos 20kg", descricao: "Linha Gourmet da Quatree, livre de corantes artificiais. Desenvolvida para cães adultos de raças médias e grandes. Formulação premium com ingredientes selecionados e alto valor biológico.", preco: 125.90, precoAntigo: 149.20, img: "img/produto-ração-Cães/quatree_cachorro.jpg", categoria: "caes", marca: "quatree", promo: true },
];

let produtosVisiveis = [...produtos];

function gerarWhatsapp(produto) {
  const preco = produto.preco.toFixed(2).replace('.', ',');
  const msg = `Olá! Tenho interesse em comprar:\n\n🛒 *${produto.nome}*\n💰 Valor: R$ ${preco}\n\nPoderia me ajudar com a compra?`;
  return `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function renderCards(lista) {
  const grid = document.getElementById('produtosGrid');
  const semRes = document.getElementById('semResultado');
  const contador = document.getElementById('contadorProdutos');

  Array.from(grid.children).forEach(c => {
    if (!c.classList.contains('sem-resultado')) c.remove();
  });

  contador.textContent = `${lista.length} produto${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    semRes.style.display = 'block';
    return;
  }
  semRes.style.display = 'none';

  lista.forEach(p => {
    const precoFmt = p.preco.toFixed(2).replace('.', ',');
    const precoAntigoHtml = p.precoAntigo ? `<span class="preco-de">R$ ${p.precoAntigo.toFixed(2).replace('.', ',')}</span>` : '';
    const badgeHtml = p.promo ? `<span class="card-badge">PROMOÇÃO</span>` : '';

    const card = document.createElement('div');
    card.className = 'prod-card';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <img class="prod-card-img" src="${p.img}" alt="${p.nome}" onerror="this.src='img/racao-cachorro.jpg'">
      <div class="prod-card-body">
        ${badgeHtml}
        <p class="prod-card-nome">${p.nome}</p>
        <div class="prod-card-precos">
          ${precoAntigoHtml}
          <span class="preco-por">R$ ${precoFmt}</span>
        </div>
        <button class="btn-comprar" onclick="event.stopPropagation(); window.open('${gerarWhatsapp(p)}','_blank')">COMPRAR</button>
      </div>
    `;
    card.addEventListener('click', () => abrirModal(p));
    grid.insertBefore(card, semRes);
  });
}

function abrirModal(p) {
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').onerror = function(){ this.src='img/racao-cachorro.jpg'; };
  document.getElementById('modalNome').textContent = p.nome;
  document.getElementById('modalDescricao').textContent = p.descricao;
  document.getElementById('modalPrecoPor').textContent = `R$ ${p.preco.toFixed(2).replace('.', ',')}`;
  const de = document.getElementById('modalPrecoDe');
  if (p.precoAntigo) {
    de.textContent = `De: R$ ${p.precoAntigo.toFixed(2).replace('.', ',')}`;
    de.style.display = 'block';
  } else {
    de.style.display = 'none';
  }
  document.getElementById('modalBtnComprar').href = gerarWhatsapp(p);
  document.getElementById('modalOverlay').classList.add('ativo');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('ativo');
}

function fecharModalFora(e) {
  if (e.target === document.getElementById('modalOverlay')) fecharModal();
}

function filtrarCards() {
  const categorias = [...document.querySelectorAll('input[value="caes"], input[value="gatos"], input[value="aves"], input[value="peixes"]')]
    .filter(c => c.checked).map(c => c.value);
  const marcas = [...document.querySelectorAll('input[value="quatree"], input[value="specialdog"], input[value="magnus"], input[value="premier"]')]
    .filter(c => c.checked).map(c => c.value);
  const soPromo = document.querySelector('input[value="promo"]').checked;
  const faixas = [...document.querySelectorAll('input[value="ate50"], input[value="50a100"], input[value="100a200"], input[value="acima200"]')]
    .filter(c => c.checked).map(c => c.value);
  const busca = document.getElementById('searchInput').value.toLowerCase().trim();

  produtosVisiveis = produtos.filter(p => {
    if (categorias.length && !categorias.includes(p.categoria)) return false;
    if (marcas.length && !marcas.includes(p.marca)) return false;
    if (soPromo && !p.promo) return false;
    if (faixas.length) {
      const ok = faixas.some(f => {
        if (f === 'ate50' && p.preco <= 50) return true;
        if (f === '50a100' && p.preco > 50 && p.preco <= 100) return true;
        if (f === '100a200' && p.preco > 100 && p.preco <= 200) return true;
        if (f === 'acima200' && p.preco > 200) return true;
        return false;
      });
      if (!ok) return false;
    }
    if (busca && !p.nome.toLowerCase().includes(busca) && !p.descricao.toLowerCase().includes(busca) && !p.categoria.toLowerCase().includes(busca) && !p.marca.toLowerCase().includes(busca)) return false;
    return true;
  });

  ordenarCards(true);
}

function filtrarPorBusca() { filtrarCards(); }

document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') filtrarCards();
});

function ordenarCards(skip = false) {
  if (!skip) produtosVisiveis = [...produtosVisiveis];
  const val = document.getElementById('ordenarSelect').value;
  if (val === 'menor') produtosVisiveis.sort((a, b) => a.preco - b.preco);
  else if (val === 'maior') produtosVisiveis.sort((a, b) => b.preco - a.preco);
  else if (val === 'nome') produtosVisiveis.sort((a, b) => a.nome.localeCompare(b.nome));
  renderCards(produtosVisiveis);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

// ✅ Lê parâmetros da URL — SEM duplicatas
const params = new URLSearchParams(window.location.search);

const categoriaURL = params.get('categoria');
if (categoriaURL) {
  const checkbox = document.querySelector(`input[value="${categoriaURL}"]`);
  if (checkbox) checkbox.checked = true;
}

const buscaURL = params.get('busca');
if (buscaURL) {
  document.getElementById('searchInput').value = buscaURL;
}

// Inicializa com filtros da URL já aplicados
filtrarCards();