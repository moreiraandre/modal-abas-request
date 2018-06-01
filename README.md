# modal-abas-request
### Gestão de abas no modal e requisições web.

Diante da dificuldade de abrir listagens, formulários ou telas em geral sem perder a tela atual do navegador e 
trabalhando com o mesmo modal, iniciei então esse projeto que visa abrir qualquer tela dentro do modal utilizando o
conceito de abas, onde cada tela que necessite ser aberta no modal adicione uma nova aba, preservando assim as abas
anteriores até que todo o ciclo de chamadas a telas seja concluído.

*Exemplo*

Estou com a listagem de pessoas na página do navegador e quero cadastrar um novo contato sem sair dessa tela, apenas
clicando em um botão da listagem para referenciar a pessoa, então eu abro a tela de listagem de contatos em um modal, no 
modal aparece a listagem dos contatos e o botão para inserir novo, assim como em uma tela padrão sem o uso do modal, 
quando eu clicar no botão para abrir o formulário de cadastro quero abrir em um modal, mas sem perder a listagem que já 
está aberta nesse mesmo modal, nesse ponto então eu abro o formulário em uma nova aba dentro do mesmo modal, caso eu
precise abrir uma nova tela como listagem ou cadastro de operadores telefônicas por exemplo, farei abrindo uma nova aba
preservando as telas anteriores de listagem e cadastro de contatos até que a ação inicial de cadastrar um novo contato
seja concluída. A parte que eu mais gosto é que as requisições web dentro das abas abertas no modal serão 
automaticamente alteradas para AJAX, dessa forma você cria seu código apenas uma vez como se fosse usar sem modal, e
depois dele estar no modal todas as outras chamadas são feitas automaticamente acresentando uma nova aba no modal, sem 
necessidade de escrever qualquer outro código javascript para executar as requisições AJAX :heart:.

*Espero não ter complicado muito :sweat_smile: Estou a disposição para dúvidas.*

### Instalando

[![Latest version](https://www.npmjs.com/package/modal-abas-request)][npm-package]

**npm i modal-abas-request**

Baixe a biblioteca e faça a chamada do arquivo:
```html
<script type="text/javascript" src="modal-abas-request.js"></script>
```

### Iniciando
Após incluir o arquivo **modal-abas-request.js** o bjeto ModalAR estara disponível para uso.

#### Exibindo o modal
Basta adicionar a classe **btn-modalar** ao seu link que o conteúdo será carregda na primeira aba do modal, e o título 
da aba será o texto do link. Após a abertura do modal todos os demais links serão abertos em uma nova aba, com excessão
dos que apontam para **#** e dos que abrem uma nova página:
```html
<a href="#">Ação</a> 
<a href="http://google.com" target="_blank">Google</a> 
```

#### Métodos

Comando | Ação
--------|-----
setTitleModal | Altera o título do modal
addItem(title, content) | Adiciona nova aba recebendo o titulo da aba e o conteúdo
lenght | Total de abas
remove | Remove a última aba
show | Exibe o modal
clear | Exclui todas as abas
