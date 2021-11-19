function defalut_form_submit()
{
    $("#defalut_form").submit();
}

function topic_form_submit()
{

    var text = '';
    $('.tag_name').each(function(index) {
        if( index < 1 ){
            text += $(this).html();
        }else{
            text += '|' + $(this).html();
        }
    });

    $("#keyword_box").val(text);

    $("#topic_form").submit();
}


function fn_project_delete(url)
{

    if( confirm('삭제된 데이터는 복구 할 수 없습니다.\n삭제하시겠습니까?') )
    {
        location.href = url;
    }

}

// Category 추가
function category_add(thi)
{
    var parent_node = $(thi).parents('.category-div');
    var clone_node = $(parent_node).clone();
    clone_node.find("input").val("");

    $(parent_node).after(clone_node);
}


// Category 삭제
function category_del(thi)
{
    var parent_node = $(thi).parents('.category-div');
    if( $('.category-div').length < 2 )
    {
        alert('더 이상 삭제 할 수 없습니다.');
        return;
    }
    $(parent_node).remove();
}

// 화두 키워드 추가하기
function keyword_add(thi){
    if(event.keyCode == 13)
     {
        var row = '';
        row += '<span class="tags">';
        row += '    <span class="tag_name">'+$(thi).val()+'</span>';
        row += '    <a title="Removing tag" onclick="keyword_span_remove(this)">x</a>';
        row += '</span>';
    
        $("#tags_tagsinput").append(row);
        $(thi).val('');
     }
}

// 화두 키워드 삭제하기
function keyword_span_remove(thi){
    $(thi).parent().remove();
}

// Archive 삭제하기
function delete_archive(archive_seq)
{
    if ( archive_seq == '' )
    {
        alert('선택된 Archive가 없습니다.');
        return false;
    }
    else
    {
        if ( confirm('삭제 후 복구 불가능 합니다.\n삭제 하시겠습니까 ?') )
        {
            $.ajax({
                url: '/archive/delete',
                type: 'POST',
                dataType: 'json',
                data: {
                    'archive_seq': archive_seq
                },
                success:function(json) {
                    if ( json.result )
                        location.reload();
                    else
                        alert(json.resultMessage);
                }
            });
        } else {
            return false;
        }
    }
}

function archive_select(archive = false, thi){
    
    $("#archive_section_seq").val(archive);
    $("#archive_btn").text($(thi).text());

}


function select_theme(thi)
{

    if( $(thi).children("option:selected").val() == "" )
    {
        return;
    }


    if( $(".theme_select_input").length >= 1 ){    
        var flag = true;
        $(".theme_select_input").each(function(item, index){
            if( $(this).val() == $(thi).val() )
            {
                alert("같은 THEME는 추가가 안됩니다.");
                flag = false;
                return;
            }
        });

        if( flag == false )
        {
            return;
        }
    }

    var html = '<div id="theme_select_span_div'+$(thi).val()+'" class="col-5 m-2 theme_select_span_div" >';
    html    +=' <span>'+$(thi).children("option:selected").text()+'</span>';
    html    +=' <input type="hidden" class="theme_select_input" value="'+$(thi).val()+'">';
    html    +=' <span class="fl-right"><span onclick="select_span_del('+$(thi).val()+')" style="cursor:pointer;">X</span></span>';
    html    +='</div>';

    $("#theme_box").append(html);

    $("#project_select_box").attr("disabled", true);

}

function select_span_del(id)
{
    $("#theme_select_span_div"+id).remove();
    
    if( $("#theme_box").children().length < 1 ){
        $("#project_select_box").attr("disabled", false);
    }
}

function keyword_span_del(thi)
{
    $(thi).parent().remove();
}

function news_select()
{
    if( $("input:checkbox[name='id[]']").length < 1 )
    {
        alert("검색을 해주세요.");
        return;
    }

    if( $("input:checkbox[name='id[]']:checked").length < 1 )
    {
        alert("체크를 해주세요.");
        return;
    }else{
        $("[name='id[]']:checked").each(function(){
            this.checked = false;
            var node = $(this).parent().parent().parent().clone();
            $(node).append('<td><button type="button" class="btn btn-danger btn-sm" onclick="news_del(this)">삭제</button></td>');
            $("#news_tbody").append(node);
            $(this).parent().parent().parent().remove();
        });
    }


}

