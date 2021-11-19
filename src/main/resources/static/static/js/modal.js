var type = '';
var depth = '';
var id = '';
var section = '';
function fn_notification(ty, dp, seq, sec)
{    
    type = ty;
    depth = dp;
    id = seq;
    section = sec;
    $('#modal-notification').modal('show');
}

function fn_notification_proc()
{
    if( $("#subject").val() == "" )
    {
        alert(type + "명을 입력해주세요.");
        return;
    }

    $.ajax({
        url : '/project/regist',
        type : 'post',
        datatype : JSON,
        data : {
            'type' : type,
            'depth' : depth,
            'id' : id,
            'section' : section,
            'subject' : $("#subject").val()
        },
        success:function(data)
        {
            if(data.code == '201'){
                alert("추가되었습니다.");
                var count = $(".project-div").length;

                if( count < 1 ) $(".table-responsive").remove();

                var node = '';
                node += '<div class="form-group row">';
                node += '   <div class="col-sm-11">';
                node += '       <a href="/project/'+section+'?id=' + data.id + '&depth=' + data.depth + '" class="btn btn-outline-secondary btn-lg btn-block">' + $("#subject").val() + '</a>';
                node += '   </div>';
                node += '   <div class="col-sm-1">';
                node += '       <button type="button" class="btn btn-outline-danger btn-lg btn-rounded btn-fw" onclick="fn_project_delete( ';
                node += "'/project/delete/" + data.id + "/"+section+"?id=" + id + "&depth=" + depth + "'";
                node += ' )">X</button>';
                node += '   </div>';
                node += '</div>';

                $(".col-lg-12").append(node);
                $("#subject").val("");
                $('#modal-notification').modal('hide');
                
                return;

            }else{
                alert("추가 실패.");
                return;
            }
        }
    });

}


function fn_analysis()
{    
    $('#modal-notification').modal('show');
}

function fn_analysis_excel_proc()
{
    if( $("#mind_analysis_title").val() == '' ){
        alert('분석명을 입력해주세요.');
        return;
    }
    if( $("#mind_category_seq option:selected").val() == '' ){
        alert('카테고리를 선택해주세요.');
        return;
    }
    if( $("#excel_file").val() == '' ){
        alert('엑셀파일을 업로드해주세요.');
        return;
    }

    $("#modal_form").submit();
}



function fn_project()
{    
    $('#modal-notification_project').modal('show');
}


function fn_theme()
{   
    if( !project_id )
    {
        alert('프로젝트를 선택해주세요.');
        return;
    }
    $('#modal-notification_theme').modal('show');
}

function fn_roadmap()
{    
    $('#modal-notification_roadmap').modal('show');
}

function fn_roadmap_upd()
{    
    $('#modal-notification_roadmap_upd').modal('show');
}


function project_upd(id)
{    
    $("#project_name_upd_hidden").val("");
    $("#project_name_upd").val("");
    $("#project_client_upd").val("");
    $("#project_start_date_upd").val("");
    $("#project_end_date_upd").val("");
    $("#project_note_upd").val("");

    $("#project_name_upd_hidden").val(id);
    $("#project_name_upd").val($("#b_project_subject"+id).text());
    $("#project_client_upd").val($("#span_project_client"+id).text());
    $("#project_start_date_upd").val($("#span_project_start_date"+id).text());
    $("#project_end_date_upd").val($("#span_project_end_date"+id).text());
    $("#project_note_upd").val($("#div_project_note"+id).text());

    $('#modal-notification_project_update').modal('show');
}

