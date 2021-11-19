$(function() { 
    // 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
    var cookie_member_id = getCookie('cookie_member_id');
    $('[name=member_id]').val(cookie_member_id);
     
    if ( $('[name=member_id]').val() != '' ) {
        // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
        $('[name=save_member_id]').attr('checked', true); // ID 저장하기를 체크 상태로 두기.
    }
     
    $('[name=save_member_id]').on('change', function() {
        // 체크박스에 변화가 있다면,
        if ( $('[name=save_member_id]').is(':checked') ) {
            // ID 저장하기 체크했을 때,
            setCookie('cookie_member_id', $('[name=member_id]').val(), 7); // 7일 동안 쿠키 보관
        }
        else {
            // ID 저장하기 체크 해제 시,
            deleteCookie('cookie_member_id');
        }
    });
     
    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
    $('[name=member_id]').on('keyup', function() {
        // ID 입력 칸에 ID를 입력할 때,
        if ( $('[name=save_member_id]').is(':checked') ) {
            // ID 저장하기를 체크한 상태라면,
            setCookie('cookie_member_id', $('[name=member_id]').val(), 7); // 7일 동안 쿠키 보관
        }
    });
});