function news_del(thi)
{
    $(thi).parent().parent().remove();
}

function news_chk_del()
{
    $(".news_checkbox:checked").parent().parent().parent().remove();
}

function keyword_search(thi)
{

    $("#keyword_search_input").val($(thi).text());
    search("new");

}


function issue_regist(section)
{
    if( $("#project_select_box").children("option:selected").val() == "" )
    {
        alert('프로젝트를 선택해주세요.');
        return;
    }

    if( $(".theme_select_input").length < 1 )
    {
        alert('THEME를 선택해주세요.');
        return;
    }else{
        var arr_theme = new Object();
        $(".theme_select_input").each(function(i){
            arr_theme[i] = $(this).val();
        });
    }

    if( $(".theme_keyword_span").length < 1 )
    {
        alert('Keyword를 등록해주세요.');
        return;
    }else{
        var arr_keyword = new Object();
        $(".theme_keyword_txt").each(function(i){
            arr_keyword[i] = $(this).text();
        });
    }

    if( $("#news_tbody tr").length < 1 ){
        if( confirm("기사를 첨부 안하시겠습니까?") ){
            $("analysis_form").submit();
        }else{
            return;
        }
    }else{
        var arr_news = new Object();
        $("#news_tbody tr").each(function(i){
            arr_news[i] = $(this).children().eq(0).children().children("input").val();
        });
    }

    $("#hidden_theme").val(JSON.stringify(arr_theme));
    $("#hidden_keyword").val(JSON.stringify(arr_keyword));
    $("#hidden_news").val(JSON.stringify(arr_news));

    $("#project_select_box").attr("disabled", false);

    $("#analysis_form")[0].submit();

}

function keywordFormSubmit()
{
    $('#keyword_form')[0].submit();
}

var keyword_seq;
function keyword_update(seq)
{
    keyword_seq = seq;

    $.ajax({
        url : '/keyword/get_keyword',
        type : 'get',
        datatype : JSON,
        data : {
            'seq' : seq,
        },
        success:function(data)
        {
            if(data.code == '200'){
                data.keyword_list.forEach(function(item, index, arr2) {
                    $("#keyword_main_upd").val(item.keyword_main);
                    $("#keyword_link_upd").val(item.keyword_link);
                    if( item.keyword_category1 == "11" ) $("#keyword_category1_upd").attr("checked", true); else $("#keyword_category1_upd").attr("checked", false);
                    if( item.keyword_category2 == "12" ) $("#keyword_category2_upd").attr("checked", true); else $("#keyword_category2_upd").attr("checked", false);
                    if( item.keyword_category3 == "13" ) $("#keyword_category3_upd").attr("checked", true); else $("#keyword_category3_upd").attr("checked", false);
                    if( item.keyword_category4 == "14" ) $("#keyword_category4_upd").attr("checked", true); else $("#keyword_category4_upd").attr("checked", false);
                    if( item.keyword_category5 == "15" ) $("#keyword_category5_upd").attr("checked", true); else $("#keyword_category5_upd").attr("checked", false);
                });

                $('#modal-notification').modal('show');
                return;

            }else{
                alert("Error");
                return;
            }
        }
    });


}

function fn_keyword_update_proc()
{
    $("#keyword_modal_form").attr("action", "/keyword/update_proc/"+keyword_seq);
    $("#keyword_modal_form")[0].submit();
}

function keyword_del(seq)
{
    if( confirm( "키워드를 삭제하시겠습니까?" ) ){
        location.href = "/keyword/delete/"+seq;
    }else{
        return;
    }
}

function roadmap_news_view(thi)
{

    if( $(thi).next().is(".show_div")  === true ){
        $(thi).next().removeClass("show_div");
    }else{
        $(".after_div_box").removeClass('show_div');
        $(thi).next().addClass("show_div");
    }

}

function more_txt(seq, thi)
{

    if( $("#archive_desc"+seq).height() > 70 ){
        $(thi).text('더보기');
        $("#archive_desc"+seq).css("height", "65px");
        $("#archive_desc"+seq).css("overflow", "hidden");
    }else{
        $(thi).text('숨기기');
        $("#archive_desc"+seq).css("height", "auto");
        $("#archive_desc"+seq).css("overflow", "visible");
    }

}