function fn_project_upd_proc()
{

    if( $("#project_name_upd").val() == "" )
    {
        alert("PROJECT명을 입력해주세요.");
        return;
    }

    $.ajax({
        url : '/analysis/project_update',
        type : 'post',
        data : {
            'id' : $("#project_name_upd_hidden").val(),
            'subject' : $("#project_name_upd").val(),
            'client'     : $("#project_client_upd").val(),
            'start_date' : $("#project_start_date_upd").val(),
            'end_date'   : $("#project_end_date_upd").val(),
            'note'       : $("#project_note_upd").val(),
        },
        success:function(data)
        {
            if(data == '200'){
                alert("수정되었습니다.");

                $("#b_project_subject"+$("#project_name_upd_hidden").val()).text($("#project_name_upd").val());
                $("#span_project_client"+$("#project_name_upd_hidden").val()).text($("#project_client_upd").val());
                $("#span_project_start_date"+$("#project_name_upd_hidden").val()).text($("#project_start_date_upd").val());
                $("#span_project_end_date"+$("#project_name_upd_hidden").val()).text($("#project_end_date_upd").val());
                $("#div_project_note"+$("#project_name_upd_hidden").val()).text($("#project_note_upd").val());
                $('#modal-notification_project_update').modal('hide');
                
                return;

            }else{
                alert("수정 실패.");
                return;
            }
        }
    });

}



function theme_upd(id)
{   
    $("#theme_name_upd_hidden").val("");
    $("#theme_name_upd").val(""); 
    $("#theme_note_upd").val(""); 

    $("#theme_name_upd_hidden").val(id);
    $("#theme_name_upd").val($("#span_theme_subject"+id).text());
    $("#theme_note_upd").val($("#div_project_note"+id).text()); 

    $('#modal-notification_theme_update').modal('show');
}

var project_id;

function fn_get_theme(id)
{
    $.ajax({
        url : '/analysis/theme',
        type : 'get',
        datatype : JSON,
        data : {
            'id' : id,
        },
        success:function(data)
        {
            var html = '';
            if(data.code == '200'){
                $('#theme_div').children().remove();
                project_id = id;

                $(".project_div_box").removeClass("project_hover_background_color");
                $("#project_div_box"+id).addClass("project_hover_background_color");

                data.project_list.forEach(function(item, index, arr2) { 
                    html = '<div class="theme_div_box" id="theme_div_box'+ item.id +'" onclick="fn_get_issue('+ item.id +')">';
                    // html += '   <i class="fa fa-tag fa-3x theme_i"></i>';
                    html += '   <span class="span_theme_subject" id="span_theme_subject'+ item.id +'">'+ item.subject +'</span>';
                    html += '   <div class="mt-2 fl-left">';
                    html += '       <button type="button" class="btn btn-sm btn-s2" onclick="theme_upd('+ item.id +')">수정</button><br>';
                    html += '       <button type="button" class="btn btn-sm mt-1 btn-s3" onclick="theme_del('+ item.id +')">삭제</button>';
                    html += '   </div>';
                    html += '   <div class="div_project_note" id="div_project_note'+item.id+'">'+item.memo+'</div>';
                    html += '</div>';
            
                    $('#theme_div').append(html);
                });


                $('#issue_box').children().remove();

                                
                data.issue_list.forEach(function(item, index, arr2) { 
                    html = '<div class="issue_div issue_div_box'+item.issue_seq+'"><div>';
                    // html += '   <div class="issue_img_div"></div>';
                    html += '   <div class="fl-left">';
                    html += '       <label class="span_project_client">이 테마에 연결</label>';
                    html += '       <input type="checkbox" class="theme_chk" id="theme'+item.issue_seq+'" value="'+item.issue_seq+'?>" onclick="connect_theme('+item.issue_seq+')">';
                    html += '   </div>';
                    html += '   <div class="issue_name_div">';
                    html += '       <span style="font-size:17px;">'+ item.issue_name +'</span>';
                    // html += '       <br>'+item.ins_user_name;
                    html += '   </div>';
                    html += '</div>';
                    html += '<div class="issue_desc_div">'+item.issue_desc+'</div>';
                    html += '<div class="mt-2 issue_btn_div fl-left">';
                    html += '   <a href="/analysis/issue_detail/'+item.archive_section+'/'+item.issue_seq+'" target="_blank" class="btn btn-sm btn-s1">내용 검토</a>';
                    if( item.status == "1"){
                        html += '   <button class="btn btn-primary btn-sm btn_ok'+item.issue_seq+'" style="" onclick="issue_confirm(this, '+item.issue_seq+', 1)">승인</button>';
                        html += '   <button class="btn btn-primary btn-sm btn_no'+item.issue_seq+'" style="display: none;" onclick="issue_confirm(this, '+item.issue_seq+', 2)">승인취소</button>';
                    }else{
                        html += '   <button class="btn btn-primary btn-sm btn_ok'+item.issue_seq+'" style="display: none;" onclick="issue_confirm(this, '+item.issue_seq+', 1)">승인</button>';
                        html += '   <button class="btn btn-primary btn-sm btn_no'+item.issue_seq+'" style="" onclick="issue_confirm(this, '+item.issue_seq+', 2)">승인취소</button>';
                    }
                    html += '   <button type="button" onclick="issue_delete('+item.archive_section+','+item.issue_seq+')" class="btn btn-sm btn-s3" style="">삭제</button>';
                    html += '</div></div>';
            
                    $('#issue_box').append(html);
                });
                

                return;

            }else{
                alert("Error");
                return;
            }
        }
    });
}

