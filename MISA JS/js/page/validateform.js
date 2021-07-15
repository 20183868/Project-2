$(document).ready(function () {
    $('#fullname-employee').focusout(function () {
        check_fname();
    });
    $('#phonenumber-employee').focusout(function () {
        check_phonenumber();
    });
    $('#employee-email').focusout(function () {
        check_employee_email();
    });
    $('#salary-employee').focusout(function () {
        check_salary_employee();
    });
    $('#identity-number').focusout(function () {
        check_identity_number();
    });
});
var error_fullname = false;
var error_email = false;
var error_salary = false;
var error_phonenumber = false;
var error_identitynumber = false;
function check_fname() {
    let fname = $('#fullname-employee').val();
    if (fname != '') {
        $('#fullname-employee').css("border", "1px solid #019160");
    }
    else {
        $('#fullname-employee').css("border", "1px solid #F90A0A");
        $('#fullname-employee').prop('title', 'Tên không được để trống!');
        error_fullname = true;
    }
};
function check_phonenumber() {
    let phonenumber = $('#phonenumber-employee').val();
    if (phonenumber.length == 10) {
        $('#phonenumber-employee').css("border", "1px solid #019160");
    }
    else {
        $("#phonenumber-employee").css("border", "1px solid #F90A0A");
        $('#phonenumber-employee').prop("title", 'Số điện thoại không hợp lệ');
        error_phonenumber = true;
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function check_employee_email() {
    let email = $('#employee-email').val();
    if (validateEmail(email)) {
        $('#employee-email').css("border", "1px solid #019160")
    }
    else {
        $('#employee-email').css("border", "1px solid #F90A0A");
        $('#employee-email').prop('title', 'Email không hợp lệ!');
        error_email = true;
    }
}
function check_salary_employee() {

}
function check_identity_number() {
    let indentity_number = $('#identity-number').val();
    if (indentity_number.length == 9 || indentity_number.length == 13) {
        $("#identity-number").css('border', '1px solid #019160');
    }
    else {
        $("#identity-number").css('border', '1px solid #F90A0A');
        $('#identity-number').prop('title', 'Số giấy tờ tùy thân phải có 9 số hoặc 13 số');
        error_identitynumber = true;
    }
}
function validate_form() {
    error_identitynumber = false;
    error_email = false;
    error_fullname = false;
    error_phonenumber = false;
    check_employee_email();
    check_fname();
    check_identity_number();
    check_phonenumber();
    if (error_identitynumber == false && error_email == false && error_fullname == false && error_phonenumber == false) {
        alert("Submit successful!");
        return true;
    }
    else {
        alert("Submit form failed! Please try again!");
        return false;
    }
}