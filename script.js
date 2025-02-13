let listaDeCompras = []

function adicionarItem() {
    let inputItem = document.getElementById("item")
    let inputQtd = document.getElementById("quantidade")

    if(inputItem.value.trim() === "") {
        return
    }
    
    let item = {
        id: Date.now(),
        nome: inputItem.value,
        quantidade: inputQtd.value || 1,
        comprado: false
    }

    inputItem.value = ""
    inputQtd.value = ""
    listaDeCompras.push(item)
    atualizarInterface()
    inputItem.focus()

    salvarDados()

}

function limparLista(){
    listaDeCompras = []
    atualizarInterface()
    salvarDados()
    
}

function atualizarInterface(){
    let lista = document.querySelector(".lista")
    lista.innerHTML = ""
     
    for(let i = 0; i < listaDeCompras.length; i++){
        let item = document.createElement("li")
        item.innerHTML = `
                <input ${listaDeCompras[i].comprado ? "checked" : ""} type="checkbox" name="" id="" onchange="toggleItem(${listaDeCompras[i].id})" >
                <p>${listaDeCompras[i].nome} x ${listaDeCompras[i].quantidade}</p>
                <button onclick="excluirItem(${listaDeCompras[i].id})">X</button>
        `
        lista.append(item)
    }
}

function excluirItem(id){
    listaDeCompras = listaDeCompras.filter((item) => item.id != id)
    atualizarInterface()
    salvarDados()
}

function limparComprados(){
    listaDeCompras = listaDeCompras.filter((item) => item.comprado != true)
    atualizarInterface()
    salvarDados()
}

function toggleItem(id){
    const item = listaDeCompras.find((item) => item.id == id)
    item.comprado = !item.comprado
    salvarDados()

}

document.getElementById("item").addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        adicionarItem()
    }
})

document.getElementById("quantidade").addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        adicionarItem()
    }
})

function carregarDados(){
    const dados = localStorage.getItem("lista_de_compras")

    if(dados){
        listaDeCompras = JSON.parse(dados)
        atualizarInterface()
    }
}

function salvarDados(){
    localStorage.setItem("lista_de_compras", JSON.stringify(listaDeCompras))
}

carregarDados()