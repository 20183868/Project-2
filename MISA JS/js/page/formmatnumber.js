function salary() {
    let x = document.getElementById('salary-employee');
    const numberFormat = new Intl.NumberFormat('vi-VN'
    );
    x.value = numberFormat.format(x.value.replaceAll(".", ""));
    if (x.value == '0') {
        x.value = '';
    }
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function clearForm(){
    $(function(){
        $('#employee-date-of-birth').val("");
        $('#identity-number').val("");
        $('#identity-place').val("");
        $('#employee-email').val("");
        $('#personal-tax-code').val("");
        $('#fullname-employee').val("");
        $('#gender-name-employee').val("");
        $('#identity-date-employee').val("");
        $('#phonenumber-employee').val("");
        $('#department-employee').val("");
        $('#salary-employee').val("");
        $('#workstatus-employee').val("");
    });
}