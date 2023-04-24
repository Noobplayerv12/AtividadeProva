const botao = document.querySelector('.botao');
const nome = document.querySelector('#exampleInput');
const uls = document.querySelector('ul')
const divFrequencia = document.querySelector('.frequencia');
const bNomeDigitado = document.querySelector('.nomeDigitado');
const alerta = document.querySelector('.alert');
let arrayCarrregarMais = []
const url = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/'
const carregarMais =document.querySelector('.carregarMais')

botao.addEventListener('click', async () => {
    if(nome.value !== ""){
        let urlNome = url + nome.value
        nome.value = ""
        await fetch(`${urlNome}`).then((res) => {
            return res.json()
        }).then((data) => {
            if(data.length > 0){
                carregarMais.classList.remove('d-none')
                if(data[0].res.length < 5){
                    carregarMais.classList.add('d-none')
                }
                if(divFrequencia.classList.contains('d-none')){
                    divFrequencia.classList.remove('d-none')
                }
                if(!alerta.classList.contains('d-none')){
                    alerta.classList.add('d-none')
                }
                bNomeDigitado.innerText = data[0].nome
                console.log(data[0].res)
                uls.innerHTML = ""
                arrayCarrregarMais = []
                for (let index = 0; index < data[0].res.length; index++) {
                    data[0].res[index].periodo = data[0].res[index].periodo.replaceAll("[", '')
                    data[0].res[index].periodo = data[0].res[index].periodo.replaceAll("]", '')
                    if(data[0].res[index].periodo.includes(',')){
                        data[0].res[index].periodo = data[0].res[index].periodo.replace(',' , " a ")
                        data[0].res[index].periodo = "de "+ data[0].res[index].periodo
                    }
                    if(index < 5){
                        let li = document.createElement('li')
                        li.classList.add('list-group-item')
                        li.classList.add('mt-2')
                        li.style.borderRadius = '10px'
                        li.style.borderColor = 'gray'
                        li.style.fontWeight = 'bold'
                        li.innerText = `${data[0].res[index].periodo}: ${data[0].res[index].frequencia} registros`
                        uls.appendChild(li)
                    } else {
                        arrayCarrregarMais.push(data[0].res[index])
                    }
                }

            } else {
                if(alerta.classList.contains('d-none')){
                    alerta.classList.remove('d-none')
                }
                if(!divFrequencia.classList.contains('d-none')){
                    divFrequencia.classList.add('d-none')
                }
            }
        })
        
    }
})

carregarMais.addEventListener('click', () => {
    carregarMais.classList.add('d-none')
    arrayCarrregarMais.forEach(item => {
        let li = document.createElement('li')
        li.classList.add('list-group-item')
        li.classList.add('mt-2')
        li.style.borderRadius = '10px'
        li.style.borderColor = 'gray'
        li.style.fontWeight = 'bold'
        li.innerText = `${item.periodo} : ${item.frequencia} registros`
        uls.appendChild(li)
    })
})