function fn_project_proc(section)
{
    if( $("#project_name").val() == "" )
    {
        alert('PROJECT명을 입력해주세요.');
        return;
    }

    $.ajax({
        url : '/analysis/project_regist_proc',
        type : 'post',
        data : {
            'section'    : section,
            'subject'    : $("#project_name").val(),
            'client'     : $("#client").val(),
            'start_date' : $("#start_date").val(),
            'end_date'   : $("#end_date").val(),
            'note'       : $("#note").val(),
        },
        success:function(data)
        {
            var html = '';
            if(data != 'Error'){
                alert("등록되었습니다.");
                html = '<div class="project_div_box" id="project_div_box'+ data +'" onclick="fn_get_theme('+ data +')">';
                html += '   <i class="fa fa-folder fa-3x project_i"></i>';
                html += '   <span class="span_project_subject" id="span_project_subject'+ data +'"><b id="b_project_subject'+data+'">'+ $("#project_name").val() + '</b>';
                html += '       <span class="span_project_client" id="span_project_client'+data+'">/&nbsp;'+ $("#client").val() +'</span><br>';
                html += '       <span class="span_project_client"><span id="span_project_start_date'+data+'">'+ $("#start_date").val() +'</span> ~ <span id="span_project_end_date'+data+'">'+ $("#end_date").val() +'</span></span>';
                html += '   </span>';
                html += '   <div class="mt-2 fl-left">';
                html += '       <button type="button" class="btn btn-primary btn-sm" onclick="project_upd('+ data +')">편집</button><br>';
                html += '       <button type="button" class="btn btn-danger btn-sm mt-1" onclick="project_del('+ data +')">삭제</button>';
                html += '   </div>';
                html += '   <div class="div_project_note" id="div_project_note'+data+'">'+$("#note").val()+'</div>';
                html += '</div>';
            
                if( $("#project_div").children().length < 1 ){
                    $('#project_div').append(html);
                }else{
                    $(".project_div_box").eq(0).before(html);
                }
                $("#project_name").val("");
                $('#modal-notification_project').modal('hide');

                return;

            }else{
                alert("Error");
                return;
            }
        }
    });

}

