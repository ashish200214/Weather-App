$(document).ready(function () {
    $('#form-id').submit(function (e) { 
        e.preventDefault();
        $('.text-danger').remove();
        //checking if already the Please Enter Something is displayed or not.
        if($('#city').val()===""){
            console.log("empty");
            
        $('form').append(`
            <p class="text-danger text-center">Please Enter The City Name</p>
            `);                         
        }
        else{
            console.log("Move to result.html");
            localStorage.setItem("cityName",$('#city').val());
            window.location.href="./result.html";
        }
        
    });
    
});