$(document).ready(function(){
   new EmployeeJS();
})


function getString(id){
    return document.getElementById(id).value ;
}

function getGender(id){
    var index = getElementById(id).value ;
    switch(index) {
        case 'Nam':
          return 0 ;
          break;
        case 'Nữ':
          return 1 ;
          break;
        default:
          return 2 ;
      }
}

function getWorkStatus(id){
    var index = getElementById(id).value ;
    switch(index) {
        case 'Giam doc':
          return 0 ;
          break;
        default:
          return 1 ;
      }
}


function  addData(){
        var employeecode = getString(document.getElementById(EmployeeCode).value) ;
        var fullname = getString(FullName) ;
        var gendername = getGender(GenderName) ;
        var dateofbirth = getString(dateofBirth) ;
        var phonenumber = getString(PhoneNumber) ;
        var employeeEmail = getString(email) ;
        var positioname = getString(PositionName) ;
        var departmentcode = getString(DepartmentCode);
        var salary = getString(Salary);
        var workstatus =  getWorkStatus(WorkStatus) ;
        var employeeid = getString(employeeId) ;
        var identitydate = getString(identityDate) ;
        var identityplace = getString(identityPlace) ;
        var personaltaxCode = getString(personalTaxCode) ;
        var createddate = getString(createdDate) ;


        self.sendEmail = function(employeecode, fullname, gendername, dateofbirth,phonenumber, employeeEmail,positioname,departmentcode,salary,workstatus,employeeid,identitydate,identityplace,personaltaxCode, createddate) {
            $.ajax({
                url:  "http://cukcuk.manhnv.net/v1/Employees",
                type: "POST",
                data: {
                    'EmployeeCode':  employeecode,
                    'FullName': fullname ,
                    'dateofBirth': dateofbirth,
                    'PhoneNumber': phonenumber,
                    'GenderName' : gendername ,
                    'email' :  employeeEmail ,
                    'PositionName' : positioname ,
                    'DepartmentCode' : departmentcode ,
                    'Salary': salary ,
                    'WorkStatus': workstatus ,
                    'employeeId': employeeid , 
                    'identityDate': identitydate ,
                    'identityPlace': identityplace ,
                    'personalTaxCode': personaltaxCode ,
                    'createdDate': createddate
                },
                contentType: "application/json",
                success: function (data) {
                   console.log(ko.toJSON(data));
                   alert(1);
                }
            });
        }
    }

// function formatDate(date){
//     var date = new Date(date) ;
//     var day = date.getDate();
//     var month = date.getMonth() + 1;
//     var year = date.getFullYear() ;
//     day = day < 10 ? '0' + day : day ;
//     month = month < 10 ? '0' + month : month ;

//     return day + '/'+month +'/'+year ;
// }

// function formartSalary(salary){
//     if( salary == null){
//         salary = '' ;
//         return salary;
//     }else
//     return String(salary).replace(/(.)(?=(\d{3})+$)/g,'$1.') + ' $' ;
// }




class EmployeeJS extends BaseJS  {
    constructor(){
        // this.loadData() ;
        super() ;
    }

    // addData(){
    //     var employeecode = getString(EmployeeCode) ;
    //     var fullname = getString(FullName) ;
    //     var gendername = getGender(GenderName) ;
    //     var dateofbirth = getString(dateofBirth) ;
    //     var phonenumber = getString(PhoneNumber) ;
    //     var employeeEmail = getString(email) ;
    //     var positioname = getString(PositionName) ;
    //     var departmentcode = getString(DepartmentCode);
    //     var salary = getString(Salary);
    //     var workstatus =  getWorkStatus(WorkStatus) ;
    //     var employeeid = getString(employeeId) ;
    //     var identitydate = getString(identityDate) ;
    //     var identityplace = getString(identityPlace) ;
    //     var personaltaxCode = getString(personalTaxCode) ;
    //     var createddate = getString(createdDate) ;


    //     self.sendEmail = function(employeecode, fullname, gendername, dateofbirth,phonenumber, employeeEmail,positioname,departmentcode,salary,workstatus,employeeid,identitydate,identityplace,personaltaxCode, createddate) {
    //         $.ajax({
    //             url:  "http://cukcuk.manhnv.net/v1/Employees",
    //             type: "POST",
    //             data: {
    //                 'EmployeeCode':  employeecode,
    //                 'FullName': fullname ,
    //                 'dateofBirth': dateofbirth,
    //                 'PhoneNumber': phonenumber,
    //                 'GenderName' : gendername ,
    //                 'email' :  employeeEmail ,
    //                 'PositionName' : positioname ,
    //                 'DepartmentCode' : departmentcode ,
    //                 'Salary': salary ,
    //                 'WorkStatus': workstatus ,
    //                 'employeeId': employeeid , 
    //                 'identityDate': identitydate ,
    //                 'identityPlace': identityplace ,
    //                 'personalTaxCode': personaltaxCode ,
    //                 'createdDate': createddate
    //             },
    //             contentType: "application/json",
    //             success: function (data) {
    //                console.log(ko.toJSON(data));
    //                document.getElementsByClassName('modal')[0].style.display = 'none';
    //             }
    //         });
    //     }
    // }
}