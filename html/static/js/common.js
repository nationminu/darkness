function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 카드번호 자동 입력
function autoCardNumber(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if ( str.length < 5) {
        return str;
    } else if ( str.length < 9 ) {
        tmp += str.substr(0, 4);
        tmp += '-';
        tmp += str.substr(4);
        return tmp;
    } else if ( str.length < 13 ) {
        tmp += str.substr(0, 4);
        tmp += '-';
        tmp += str.substr(4, 4);
        tmp += '-';
        tmp += str.substr(8);
        return tmp;
    } else {        
        tmp += str.substr(0, 4);
        tmp += '-';
        tmp += str.substr(4, 4);
        tmp += '-';
        tmp += str.substr(8, 4);
        tmp += '-';
        tmp += str.substr(12);
        return tmp;
    }
    return str;
}

// 카드유효기간 자동 입력
function autoCardValidYM(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if ( str.length < 3) {
        return str;
    } else {        
        tmp += str.substr(0, 2);
        tmp += '/';
        tmp += str.substr(2);
        return tmp;
    }
    return str;
}

// 휴대폰번호 하이픈(-) 자동 입력
// https://mulder21c.github.io/2014/11/03/automatically-enter-cell-phone-number-hyphen
function autoCellPhone(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if ( str.length < 4) {
        return str;
    } else if ( str.length < 7 ) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    } else if ( str.length < 11 ) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    } else {        
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}

function autoPhone(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if ( str.length < 4) {
        return str;
    } else {
        if( str.length < 7 ) {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        } else if ( str.length == 8 ) {
            tmp += str.substr(0, 4);
            tmp += '-';
            tmp += str.substr(4);
            return tmp;
        } else if ( str.length == 9 ) {
            // 02-123-4567 (9자)
            tmp += str.substr(0, 2);
            tmp += '-';
            tmp += str.substr(2, 3);
            tmp += '-';
            tmp += str.substr(5);
            return tmp;
        } else if ( str.length > 9 ) {
            if ( str.length == 10 ) {
                // 02-1234-5678 (10자)
                if ( str.substr(0, 2) == '02' ) {
                    tmp += str.substr(0, 2);
                    tmp += '-';
                    tmp += str.substr(2, 4);
                    tmp += '-';
                    tmp += str.substr(6);
                    return tmp;
                }
                // 031-123-4567 (10자)
                else {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 3);
                    tmp += '-';
                    tmp += str.substr(6);
                    return tmp;
                }
            } else if ( str.length > 10 ) { 
                // 031-1234-5678 (11자)       
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
        }
    }
    return str;
}

function crawling_date(val)
{
    $("#crawling_date"+val).focus();
}

function checkFileType(filePath) {
    var fileFormat = filePath.split(".");
    if ( fileFormat.indexOf("xlsx") > -1 || fileFormat.indexOf("xls") > -1 ) {
        return true;
    } else {
        //checkFileType 에서 excel 확장자가 아닌경우 
        alert('Excel 파일만 업로드 가능합니다.');
        return;
    }
}


출처: https://daydreamer-92.tistory.com/46 [아는게1도없다]

$(function() {
    // 전화번호 자동 입력 이벤트
    $('.handle-phone').on('keyup', function() {
        var _this = $(this).val();
        var _change = autoPhone(_this);
        $(this).val(_change);
    });

    // 휴대폰번호 자동 입력 이벤트
    $('.handle-cell-phone').on('keyup', function() {
        var _this = $(this).val();
        var _change = autoCellPhone(_this);
        $(this).val(_change);
    });

    // 카드번호 자동 입력 이벤트
    $('.handle-card-number').on('keyup', function() {
        var _this = $(this).val();
        var _change = autoCardNumber(_this);
        $(this).val(_change);
    });

    // 카드유효기간 자동 입력 이벤트
    $('.handle-card-valid-ym').on('keyup', function() {
        var _this = $(this).val();
        var _change = autoCardValidYM(_this);
        $(this).val(_change);
    });

    $("#mind_input").keyup(function(event) {
        if ( event.keyCode == 13 ) {
            $("#mind_search").submit();
        }
    });

    $("#region_name").keyup(function(event) {
        if ( event.keyCode == 13 ) {
            fn_region_proc();
        }
    });

    $("#url1").on('keyup', function(){
        $("#url_short_btn1").attr("disabled", false);
    });

    $("#url2").on('keyup', function(){
        $("#url_short_btn2").attr("disabled", false);
    });

    $("#url3").on('keyup', function(){
        $("#url_short_btn3").attr("disabled", false);
    });


    var currentYear = (new Date()).getFullYear();

    var startYear = currentYear;
    var endYear = currentYear + 30;

    var options = {
            startYear: startYear,
            finalYear: endYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#roadmap_start_date').monthpicker(options);
    $('#roadmap_end_date').monthpicker(options);
    $('#roadmap_start_date_upd').monthpicker(options);
    $('#roadmap_end_date_upd').monthpicker(options);

    $('#s_date_search').monthpicker(options);
    $('#e_date_search').monthpicker(options);
    // $('#date1_search').monthpicker(options);
    // $('#date2_search').monthpicker(options);

    $("#date1_search").datepicker({dateFormat: 'yy-mm-dd'});
    $("#date2_search").datepicker({dateFormat: 'yy-mm-dd'});
    $("#crawling_date1").datepicker({dateFormat: 'yy-mm-dd'});
    $("#crawling_date2").datepicker({dateFormat: 'yy-mm-dd'});

    $("#keyword_start_date").datepicker({dateFormat: 'yy-mm-dd'});
    $("#keyword_end_date").datepicker({dateFormat: 'yy-mm-dd'});

    $("#mind_select_start_date").datepicker({dateFormat: 'yy-mm-dd'});
    $("#mind_select_end_date").datepicker({dateFormat: 'yy-mm-dd'});
    $("#mind_start_date").datepicker({dateFormat: 'yy-mm-dd'});
    $("#mind_end_date").datepicker({dateFormat: 'yy-mm-dd'});
    $("#mind_start_date_upd").datepicker({dateFormat: 'yy-mm-dd'});
    $("#mind_end_date_upd").datepicker({dateFormat: 'yy-mm-dd'});
});