function issue_delete(section, seq)
{

    if(confirm("이슈를 삭제하시겠습니까?"))
    {
        location.href="/analysis/issue_delete/"+section+"/"+seq;
    }else{ return; }

}

var roadmap_seq_upd;
function fn_roadmap_upd(seq, cate1, cate2, cate3, cate4, cate5, layers, event, s_date, e_date, note)
{
    $("#keyword_category1_upd").prop("checked", false);
    $("#keyword_category2_upd").prop("checked", false);
    $("#keyword_category3_upd").prop("checked", false);
    $("#keyword_category4_upd").prop("checked", false);
    $("#keyword_category5_upd").prop("checked", false);
    $("#roadmap_layers_upd").val("");
    $("#roadmap_event_upd").val("");
    $("#roadmap_start_date_upd").val("");
    $("#roadmap_end_date_upd").val("");
    $("#roadmap_note_upd").text("");

    if( cate1 != "*" )
        $("#keyword_category1_upd").prop("checked", true);
    if( cate2 != "*" )
        $("#keyword_category2_upd").prop("checked", true);
    if( cate3 != "*" )
        $("#keyword_category3_upd").prop("checked", true);
    if( cate4 != "*" )
        $("#keyword_category4_upd").prop("checked", true);
    if( cate5 != "*" )
        $("#keyword_category5_upd").prop("checked", true);
    
    $("#roadmap_layers_upd").val(layers);
    $("#roadmap_event_upd").val(event);
    $("#roadmap_start_date_upd").val(s_date);
    $("#roadmap_end_date_upd").val(e_date);
    $("#roadmap_note_upd").text(note);

    roadmap_seq_upd = seq;

    $("#modal-notification").modal();
}

function fn_roadmap_upd_proc()
{
    if( $("#roadmap_layers_upd").val() == "" )
    {
        alert("Layers를 입력해주세요.");
        return;
    }

    if( $("#roadmap_event_upd").val() == "" )
    {
        alert("event를 입력해주세요.");
        return;
    }

    $("#roadmap_seq_upd").val(roadmap_seq_upd);

    $("#roadmap_modal_form_upd")[0].submit();
}

function roadmap_del(seq)
{
    if( !confirm("정말 삭제하시겠습니까?") )
    {
        return;
    }

    location.href = "/roadmap/delete/"+seq;
}

function mind_delete(seq)
{
    if( !confirm("정말 삭제하시겠습니까?") )
    {
        return;
    }

    location.href = "/mind/delete/"+seq;
}

function mind_form_submit()
{
    $("#mind_search").submit();
}

function mind_value_modify()
{  
    $("#mind_form").attr("action", "/mind/modify/");
    $("#mind_form")[0].submit();
}


function mind_visual()
{
    $("#mind_form").attr("action", "/mind/visual/");
    $("#mind_form")[0].submit();
}

function question_show_N_hide( type, thi )
{
    if( $(thi).hasClass('btn-primary') === true ){
        $(thi).removeClass('btn-primary').addClass('btn-outline-primary');
        $(".question_div_box"+type).hide();
    }else{
        $(thi).removeClass('btn-outline-primary').addClass('btn-primary');
        $(".question_div_box"+type).show();
    }
}

$(function(){

    moveScrollLeft = function() {
        var _scrollX = $('.scroll-div-x').scrollLeft();
        $('.scroll-div-x').scrollLeft(_scrollX - 100);
    };

    moveScrollRight = function() {
        var _scrollX = $('.scroll-div-x').scrollLeft();
        $('.scroll-div-x').scrollLeft(_scrollX + 100);
    };

    var keyword_txt = "";
    $("#project_keyword").keyup(function(event) {
        if ( event.keyCode == 13 ) {
            if( keyword_txt != "" ){
                var html = '<span class="theme_keyword_span">';
                html += '   <span class="theme_keyword_txt" onclick="keyword_search(this)">'+ keyword_txt + "</span>&nbsp;&nbsp;";
                html +='    <span onclick="keyword_span_del(this)" style="cursor:pointer;">X</span>';
                html += '</span>';
                $("#issue_keyword").append(html);
                $(this).val("");
            }
        }else{
            keyword_txt = $("#project_keyword").val();
        }
    });

});