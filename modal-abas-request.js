var ModalAR = {
    // PROPRIEDADES PRIVADAS
    _titleModal: 'Visualização',
    _element: $('#modalar'),
    _items: [],

    // PROPRIEDADES PÚBLICAS
    showCloseButton: true,

    showFooter: false,

    // MÉTODOS
    setTitleModal: function (titleModal) {
        this._titleModal = titleModal;
        this._element.find('#modalar-modal-title').html(this._titleModal)
    },

    lenght: function () {
        return this._items.length;
    },

    _addHTML: function (title, content) {
        // SELECIONANDO HTML BASE
        var tabHide = this._element.find('#modalar-tabs > li.hide');
        var contentHide = this._element.find('#modalar-content > .tab-pane.hide');

        // VARIÁVEIS QUE RECEBRÃO OS NÓVOS ELEMENTOS
        var tabNew,
            contentNew;

        // CLONANDO O HTML DE DEMONSTRAÇÃO
        tabNew = tabHide.clone();
        contentNew = contentHide.clone();

        //  CASO HAJA MAIS DE UMA ABA O BOTÃO DE FECHAR DA ABA ANTERIOR É ESCONDIDO E O DA NOVA É EXIBIDO
        if (this.lenght() > 1) {
            tabNew.find('a > .modalar-tab-close').removeClass('hide');
            this._element.find('#modalar-tabs > li.active > a > .modalar-tab-close').addClass('hide');
        }

        // DEIXANDO O NOVO HTML VISÍVEL
        tabNew.removeClass('hide');
        contentNew.removeClass('hide');
        tabNew.addClass('active');
        contentNew.addClass('active');

        // ATRIBUINDO OS NOVOS CONTEÚDOS
        tabNew.find('a > .modalar-tab-title').text(title);
        contentNew.html(content);

        // ESCONDENDO ANTIGO CONTEÚDO
        this._element.find('#modalar-tabs > li.active').removeClass('active').addClass('disabled');
        this._element.find('#modalar-content > .tab-pane.active').removeClass('active');

        // ADICIONANDO OS NOVOS ELEMENTOS AO DOM
        this._element.find('#modalar-tabs').append(tabNew);
        this._element.find('#modalar-content').append(contentNew);
    },

    addItem: function (title, content) {
        this._items.push({
            title: title,
            content: content
        });

        this._addHTML(title, content);
    },

    remove: function () {
        if (this.lenght() > 0) {
            this._items.pop();

            var tabActive = this._element.find('#modalar-tabs > li.active');
            var contentActive = this._element.find('#modalar-content > .tab-pane.active');

            tabActive.prev().addClass('active').removeClass('disabled');
            contentActive.prev().addClass('active').removeClass('disabled');

            // SE RESTAR MAIS DE 1 ITEM ATIVO O BOTÃO DE FECHAR A ABA DO ÚLTIMO ITEM SERÁ EXIBIDO
            if (this.lenght() > 1)
                tabActive.prev().find('.modalar-tab-close').removeClass('hide');

            tabActive.detach();
            contentActive.detach();
        }
    },

    show: function () {
        // EXIBINDO BOTÃO CLOSE
        if (this.showCloseButton)
            this._element.find('#modalar-close').removeClass('hide');
        else
            this._element.find('#modalar-close').addClass('hide');

        // EXIBINDO FOOTER
        if (this.showFooter)
            this._element.find('#modalar-footer').removeClass('hide');
        else
            this._element.find('#modalar-footer').addClass('hide');

        // this.clear();

        // EXIBINDO MODAL
        this.onShowing();

        // SE O MODAL ESTÁ FECHADO ELE LIMPA O CONTEÚDO ANTES DE EXIBIR
        /*if (!this.isShowed())
            this.clear();*/
        this._element.modal('show');
    },
    isShowed: function () {
        return this._element.css('display') === 'block';
    },
    clear: function () {
        this._element.find('#modalar-tabs > li:not(.hide)').detach();
        this._element.find('#modalar-content > .tab-pane:not(.hide)').detach();

        this._items = [];
    },

    // EVENTOS
    onShowing: function () {
    },
    onShowed: function () {
    }
};

$('body').on('click', '.btn-modalar', function (e) {
    e.preventDefault();
    var btn = $(this);

    ModalAR.clear();

    /*
     * CARREGANDO ELEMENTO
     * ===================
     * SE A PROPRIEDADE href FOR MAIOR QUE 1 E O PRIMEIRO CARACTER FOR # ENTÃO ESTÁ FAZENDO REFERÊNCIA A UM ELEMENTO
     */
    if (($(this).attr('href').length > 1)
        && ($(this).attr('href')[0] === '#')) {
        ModalAR.addItem($(this).text().trim(),
            $($(this).attr('href')).html().trim());
        ModalAR.show();
    } else {
        alert("Não é elemento!");
    }

});

/*
   NÃO MODIFICA A REQUISIÇÃO CASO O LINK APONTE # OU ABRA EM OUTRA PÁGINA
 */
$('#modalar').on('click', 'a:not([href="#"], [target="_blank"])', function (e) {
    e.preventDefault();
    var btn = $(this);

    $('#modalar-msg-load').show();

    // CARREGANDO REQUISIÇÃO
    $.ajax({
        url: btn.prop('href'),
        type: 'get',
        success: function (ret) {
            $('#modalar-msg-load').hide();
            ModalAR.addItem(btn.text(), ret);
        },
        done: function () {
            alert("terminou");
        }
    });
});

$('#modalar').on('click', '.modalar-tab-close', function (e) {
    ModalAR.remove();
});