function fn_theme_proc(section)
{
    if( !project_id )
    {
        alert('프로젝트를 선택해주세요.');
        return;
    }

    if( $("#theme_name").val() == "" )
    {
        alert('THEME명을 입력해주세요.');
        return;
    }

    $.ajax({
        url : '/analysis/theme_regist_proc',
        type : 'post',
        data : {
            'section'    : section,
            'parent_id'  : project_id,
            'subject'    : $("#theme_name").val(),
            'note'       : $("#theme_note").val(),
        },
        success:function(data)
        {
            var html = '';
            if(data != 'Error'){
                alert("등록되었습니다.");

                html = '<div class="theme_div_box" id="theme_div_box'+ data +'" onclick="fn_get_issue('+ data +')">';
                html += '   <i class="fa fa-tag fa-3x theme_i"></i>';
                html += '   <span class="span_theme_subject" id="span_theme_subject'+ data +'">'+ $("#theme_name").val() +'</span>';
                html += '   <div class="mt-2 fl-left">';
                html += '       <button type="button" class="btn btn-primary btn-sm" onclick="theme_upd('+ data +')">편집</button><br>';
                html += '       <button type="button" class="btn btn-danger btn-sm mt-1" onclick="theme_del('+ data +')">삭제</button>';
                html += '   </div>';
                html += '   <div class="div_project_note" id="div_project_note'+data+'">'+$("#theme_note").val()+'</div>';
                html += '</div>';
            
                
                if( $("#theme_div").children().length < 1 ){
                    $('#theme_div').append(html);
                }else{
                    $(".theme_div_box").eq(0).before(html);
                }
                $("#theme_name").val("");
                $("#theme_note").val("");
                $('#modal-notification_theme').modal('hide');

                return;

            }else{
                alert("Error");
                return;
            }
        }
    });

}


function fn_theme_upd_proc()
{

    if( $("#theme_name_upd").val() == "" )
    {
        alert("THEME명을 입력해주세요.");
        return;
    }

    $.ajax({
        url : '/analysis/project_update',
        type : 'post',
        data : {
            'id'         : $("#theme_name_upd_hidden").val(),
            'subject'    : $("#theme_name_upd").val(),
            'note'       : $("#theme_note_upd").val(),
        },
        success:function(data)
        {
            if(data == '200'){
                alert("수정되었습니다.");

                $("#span_theme_subject"+$("#theme_name_upd_hidden").val()).text($("#theme_name_upd").val());
                $("#div_project_note"+$("#theme_name_upd_hidden").val()).text($("#theme_note_upd").val());
                $('#modal-notification_theme_update').modal('hide');
                
                return;

            }else{
                alert("수정 실패.");
                return;
            }
        }
    });

}


var project_theme_seq;

function fn_get_issue(id)
{
    $.ajax({
        url : '/project/theme_issue',
        type : 'get',
        datatype : JSON,
        data : {
            'id' : id,
        },
        success:function(data)
        {
            var html = '';
            if(data.code == '200'){
                project_theme_seq = id;
                // $('#issue_box').children().remove();

                $(".theme_div_box").removeClass("theme_hover_background_color");
                $("#theme_div_box"+id).addClass("theme_hover_background_color");
                
                $(".theme_chk").prop('checked', false);

                data.theme_list.forEach(function(item, index, arr2) { 
                    $("#theme"+item.issue_seq).prop('checked', true);
                    $(".issue_div").eq(0).before($(".issue_div_box"+item.issue_seq));
                });
                // data.issue_list.forEach(function(item, index, arr2) { 
                //     html = '<div>';
                //     html += '   <div class="issue_img_div"></div>';
                //     html += '   <div class="issue_name_div">';
                //     html += '       <span style="font-size:17px;">'+ item.issue_name +'</span><br>'+item.ins_user_name;
                //     html += '   </div>';
                //     html += '</div>';
                //     html += '<div class="fl-left">';
                //     html += '   <label class="span_project_client">이 테마에 연결</label>';
                //     html += '   <input type="checkbox" class="theme_chk" id="theme'+item.issue_seq+'" value="'+item.issue_seq+'?>" onclick="connect_theme('+item.issue_seq+')">';
                //     html += '</div>';
                //     html += '<div class="issue_desc_div">'+item.issue_desc+'</div>';
                //     html += '<div class="mt-2 issue_btn_div">';
                //     html += '   <a href="/analysis/issue_detail/'+item.archive_section+'/'+item.issue_seq+'" class="btn btn-primary btn-md" style="border-radius: 20px;">내용 검토</a>';
                //     if( item.issue_ok == "1"){
                //         html += '   <button class="btn btn-primary btn-md btn_ok'+item.issue_seq+'" style="border-radius: 20px;" onclick="issue_confirm(this, '+item.issue_seq+', 1)">승인</button>';
                //         html += '   <button class="btn btn-primary btn-md btn_no'+item.issue_seq+'" style="border-radius: 20px; display: none;" onclick="issue_confirm(this, '+item.issue_seq+', 2)">승인취소</button>';
                //     }else{
                //         html += '   <button class="btn btn-primary btn-md btn_ok'+item.issue_seq+'" style="border-radius: 20px; display: none;" onclick="issue_confirm(this, '+item.issue_seq+', 1)">승인</button>';
                //         html += '   <button class="btn btn-primary btn-md btn_no'+item.issue_seq+'" style="border-radius: 20px;" onclick="issue_confirm(this, '+item.issue_seq+', 2)">승인취소</button>';
                //     }
                //     html += '   <button type="button" onclick="issue_delete('+item.archive_section+','+item.issue_seq+')" class="btn btn-danger btn-md" style="border-radius: 20px;">삭제</button>';
                //     html += '</div>';
            
                //     $('#issue_box').append(html);
                // });

                return;

            }else{
                alert("Error");
                return;
            }
        }
    });
}


