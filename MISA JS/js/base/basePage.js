class BasePage {
    Title = null;
    TableList = null;
    HostName = "http://cukcuk.manhnv.net/v1/";
    ApiName = null;
    constructor() {
        this.loadData();
    }
    loadData() {
        let me = this;
        if (me.ApiName == null) {
            alert("Vui lòng nhập thông tin API");
            return;
        }
        $.ajax({
            method: "GET",
            url: me.HostName + me.ApiName,
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
}