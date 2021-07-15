$(function () {
    $('#addform').load('addform.html');
    $('.arrow').click(function () {
        $('.custom-select').toggleClass('open');
    });
    $('.arrow').click(function () {
        $('.custom-select-position').toggleClass("open");
    });
});
var modal = document.getElementById("myModal");
var btn = document.getElementById("buttonadd");
var span = document.getElementsByClassName("close")[0];
$(function () {
    $(".fa.fa.fa-times").click(function () {
        if ($("#finder-findtext").val != '') {
            $("#finder-findtext").val("");
        }
    });
    $("#cancelform").click(function () {
        modal.style.display = 'none';
    });
});
btn.onclick = function () {
    getNewEmployeeCode();
    clearForm();
    idnow = null;
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function formatdepartmentposition() {
    $('.custom-options').on('click', 'span', function () {
        if (!$('this').hasClass('selected')) {
            $('.custom-option.selected i').removeClass('fa fa-check');
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            $('.custom-option.selected i').addClass('fa fa-check');
            this.closest('.custom-select').querySelector('input[name="department"]').value = this.textContent;
            $('.custom-select').removeClass('open');
        }
    })
    $('.custom-options-position').on('click', 'span', function () {
        if (!$('this').hasClass('selected')) {
            $('.custom-option-position.selected i').removeClass('fa fa-check');
            this.parentNode.querySelector('.custom-option-position.selected').classList.remove('selected');
            this.classList.add('selected');
            $('.custom-option-position.selected i').addClass('fa fa-check');
            this.closest('.custom-select-position').querySelector('input[name="position"]').value = this.textContent;
            $('.custom-select-position').removeClass('open');
        }
    })
    window.addEventListener('click', function (e) {
        const select = document.querySelector('.custom-select');
        const selectposition = document.querySelector('.custom-select-position');
        if (!selectposition.contains(e.target)) {
            selectposition.classList.remove('open');
        }
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
}
function searchDepartments(selectclass, searchclass, name) {
    $(selectclass).addClass('open');
    $(searchclass).each(function (index, option) {
        if ($('input[name="' + name + '"]').val() == "") {
            $(option).css('display', 'block');
        }
        else if ($(option).text().toUpperCase().includes($('input[name="' + name + '"]').val().toUpperCase())) {
            $(option).css('display', 'block');
        }
        else
            $(option).css('display', 'none');
    })
}
function arrowKeySelection(e) {
    if ($('.custom-select').hasClass('open')) {
        e = e || window.event;
        let selected = $('.custom-option.selected');
        let iconselected = $('.custom-option.selected i');
        if (e.keyCode == '38') {
            if (selected.prev().is('span') && selected.prev().css('display') == 'block') {
                selected.prev().addClass('selected');
                selected.removeClass('selected');
                iconselected.removeClass('fa fa-check');
                $('.custom-option.selected i').addClass('fa fa-check');
                $('input[name="department"]').val($('.custom-option.selected').text());
            }
            else if ($('.custom-option').last().css('display') == 'block') {
                selected.removeClass('selected');
                $('.custom-option').last().addClass('selected');
                $('.custom-option.selected i').addClass('fa fa-check');
                $('input[name="department"]').val($('.custom-option.selected').text());
            }
        }
        else if (e.keyCode == '40') {
            if (selected.next().is('span') && selected.next().css('display') == 'block') {
                selected.next().addClass('selected');
                selected.removeClass('selected');
                iconselected.removeClass('fa fa-check');
                $('.custom-option.selected i').addClass('fa fa-check');
                $('input[name="department"]').val($('.custom-option.selected').text());
            }
            else if ($('.custom-option').first().css('display') == 'block') {
                selected.removeClass('selected');
                $('.custom-option').first().addClass('selected');
                $('.custom-option.selected i').addClass('fa fa-check');
                $('input[name="department"]').val($('.custom-option.selected').text());
            }
        }
        else if (e.keyCode == '13') {
            if ($('.custom-select').hasClass('open')) {
                $('.custom-select').removeClass('open');
                $('input[name="department"]').val($('.custom-option.selected').text());
            }
            else $('.custom-select').addClass('open');
        }
    }
    else return;
}
function arrowKeySelectionPosition(e) {
    e = e || window.event;
    if (e.keyCode == '13' && $('input[name="position"]').hasClass('focus')) {
        $('.custom-select-position').addClass('open');
    }
    if ($('.custom-select-position').hasClass('open')) {
        let selected = $('.custom-option-position.selected');
        let iconselected = $('.custom-option-position.selected i');
        if (e.keyCode == '38') {
            if (selected.prev().is('span') && selected.prev().css('display') == 'block') {
                selected.prev().addClass('selected');
                selected.removeClass('selected');
                iconselected.removeClass('fa fa-check');
                $('.custom-option-position.selected i').addClass('fa fa-check');
                $('input[name="position"]').val($('.custom-option-position.selected').text());
            }
            else if ($('.custom-option-position').last().css('display') == 'block') {
                selected.removeClass('selected');
                $('.custom-option-position').last().addClass('selected');
                $('.custom-option-position.selected i').addClass('fa fa-check');
                $('input[name="position"]').val($('.custom-option-position.selected').text());
            }
        }
        else if (e.keyCode == '40') {
            if (selected.next().is('span') && selected.next().css('display') == 'block') {
                selected.next().addClass('selected');
                selected.removeClass('selected');
                iconselected.removeClass('fa fa-check');
                $('.custom-option-position.selected i').addClass('fa fa-check');
                $('input[name="position"]').val($('.custom-option-position.selected').text());
            }
            else if ($('.custom-option-position').first().css('display') == 'block') {
                selected.removeClass('selected');
                $('.custom-option-position').first().addClass('selected');
                $('.custom-option-position.selected i').addClass('fa fa-check');
                $('input[name="position"]').val($('.custom-option-position.selected').text());
            }
        }
        else if (e.keyCode == '13') {
            if ($('.custom-select-position').hasClass('open')) {
                $('.custom-select-position').removeClass('open');
                $('input[name="position"]').val($('.custom-option-position.selected').text());
            }
            else $('.custom-select-position').addClass('open');
        }
    }
    else return;
}