function connect_theme(seq)
{

    if( project_theme_seq == "" )
    {
        alert("테마를 선택해주세요.");
        return;
    }
    var check_ok;
    if($("#theme"+seq).is(":checked") == true) {
        check_ok = 1;
    }else{
        check_ok = 2;
    }

    $.ajax({
        url : '/analysis/connect_theme',
        type : 'post',
        data : {
            'theme_id' : project_theme_seq,
            'issue_id' : seq,
            'check_ok' : check_ok
        },
        success:function(data)
        {
            if(data != '200'){
                alert("수정 실패.");
                $("#theme"+seq).prop('checked', false);
                return;
            }
        }
    });    

}

function roadmap_modal_show()
{
    $("#modal-body-div").show();
}

function fn_issue_add(section)
{
    var p_id ;
    if( !project_id )
        p_id = "";
    else
        p_id = project_id

    var t_id;    
    if( !project_theme_seq )
        t_id = "";
    else
        t_id = project_theme_seq;
 
    location.href="/analysis/project_regist/"+section+"?p_id="+p_id+"&t_id="+t_id;

}

function fn_mind_modal()
{
    $("#modal-notification_mind").modal('show');
}

function fn_mind_proc()
{

    if( $("#mind_title").val() == "" )
    {
        alert('설문조사명을 입력해주세요.');
        return;
    }

    if( $("#mind_start_date").val() == "" )
    {
        alert('시작기간을 선택해주세요.');
        return;
    }
    
    if( $("#mind_end_date").val() == "" )
    {
        alert('종료기간을 선택해주세요.');
        return;
    }
    
    if( $("#mind_file").val() == "" )
    {
        alert('파일을 선택해주세요.');
        return;
    }else{
        var file = $("#mind_file").val();
    }
    
    // 파일 형식 체크
    checkFileType(file);

    $("#regist_mind_form").submit();

}

function fn_mind_modal_upd(type)
{
    $("#mind_type").val(type);
    $("#modal-notification_mind_update").modal('show');
    // $.ajax({
    //     url : '/mind/get_mind',
    //     type : 'post',
    //     data : {
    //         'value' : $("#mind_val"),
    //     },
    //     datatype : JSON,
    //     success:function(data)
    //     {
    //         if(data.result == '200'){
    //             $("#mind_type").val(type);
    //             $("#mind_title_upd").val(data.title);
    //             $("#mind_region_upd").val(data.region).prop("selected", true);
    //             $("#mind_start_date_upd").val(data.start_date);
    //             $("#mind_end_date_upd").val(data.end_date);
    //             $("#mind_project_upd").val(data.project).prop("selected", true);

    //             $("#mind_value_upd").val(val);

                
    //         }else{
    //             alert("통신오류.");
    //             return;
    //         }
    //     }
    // });  

}

