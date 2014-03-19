/**
 * Created by conroyp on 12/5/13.
 */
/*
    $.get("http://localhost:3000/Images/CCPaper/PRD1287863",function(data){
        $
        for(var item in data)
        {
            var imagePath= "/Image?file="+data[item].Full_DOS_Path;

            var pageHTML = "<div class='mini-page-item'><div class='preview-page-num'>"+data[item].Bates+
                "</div><div class='mini-page-view'><img src='" +imagePath + "'></div></div>";
            $("#tiffSidebar").append(pageHTML);
        }
        if (data.length >0)
        {
            $("#tiffViewSpace img").attr("src","/Image?file="+data[0].Full_DOS_Path);
        }

    },'json');
*/
    $("#ZoomLevel").on('change', function() {

        console.log(this);
        $("#tiffViewSpace img").css("transform","scale(" + (parseInt($(this).val())/100).toString() + ")" );
    });
    $(".icon-zoom-in").on('click', function() {
        var selectedIndex= $(this).parent().find("#ZoomLevel").prop("selectedIndex");
        $("#ZoomLevel").prop("selectedIndex",selectedIndex-1);
        $("#ZoomLevel").trigger("change");
    });
    $(".icon-zoom-out").on('click', function() {
        var selectedIndex= $(this).parent().find("#ZoomLevel").prop("selectedIndex");
        $("#ZoomLevel").prop("selectedIndex",selectedIndex+1);
        $("#ZoomLevel").trigger("change");
    });
    $(".icon-repeat").on('click', function() {
        $("#tiffViewSpace img").css("transform","rotate(90deg)");

    });
    $("#tiffSidebar").on('click','.mini-page-view img',function(){
        var source=$(this).attr('src');
        $("#tiffViewSpace img").attr("src",source);
    });

