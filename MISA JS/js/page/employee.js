class Employee {
    constructor(employeeCode, fullName, genderName, dateOfBirth, email, position, department, salary, workStatus) {
        this.employeeCode = employeeCode;
        this.fullName = fullName;
        this.genderName = genderName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.position = position;
        this.department = department;
        this.salary = salary;
        this.workStatus = workStatus;
    }
}
$(document).ready(function () {
    loadData();
    getDepartment();
    getPosition();
    formatdepartmentposition();
    $('input[name="department"]').bind('input change', function () {
        searchDepartments('.custom-select', '.custom-option', "department");
    });
    $('input[name="position"]').on('input', function () {
        searchDepartments('.custom-select-position', '.custom-option-position', "position");
    });
    $('.custom-select-wrapper').keydown(arrowKeySelection);
    $('.custom-select-wrapper-position').keydown(arrowKeySelectionPosition);
    $('#delete-employee').on('click', function () {
        if (confirm("Are you sure you want to delete this employee?")) {
            deleteDataById(idnow);
        } else {
            return;
        }
    });
    $('#save-employee').on('click', function () {
        if (validate_form()) {
            if (idnow === null) {
                addNewEmployee();
            }
            else updateDataById(idnow);
        } else {
            return;
            // clearForm();
        }
    });
    getIdDepartment();
    getIdPosition();
    paginationTable();
});
function loadData() {
    $.ajax({
        method: "GET",
        url: "http://cukcuk.manhnv.net/v1/Employees",
    }).done(function (response) {
        let data = response;
        $.each(data, function (index, item) {
            let customerCode = item.EmployeeCode;
            let phoneNumber = item.PhoneNumber;
            let fullName = item.FullName;
            let genderName = item.GenderName;
            let dateOfBirth = item.DateOfBirth;
            let email = item.Email;
            let dateOrigin = new Date(dateOfBirth).toLocaleDateString('en-GB');
            const numberFormat = new Intl.NumberFormat('vi-VN'
            );
            let salary = numberFormat.format(item.Salary);
            let trHtml = `<tr employeeid=${item.EmployeeId}>
            <td scope="row">${customerCode}</td>
            <td>${fullName}</td>
            <td>${genderName}</td>
            <td class="text-align-center">${dateOrigin}</td>
            <td>${phoneNumber}</td>
            <td>${email}</td>
            <td>${item.PositionName}</td>
            <td>${item.DepartmentName}</td>
            <td class="text-align-right">${salary}</td>
            <td>${item.WorkStatus}</td>
            </tr>`;
            $('tbody').append(trHtml);
        })
    }).fail(function (response) {
        alert("Failed");
    });
}
var idnow = null;
$('tbody').on("click", "tr", function () {
    idnow = $(this).attr("employeeid");
    loadDataById(idnow);
    modal.style.display = "block";
});