function fn_mind_modal_modify(val)
{
    $("#mind_value_upd").val(val);
    $("#modal-notification_mind_update").modal('show');
    // $.ajax({
    //     url : '/mind/get_mind',
    //     type : 'post',
    //     data : {
    //         'value' : $("#mind_val"),
    //     },
    //     datatype : JSON,
    //     success:function(data)
    //     {
    //         if(data.result == '200'){
    //             $("#mind_type").val(type);
    //             $("#mind_title_upd").val(data.title);
    //             $("#mind_region_upd").val(data.region).prop("selected", true);
    //             $("#mind_start_date_upd").val(data.start_date);
    //             $("#mind_end_date_upd").val(data.end_date);
    //             $("#mind_project_upd").val(data.project).prop("selected", true);

    //             $("#mind_value_upd").val(val);

                
    //         }else{
    //             alert("통신오류.");
    //             return;
    //         }
    //     }
    // });  

}

function fn_mind_upd_proc()
{

    if( $("#mind_title_upd").val() == "" )
    {
        alert('설문조사명을 입력해주세요.');
        return;
    }

    if( $("#mind_start_date_upd").val() == "" )
    {
        alert('시작기간을 선택해주세요.');
        return;
    }
    
    if( $("#mind_end_date_upd").val() == "" )
    {
        alert('종료기간을 선택해주세요.');
        return;
    }

    if( $("#mind_file_upd").val() != "" )
    {
        var file = $("#mind_file_upd").val();
        
        // 파일 형식 체크
        checkFileType(file);        
    }

    if( $("#mind_type").val() == 1 )
    {
        if( confirm('통합하시겠습니까?') )
        {
            $("#mind_integrated").val("2");
        }
        $("#modify_mind_form").attr('action','/mind/mind_combine');
    }
    
    $("#modify_mind_form").submit();

}

function regionFormSubmit()
{
    $("#modal-notification").modal('show');
}

function fn_region_proc()
{

    if( $("#region_name").val() == "" )
    {
        alert('국가명을 입력해주세요.');
        return;
    } 

    $.ajax({
        url : '/region/regist_proc',
        type : 'post',
        data : {
            'value' : $("#region_name").val(),
        },
        datatype : JSON,
        success:function(data)
        {
            if(data.result == '200'){                
                var tr = '<tr><td class="text-center">'+$("#region_name").val()+'</td><td class="text-center">'+data.date+'</td></tr>';

                $("#region_table").append(tr);
                $("#region_name").val("");
                $("#modal-notification").modal('hide');
                
            }else{
                alert("통신오류.");
                return;
            }
        }
    });  
}

// var issue_id;
// function issue_desc_modify(id)
// {
//     issue_id = id;
//     console.log(id);
//     $("#issue_desc").val($("#issue_desc_div").text());
//     $("#modal-notification_issue_desc").modal();
// }

// function fn_notification_issue_desc_modify()
// {
//     if( $("#issue_desc").val() == "" )
//     {
//         alert("이슈 설명을 입력해주세요.");
//         return;
//     }

//     $.ajax({
//         url : '/analysis/issue_desc',
//         type : 'post',
//         data : {
//             'id' : issue_id,
//             'desc' : $("#issue_desc").val()
//         },
//         success:function(data)
//         {
//             if(data == '200'){
//                 alert("수정되었습니다.");

//                 $("#issue_desc_div").text($("#issue_desc").val())
//                 $('#modal-notification_issue_desc').modal('hide');
                
//                 return;

//             }else{
//                 alert("수정 실패.");
//                 return;
//             }
//         }
//     });
// }

