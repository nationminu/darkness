/**
 * 쿠키 저장
 * @param cookieName 쿠키명
 * @param value 저장할 값
 * @param exdays 저장 기간(일)
 */
function setCookie(cookieName, value, exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? '' : '; expires=' + exdate.toGMTString());
    document.cookie = cookieName + '=' + cookieValue;
}

/**
 * 쿠키 삭제
 * @param cookieName 쿠키명
 */
function deleteCookie(cookieName)
{
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + '=' + '; expires=' + expireDate.toGMTString();
}
 
/**
 * 쿠키 가져오기
 * @param cookieName 쿠키명
 * @returns 쿠키값
 */
function getCookie(cookieName)
{
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if (start != -1)
    {
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}