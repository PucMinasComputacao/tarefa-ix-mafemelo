const data = {
    produtos: [
        { id: 1, nome: "Celular Pro Max", preco: 5000, categoria: "Celulares", imagem: "https://picsum.photos/200", descricao: "Tela de 6.7 polegadas e 3 câmeras.", emEstoque: true },
        { id: 2, nome: "Notebook Ultra", preco: 4200, categoria: "Notebooks", imagem: "https://picsum.photos/201", descricao: "Processador i7 com 16GB RAM.", emEstoque: true },
        { id: 3, nome: "Fone Bluetooth", preco: 250, categoria: "Acessórios", imagem: "https://picsum.photos/202", descricao: "Cancelamento de ruído ativo.", emEstoque: true },
        { id: 4, nome: "Mouse Gamer", preco: 180, categoria: "Acessórios", imagem: "https://picsum.photos/203", descricao: "12000 DPI e luzes RGB.", emEstoque: false },
        { id: 5, nome: "Monitor 4K", preco: 2100, categoria: "Acessórios", imagem: "https://picsum.photos/204", descricao: "Resolução máxima para trabalho.", emEstoque: true },
        { id: 6, nome: "Teclado Mecânico", preco: 400, categoria: "Acessórios", imagem: "https://picsum.photos/205", descricao: "Switch Blue de alta durabilidade.", emEstoque: true },
        { id: 7, nome: "Console GameX", preco: 3500, categoria: "Games", imagem: "https://picsum.photos/206", descricao: "Suporte para jogos em 120 FPS.", emEstoque: true },
        { id: 8, nome: "Jogo de Aventura", preco: 200, categoria: "Games", imagem: "https://picsum.photos/207", descricao: "Mundo aberto e 50h de gameplay.", emEstoque: false }
    ]
};

const listaProdutos = document.getElementById("product-list");
const areaDetalhes = document.getElementById("product-details");
const campoBusca = document.querySelector("#search");
const selectCategoria = document.querySelector("#category");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.border = "1px solid #000";
    card.style.borderRadius = "8px";

    card.innerHTML = `
        <img src="${produto.imagem}">
        <h3>${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <p><small>${produto.categoria}</small></p>
        <button class="btn-ver">Ver detalhes</button>
        <button class="btn-destacar">Destacar</button>
    `;

    card.querySelector(".btn-ver").addEventListener("click", function() {
        showProductDetails(produto);
    });

    card.querySelector(".btn-destacar").addEventListener("click", function() {
        card.classList.toggle("destaque");
    });

    return card;
}

function renderProducts(lista) {
    listaProdutos.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        const novoCard = createProductCard(lista[i]);
        listaProdutos.appendChild(novoCard);
    }

    const todosCards = document.querySelectorAll(".card");
    todosCards.forEach(function(card) {
        console.log("ID do card:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = ["Todas", "Celulares", "Notebooks", "Acessórios", "Games"];
    selectCategoria.innerHTML = "";
    
    categorias.forEach(function(cat) {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        selectCategoria.appendChild(opt);
    });
}

function showProductDetails(produto) {
    const estoque = produto.emEstoque ? "Sim" : "Não";
    
    areaDetalhes.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${estoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const texto = campoBusca.value.toLowerCase();
    const cat = selectCategoria.value;

    const filtrados = data.produtos.filter(function(p) {
        const matchNome = p.nome.toLowerCase().includes(texto);
        const matchCat = (cat === "Todas" || p.categoria === cat);
        return matchNome && matchCat;
    });

    renderProducts(filtrados);
}

document.getElementById("btnRender").addEventListener("click", function() {
    renderProducts(data.produtos);
});

campoBusca.addEventListener("input", filterProducts);
selectCategoria.addEventListener("change", filterProducts);

renderCategories();
renderProducts(data.produtos);