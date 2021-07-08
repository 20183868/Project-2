
function formatDate(date){
    var date = new Date(date) ;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear() ;
    day = day < 10 ? '0' + day : day ;
    month = month < 10 ? '0' + month : month ;

    return day + '/'+month +'/'+year ;
}

function formartSalary(salary){
    if( salary == null){
        salary = '' ;
        return salary;
    }else
    return String(salary).replace(/(.)(?=(\d{3})+$)/g,'$1.') + ' $' ;
}

class BaseJS{
    constructor(){
        this.loadData();
    }

    loadData(){
        $.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees" ,
            method: "GET" ,
        }).done(function(res){
            var data = res ;
            // debugger ;
            $.each(data,function(index,item){
            var dateofBirth = item["JoinDate"] ;
                dateofBirth = formatDate(dateofBirth);
            var salary = item.Salary ;
                salary = formartSalary(salary) ;
            var tr =$(`<tr>
                        <td onclick="showFormFix()">`+item.EmployeeCode+`</td>
                        <td onclick="showFormFix()">`+item.FullName+`</td>
                        <td onclick="showFormFix()">`+item.GenderName+`</td>
                        <td onclick="showFormFix()">`+dateofBirth+`</td>
                        <td onclick="showFormFix()">`+item.PhoneNumber+`</td>
                        <td onclick="showFormFix()">`+item.Email+`</td>
                        <td onclick="showFormFix()">`+item.PositionName+`</td>
                        <td onclick="showFormFix()">`+item.DepartmentCode+`</td>
                        <td onclick="showFormFix()">`+salary+`</td>
                        <td onclick="showFormFix()">`+item.WorkStatus+`</td>
                    </tr>`);
                    $('table tbody') .append(tr) ;                
             })   
            
         
        }).fail(function(res){
    
        })
    }
}