function addNewEmployee() {
    let salary = parseInt($('#salary-employee').val().replaceAll(".", ""));
    let gender = parseInt($('#gender-name-employee').children(':selected').attr('value'));
    $.ajax({
        type: "POST",
        url: "http://cukcuk.manhnv.net/v1/Employees",
        data: JSON.stringify({
            EmployeeCode: $('#employee-code-input').val(),
            FullName: $('#fullname-employee').val(),
            Gender: gender,
            DateOfBirth: $('#employee-date-of-birth').val(),
            PhoneNumber: $('#phonenumber-employee').val(),
            Email: $('#employee-email').val(),
            IdentityNumber: $('#identity-number').val(),
            IdentityDate: $('#identity-date-employee').val(),
            IdentityPlace: $('#identity-place').val(),
            JoinDate: $('#join-date-employee').val(),
            MartialStatus: 0,
            WorkStatus: 0,
            PersonalTaxCode: $('#personal-tax-code').val(),
            Salary: salary,
            PositionCode: null,
            PositionId: getIdFromPosition($('#position-employee').val()),
            DepartmentCode: null,
            DepartmentId: getIdFromDepartment($('#department-employee').val()),
            QualificationName: null,
            GenderName: $('#gender-name-employee').val(),
            EducationalBackgroundName: null,
            MartialStatusName: null,
            CreatedDate: "2021-07-07T13:56:17",
            CreatedBy: null,
            ModifiedDate: "2021-07-07T15:57:17",
            ModifiedBy: null
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            alert("Add new Employee Success!");
            modal.style.display = "none";
            $('tbody').empty();
            loadData();
        },
        fail: function (response) {
            alert("Failed to add employee");
        }
    })
}
function getNewEmployeeCode() {
    $.get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode").done(function (res) {
        $('#employee-code-input').val(res);
    }).fail(function (response) {
        alert("Failed to get new employee");
    });
}
function loadDataById(id) {
    let data;
    let numberFormat = new Intl.NumberFormat('vi-VN'
    );
    $.get("http://cukcuk.manhnv.net/v1/Employees/" + id).done(function (res) {
        data = res;
        let e = new Employee(data.EmployeeCode, data.FullName, data.GenderName, new Date(data.DateOfBirth).toLocaleDateString('en-GB'), data.Email, data.PositionName, data.DepartmentName, numberFormat.format(data.Salary), data.workStatus);
        $(function () {
            console.log(e);
            $('#employee-code-input').val(e.employeeCode);
            $('#employee-date-of-birth').val(dayjs(data.DateOfBirth).format("YYYY-MM-DD"));
            $('#identity-number').val(data.IdentityNumber);
            $('#identity-place').val(data.IdentityPlace);
            $('#employee-email').val(e.email);
            $('#personal-tax-code').val(data.PersonalTaxCode);
            $('#fullname-employee').val(e.fullName);
            $('#gender-name-employee option').filter(function () {
                return $(this).text() == e.genderName;
            }).prop('selected', true);
            $('#identity-date-employee').val(dayjs(data.IdentityDate).format("YYYY-MM-DD"));
            $('#phonenumber-employee').val(data.PhoneNumber);
            $('#salary-employee').val(e.salary);
            $('#department-employee option').filter(function () {
                return $(this).text() == e.department;
            }).prop('selected', true);
            $('#position-employee option').filter(function () {
                return $(this).text() == e.position;
            }).prop('selected', true);
            $('#workstatus-employee').val(e.workStatus);
            $('#join-date-employee').val(dayjs(data.JoinDate).format("YYYY-MM-DD"));
        });
    }).fail(function (res) {
        alert("Failed");
    });
}
function updateDataById(id) {
    let gender = parseInt($('#gender-name-employee').children(':selected').attr('value'));
    let salary = parseInt($('#salary-employee').val().replaceAll(".", ""));
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
        type: "PUT",
        data: JSON.stringify({
            EmployeeId: id,
            EmployeeCode: $('#employee-code-input').val(),
            FullName: $('#fullname-employee').val(),
            Gender: gender,
            DateOfBirth: $('#employee-date-of-birth').val(),
            PhoneNumber: $('#phonenumber-employee').val(),
            Email: $('#employee-email').val(),
            IdentityNumber: $('#identity-number').val(),
            IdentityDate: $('#identity-date-employee').val(),
            IdentityPlace: $('#identity-place').val(),
            JoinDate: $('#join-date-employee').val(),
            MartialStatus: 0,
            WorkStatus: 0,
            PersonalTaxCode: $('#personal-tax-code').val(),
            Salary: salary,
            PositionCode: null,
            PositionId: getIdFromPosition($('#position-employee').val()),
            DepartmentCode: null,
            DepartmentId: getIdFromDepartment($('#department-employee').val()),
            QualificationName: null,
            GenderName: $('#gender-name-employee').val(),
            EducationalBackgroundName: null,
            MartialStatusName: null,
            CreatedDate: "2021-07-07T13:56:17",
            CreatedBy: null,
            ModifiedDate: "2021-07-07T15:57:17",
            ModifiedBy: null
        }),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            alert("Edit Success");
            modal.style.display = "none";
            $('tbody').empty();
            loadData();
        },
        fail: function (response) {
            alert("Edit Failure");
        }
    })
}
function deleteDataById(id) {
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
        type: "DELETE",
        success: function (response) {
            alert("Delete Success");
            $('tbody').empty();
            loadData();
            modal.style.display = "none";
        },
        fail: function (response) {
            alert("Delete Failure");
        }
    })
}
function getDepartment() {
    $.get("http://cukcuk.manhnv.net/api/Department").done(function (response) {
        let data = response;
        $.each(data, function (index, item) {
            let department = item.DepartmentName;
            let optionHtml = `<span class="custom-option"><i></i>${department}</span>`
            $('.custom-options').append(optionHtml);
            $('#department-employee').append(`<option>${department}</option>`);
        })
    }).fail(function (response) {
        alert("Failed");
    })
}
function getPosition() {
    $.get("http://cukcuk.manhnv.net/v1/Positions").done(function (response) {
        let data = response;
        $.each(data, function (index, item) {
            let position = item.PositionName;
            let optionHtml = `<span class="custom-option-position"><i></i>${position}</span>`
            $('.custom-options-position').append(optionHtml);
            $('#position-employee').append(`<option>${position}</option>`);
        })
    }).fail(function (response) {
        alert("Failed");
    });
}
function getIdDepartment() {
    $.get("http://cukcuk.manhnv.net/api/Department").done(function (response) {
        $.each(response, function (index, item) {
            let departmentname = item.DepartmentName;
            let departmentid = item.DepartmentId;
            $('.custom-option').each(function (ind, option) {
                if ($(option).text() == departmentname) {
                    $(option).attr("departmentid", departmentid);
                    console.log(departmentid);
                }
            })
        })
    }).fail(function (response) {
        alert("Failed");
    })
}
function getIdFromDepartment(val) {
    let result;
    $('.custom-option').each(function (ind, option) {
        if (val == $(option).text()) {
            result = $(option).attr("departmentid");
        }
    })
    return result;
}
function getIdPosition() {
    $.get("http://cukcuk.manhnv.net/v1/Positions").done(function (response) {
        $.each(response, function (index, item) {
            let positionname = item.PositionName;
            let positionid = item.PositionId;
            $('.custom-option-position').each(function (ind, option) {
                if ($(option).text().toUpperCase() === positionname.toUpperCase()) {
                    $(option).attr("positionid", positionid);
                    console.log(positionid);
                }
            })
        })
    }).fail(function (response) {
        alert("Failed");
    })
}
function getIdFromPosition(val) {
    let result;
    $('.custom-option-position').each(function (ind, option) {
        if (val == $(option).text()) {
            result = $(option).attr("positionid");
        }
    })
    return result;
}
function employeeFilter(pageSize, pageNumber, employeeFilter, departmentId, positionid) {
    $.get('http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&employeeFilter=' + employeeFilter + '&departmentId=' + departmentId + '&positionid=' + positionid).done(function (response) {
        let data = response.Data;
        let totalPage = response.TotalPage;
        let totalRecord = response.TotalRecord;
        $('tbody').empty();
        $.each(data, function (index, item) {
            let customerCode = item.EmployeeCode;
            let phoneNumber = item.PhoneNumber;
            let fullName = item.FullName;
            let genderName = item.GenderName;
            let dateOfBirth = item.DateOfBirth;
            let email = item.Email;
            let dateOrigin = new Date(dateOfBirth).toLocaleDateString('en-GB');
            const numberFormat = new Intl.NumberFormat('vi-VN'
            );
            let salary = numberFormat.format(item.Salary);
            let trHtml = `<tr employeeid=${item.EmployeeId}>
            <td scope="row">${customerCode}</td>
            <td>${fullName}</td>
            <td>${genderName}</td>
            <td class="text-align-center">${dateOrigin}</td>
            <td>${phoneNumber}</td>
            <td>${email}</td>
            <td>${item.PositionName}</td>
            <td>${item.DepartmentName}</td>
            <td class="text-align-right">${salary}</td>
            <td>${item.WorkStatus}</td>
            </tr>`;
            $('tbody').append(trHtml);
        })
    }).fail(function (response) {
        alert("Failed");
    }
    )
};
var pagenow;
function paginationTable() {
    $('#page-1').click(function () {
        employeeFilter(15, 1, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
        pagenow = 1;
    });
    $('#page-2').click(function () {
        employeeFilter(15, 2, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
        pagenow = 2;
    });
    $('#page-3').click(function () {
        employeeFilter(15, 3, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
        pagenow = 3;
    });
    $('#page-4').click(function () {
        employeeFilter(15, 4, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
        pagenow = 4;
    });
    $('#nextpage').click(function () {
        pagenow++;
        employeeFilter(15, pagenow, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
    });
    $('#prevpage').click(function () {
        pagenow--;
        employeeFilter(15, pagenow, $('#finder-findtext').val(), getIdFromDepartment($('#selectcar').val()), getIdFromPosition($('#selectposition').val()));
    });
    
}
