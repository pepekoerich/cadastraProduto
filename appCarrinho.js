
class Carrinho {

            constructor(){
               this.itens = []
               this.imposto = 7
               this.frete = 10
               this.subTotal = 0
               this.total = 0
            }

            adicionarProduto(){
                let nome = document.querySelector("#inputNome")
                let preco = document.querySelector("#inputPreco")
                let qtd = document.querySelector("#inputQtd")
                let cadastroSucesso = document.querySelector("#cadastroSucesso")
                
                let produto = {
                    nome: nome.value,
                    preco: preco.value,
                    qtd: qtd.value,
                    codigo: this.gerarSKU()
                }

                let produtoRepetido = this.itens.find(item => item.nome === nome.value)

                if (produtoRepetido != undefined) {
                    cadastroSucesso.textContent = 'Produto Já Cadastrado'
                }else if (nome.value != '' && preco.value > 0 && qtd.value > 0) {
                    this.itens.push(produto)
                    cadastroSucesso.textContent = 'Produto Cadastrado'
                } else {
                    cadastroSucesso.textContent = 'Produto Não Cadastrado'
                }

                nome.value = ''
                preco.value = ''
                qtd.value = '' 
            }

            retornaCarrinho(){
                
                let listaProdutos = document.querySelector('#listaProdutos')
                listaProdutos.textContent = ''
                let nomeLista = document.createElement('ul')
                nomeLista.textContent = 'Lista de Produtos'
                listaProdutos.appendChild(nomeLista)
                
                this.itens.map(item =>{
                    
                    let mostraProdutos = document.createElement('div')
                    mostraProdutos.classList.add('centralizar')

                    let mostraNome = document.createElement('li')
                    let mostraPreco = document.createElement('li')
                    let mostraQtd = document.createElement('li')
                    let mostraCodigo = document.createElement('li')

                    mostraNome.textContent = item.nome
                    mostraPreco.textContent = item.preco + ' R$'
                    mostraQtd.textContent = item.qtd + ' unidades'
                    mostraCodigo.textContent = item.codigo

                    mostraProdutos.appendChild(mostraNome)
                    mostraProdutos.appendChild(mostraPreco)
                    mostraProdutos.appendChild(mostraQtd)
                    mostraProdutos.appendChild(mostraCodigo)

                    listaProdutos.appendChild(mostraProdutos)    
                })

            }

            removerProduto(){

                let deletaProduto = document.querySelector("#inputDel")
                let buscaCodigo = this.itens.find(item => item.codigo === deletaProduto.value.toUpperCase())
                let deletaIndex = this.itens.indexOf(buscaCodigo)
                document.querySelector('#produtoDeletado').textContent = ''
          
                if (buscaCodigo != undefined) {
                    this.itens.splice(deletaIndex, 1)
                    document.querySelector('#produtoDeletado').textContent = 'Produto deletado com sucesso'
                    deletaProduto.value = ''
                }else {
                    document.querySelector("#produtoDeletado").textContent = 'Produto não deletado'
                    deletaProduto.value = ''
                }
                this.retornaCarrinho()
            }

            gerarSKU() {
                let nomeProduto = document.querySelector('#inputNome')
                let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let codigoSKU = "";
                let prefixoSKU = nomeProduto.value.substring(0, 3).toUpperCase();
                codigoSKU += prefixoSKU;
                for (let i = 0; i < 4; i++) {
                  codigoSKU += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                }
                return codigoSKU;
              }

}

let meuCarrinho = new Carrinho()