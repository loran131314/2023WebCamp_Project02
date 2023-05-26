// $(document).ready(function (event) {

//     // 檢查視窗大小並執行相應程式碼
//     checkWindowSize();

//     // 當視窗大小改變時重新檢查
//     $(window).on('resize', function () {
//         checkWindowSize();
//     });
// });

// function checkWindowSize() {
//     var windowWidth = $(window).width();

//     if (windowWidth < 375) {
//         // 裝置小於768px的程式碼
//         console.log("裝置寬度小於768px");} else {
//         // 裝置大於等於992px的程式碼
//         console.log("裝置寬度大於等於992px");
//     }
// }


$(document).ready(function (event) {

    $(window).width(function() {    // 此 Code 需要 F5 重新刷新才可使用（待解）
        if ($('body').width() <= 376) {
            $('#navbar').click(function () {
                $('#navbar .menu-icon').toggle();
                $('#navbar .close-icon').toggle();
                $('#header ul').slideToggle();
                $('#header .banner, .container, .footer .content, .footer .back-to-top').slideToggle();
            });
        }else if ($('body').width() > 376){
            $('body').resize(function(){
                location.reload();
            });
        }
    });
    $('#question1').click(function () {
        $('#question1 .add').toggle();
        $('#question1 .remove').toggle();
        $('#question1 #answer').slideToggle();
    });
    $('#question2').click(function () {
        $('#question2 .add').toggle();
        $('#question2 .remove').toggle();
        $('#question2 #answer').slideToggle();
    });

    $('#question3').click(function () {
        $('#question3 .add').toggle();
        $('#question3 .remove').toggle();
        $('#question3 #answer').slideToggle();
    });
    $('#question4').click(function () {
        $('#question4 .add').toggle();
        $('#question4 .remove').toggle();
        $('#question4 #answer').slideToggle();
    });
    $('#question5').click(function () {
        $('#question5 .add').toggle();
        $('#question5 .remove').toggle();
        $('#question5 #answer').slideToggle();
    });

});