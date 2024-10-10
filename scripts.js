// Seleção dos elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleção dos elementos da lista
const expenseList = document.querySelector("ul")

// "oninpout" é uma palavra reservada do javascript para captura de eventos do tipo "input"
//Iremos capturar o evento de input para formatar o valor
amount.oninput = () => {
    let value = amount.value.replace(/\D/g,"")
    
    //Adiciona casas decimais ao valor digitado
    value = Number(value)/100
    
    amount.value = formatCurrencyBRL(value)
    //Primeiro criamos a variável "amount" a partir do id fo HTML
    //Depois definimos que a variável value deriva do input da amount (amount.oninput)
    //Criamos o reggex para substituir os caracteres do campo por "nada"
    //Definimos que o amount.value será terá as caracteristicas do value
    //Em resumo: recebemos valor do input, tiramos a letras, e devolvemos apenas numeros. 
}

//Função para formatar em o numero em real R$
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency:"BRL",
    })

    //Retorna o valor formatado
    return value
}

//Observar o evento "Submit" do formulario
form.onsubmit = (event) => {
    //Previnir o comportamento padrão do navegador de recarregar a página.
    event.preventDefault()

    //Mecanismo para criar um objeto com os detalhes da despesa registrada
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //Chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        
        //Cria o li
        const expenseItem = document.createElement("li") //Cria o elemento de li para adicionar o item (li) na lista (ul)
        expenseItem.classList.add("expense") //Cria a classe "expense" do elemento li
        
        //Cria o ícone da categoria
        const expenseIcon = document.createElement("img") //Cria o elemento "img" que fica dentro do li
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`) //Define o atributo "scr" do "img". Primeiro valor é o tipo do atributo, depois o valor fica dentro do ``
        expenseIcon.setAttribute("alt", newExpense.category_name) //Define o atributo "alt" do "img"

        //Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //Cria os valores das despesas
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$","")}`


        //Cria o incone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("scr", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")


        //Adiciona informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //Adiciona o item na lista
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista")
    }
}
