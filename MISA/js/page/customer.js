$(document).ready(function(){
    new CustomerJS();
 })

 
class  CustomerJS extends BaseJS{ 
     constructor(){
        // this.loadData() ;
        super();
     }
    //  loadData(){
    //     $.ajax({
    //         url : "http://cukcuk.manhnv.net/v1/Employees" ,
    //         method: "GET" ,
    //     }).done(function(res){
    //         var data = res ;
    //         // debugger ;
    //         $.each(data,function(index,item){
    //         var dateofBirth = item["JoinDate"] ;
    //             dateofBirth = formatDate(dateofBirth);
    //         var salary = item.Salary ;
    //             salary = formartSalary(salary) ;
    //         var tr =$(`<tr>
    //                     <td onclick="showFormFix()">`+item.EmployeeCode+`</td>
    //                     <td onclick="showFormFix()">`+item.FullName+`</td>
    //                     <td onclick="showFormFix()">`+item.GenderName+`</td>
    //                     <td onclick="showFormFix()">`+dateofBirth+`</td>
    //                     <td onclick="showFormFix()">`+item.PhoneNumber+`</td>
    //                     <td onclick="showFormFix()">`+item.Email+`</td>
    //                     <td onclick="showFormFix()">`+item.PositionName+`</td>
    //                     <td onclick="showFormFix()">`+item.DepartmentCode+`</td>
    //                     <td onclick="showFormFix()">`+salary+`</td>
    //                     <td onclick="showFormFix()">`+item.WorkStatus+`</td>
    //                 </tr>`);
    //                 $('table tbody') .append(tr) ;                
    //          })   
            
         
    //     }).fail(function(res){
    
    //     })
    // }
     add(){

     }
     edit(){

     }
     delete(){

     }
 }