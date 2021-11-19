function project_select_change(thi)
{

    if( $(thi).val() == '' ) return;

    $.ajax({
        url : '/topic/theme',
        type : 'get',
        datatype : JSON,
        data : {
            'id' : $(thi).val()
        },
        success:function(data)
        {
            $('#theme_id').children().remove();
            var row = '<option>선택</option>';
            $.each(data.list , function (index, item){
                console.log(item);
                row += '<option value="'+item.theme_id+'">'+item.subject+'</option>';
            });
            $('#theme_id').append(row);
            return;
        }
    });

}

function favorites_add(archive_seq)
{
    $.ajax({
        url : '/archive/favorites_add',
        type : 'post',
        data : {
            'seq' : archive_seq
        },
        success:function(data)
        {
            if(data == 200){
                $("#favorites_add" + archive_seq).hide();
                $("#favorites_del" + archive_seq).show();
            }
        }
    });
}


function favorites_del(archive_seq)
{
    $.ajax({
        url : '/archive/favorites_del',
        type : 'post',
        data : {
            'seq' : archive_seq
        },
        success:function(data)
        {
            if(data == 200){
                $("#favorites_add" + archive_seq).show();
                $("#favorites_del" + archive_seq).hide();
            }
        }
    });
}

function string_more(archive_seq)
{
    $.ajax({
        url : '/archive/archive_text',
        type : 'post',
        data : {
            'seq' : archive_seq
        },
        success:function(data)
        {
            if(data != 400){
                data = data.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $("#archive_desc"+archive_seq).text("");
                $("#archive_desc"+archive_seq).html(data);
            }
        }
    });
}

function get_short_url(thi, num)
{

    if( $("#url"+num).val() == "" )
    {
        alert("url을 입력해주세요.");
        return;
    }
    console.log($("#url"+num).val());

    $.ajax({
        url : '/archive/short_url',
        type : 'post',
        data : {
            'url' : $("#url"+num).val()
        },
        success:function(data)
        {
            if( data != 'Error' )
            {
                $("#url"+num).val(data);
                $(thi).attr('disabled', true);
            }
            else
            {
                alert('Error 발생');
            }
        }
    });

}


function project_del(id)
{

    if(!confirm('프로젝트를 삭제하면 관련 테마, 이슈가 모두 지워집니다.')){
        return;
    }

    if(!confirm('이 프로젝트의 테마, 이슈를 완전히 삭제합니다')){
        return;
    }

    $.ajax({
        url : '/analysis/project_delete',
        type : 'post',
        data : {
            'id' : id,
        },
        success:function(data)
        {
            if(data == '200'){
                alert("삭제되었습니다.");
                $("#project_div_box"+id).remove();
                return;
            }else{
                alert("삭제 실패.");
                return;
            }
        }
    });

}


function theme_del(id)
{

    if(!confirm('이 테마와 연결된 이슈와의 연결이 끊어집니다.')){
        return;
    }

    $.ajax({
        url : '/analysis/theme_delete',
        type : 'post',
        data : {
            'id' : id,
        },
        success:function(data)
        {
            if(data == '200'){
                alert("삭제되었습니다.");
                $("#theme_div_box"+id).remove();
                $(".theme_chk").prop('checked', false);
                return;
            }else if(data == '400'){
                alert("이슈가 포함된 테마는 삭제 할 수 없습니다.");
                return;
            }else{
                alert("수정 실패.");
                return;
            }
        }
    });
}

function get_theme_select(thi)
{
    $.ajax({
        url : '/analysis/theme',
        type : 'get',
        datatype : JSON,
        data : {
            'id' : $(thi).val(),
        },
        success:function(data)
        {
            if(data.code == '200'){

                $('#theme').children().remove();
                $('#theme').append('<option value="">선택</option>');

                data.project_list.forEach(function(item, index, arr2) { 
                    html = '<option value="'+item.id+'">'+item.subject+'</option>';
            
                    $('#theme').append(html);
                });
                return;

            }else{
                alert("Error!!");
                return;
            }
        }
    });
}


function issue_confirm(thi, seq, ok)
{

    if( ok == 1 ){
        if(!confirm("승인하시겠습니까?")){
            return;
        }else{
            var msg_text = '승인되었습니다.';
            var btn_text = '승인';
        }
    }else{
        if(!confirm("승인취소 하시겠습니까?")){
            return;
        }else{
            var msg_text = '승인취소 되었습니다.';
            var btn_text = '준비중';
        }
    }

    $.ajax({
        url : '/analysis/issue_confirm',
        type : 'get',
        data : {
            'id' : seq,
            'ok' : ok,
        },
        success:function(data)
        {
            if(data == '200'){
                alert(msg_text);
                
                if( ok == 1 ){
                    $(".btn_ok"+seq).hide();
                    $(".btn_no"+seq).show();
                }else{
                    $(".btn_ok"+seq).show();
                    $(".btn_no"+seq).hide();
                }
                return;

            }else{
                alert("Error!!");
                return;
            }
        }
    });
}


function roadmap_choice(name)
{
    $('#roadmap_layers').val(name);
    $('#search_list').html('').hide(); 
}


function keyword_type_update(mode, thi)
{

    if($(thi).is(":checked")){
        var val = 2;
    }else{
        var val = 1;
    }

    $.ajax({
        url : '/keyword/type',
        type : 'post',
        data : {
            'seq' : $(thi).val(),
            'mode': mode,
            'value': val
        },
        success:function(data)
        {
            if(data == 'ERROR'){
                alert("Error");
                location.href = "/keyword";
                return;
            }
        }
    });
}

function keyword_date_select(thi)
{

    if( $(thi).val() != "6" )
    {
        $.ajax({
            url : '/keyword/get_chart',
            type : 'POST',
            datatype : 'json',
            data : {
                'keyword_value': $("#keyword_value").val(),
                'select_date': $("#select_date").val(),
                'keyword_date_radio': $(':radio[name="keyword_date_radio"]:checked').val(),
                'keyword_start_date': $("#keyword_start_date").val(),
                'keyword_end_date': $("#keyword_end_date").val(),
                'keyword_select_year': $("#keyword_select_year").val(),
            },
            beforeSend: function() {
                $.blockUI(blockUI_config);
            },
            success:function(data) {
                var data_value = [];
                var data_value2 = [];
                var i = 0;
                var total_value = [];
                data.chart_area_list.forEach(function(item, index, arr2) { 
                    var j = 0;
                    data_value2 = [];
                    item.forEach(function(item2, index, arr2) {                    
                        if( i > 0 && j > 0 ){
                            data_value2[j] = Number(item2);
                        }else{
                            data_value2[j] = item2;
                        }
                        j++;
                    });
                    data_value[i] = data_value2;
                    i++;
                });
                area_data = data_value;
                var chart_data = google.visualization.arrayToDataTable(data_value);
    
                var options = {
                    title: '',
                    hAxis: {title: '',  titleTextStyle: {color: '#333'}},
                    vAxis: {minValue: 0}
                };
    
                var chart1 = new google.visualization.AreaChart(document.getElementById('roadmap_tree_myChart'));
                chart1.draw(chart_data, options);
                chart1_selection = chart1;
                chart1_data = chart_data;
                google.visualization.events.addListener(chart1, 'select', selectHandler);
                
                i = 1;
                data_value = [];
                data_value[0] = ['Task', 'Hours per Day'];
                data.total_list.forEach(function(item, index, arr2) { 
                    data_value[i] = [item.name, item.value];
                    i++;
                });
                
                var chart_data = google.visualization.arrayToDataTable(data_value);
    
                var options = {
                    title: ''
                };
    
                var chart = new google.visualization.PieChart(document.getElementById('roadmap_pie_myChart'));
    
                chart.draw(chart_data, options);
    
            },
            complete: function() {
                $.unblockUI();
                // $(".keyword_btn"+$(thi).data('value')).attr("onclick", "");
                // $(".keyword_btn"+$(thi).data('value')).attr("onclick", "keyword_chart_remove(this)");
                // $(".keyword_btn"+$(thi).data('value')).removeClass('btn-outline-primary').addClass('btn-primary');
                // $(".keyword_personal_btn"+$(thi).data('value')).attr("onclick", "");
                // $(".keyword_personal_btn"+$(thi).data('value')).attr("onclick", "keyword_chart_remove(this)");
                // $(".keyword_personal_btn"+$(thi).data('value')).removeClass('btn-outline-warning').addClass('btn-warning');
            }
        });
    }
    else
    {
        $("#modal-keyword-date").modal('show');
    }

}

function fn_keyword_date_search()
{

    $.ajax({
        url : '/keyword/get_chart',
        type : 'POST',
        datatype : 'json',
        data : {
            'keyword_value': $("#keyword_value").val(),
            'select_date': $("#select_date").val(),
            'keyword_date_radio': $(':radio[name="keyword_date_radio"]:checked').val(),
            'keyword_start_date': $("#keyword_start_date").val(),
            'keyword_end_date': $("#keyword_end_date").val(),
            'keyword_select_year': $("#keyword_select_year").val(),
        },
        beforeSend: function() {
            $.blockUI(blockUI_config);
        },
        success:function(data) {
            var data_value = [];
            var data_value2 = [];
            var i = 0;
            var total_value = [];
            data.chart_area_list.forEach(function(item, index, arr2) { 
                var j = 0;
                data_value2 = [];
                item.forEach(function(item2, index, arr2) {                    
                    if( i > 0 && j > 0 ){
                        data_value2[j] = Number(item2);
                    }else{
                        data_value2[j] = item2;
                    }
                    j++;
                });
                data_value[i] = data_value2;
                i++;
            });

            var chart_data = google.visualization.arrayToDataTable(data_value);

            var options = {
                title: '',
                hAxis: {title: '',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0}
            };

            var chart = new google.visualization.AreaChart(document.getElementById('roadmap_tree_myChart'));
            chart.draw(chart_data, options);

            
            i = 1;
            data_value = [];
            data_value[0] = ['Task', 'Hours per Day'];
            data.total_list.forEach(function(item, index, arr2) { 
                data_value[i] = [item.name, item.value];
                i++;
            });
            
            var chart_data = google.visualization.arrayToDataTable(data_value);

            var options = {
                title: ''
            };

            var chart = new google.visualization.PieChart(document.getElementById('roadmap_pie_myChart'));

            chart.draw(chart_data, options);

        },
        complete: function() {
            $("#modal-keyword-date").modal('hide');
            $.unblockUI();
            // $(".keyword_btn"+$(thi).data('value')).attr("onclick", "");
            // $(".keyword_btn"+$(thi).data('value')).attr("onclick", "keyword_chart_remove(this)");
            // $(".keyword_btn"+$(thi).data('value')).removeClass('btn-outline-primary').addClass('btn-primary');
            // $(".keyword_personal_btn"+$(thi).data('value')).attr("onclick", "");
            // $(".keyword_personal_btn"+$(thi).data('value')).attr("onclick", "keyword_chart_remove(this)");
            // $(".keyword_personal_btn"+$(thi).data('value')).removeClass('btn-outline-warning').addClass('btn-warning');
        }
    });

}

function mind_preview()
{

    if( $('input:checkbox[name="type1_chk[]"]:checked').length < 2 )
    {
        alert("외향 / 내향 항목을 2개 이상 선택해주세요.");
        return;
    }    

    if( $('input:checkbox[name="type2_chk[]"]:checked').length < 2 )
    {
        alert("이성 / 내성 항목을 2개 이상 선택해주세요.");
        return;
    }    

    if( $("#absolute1_value").val() == '' )
    {
        alert('값을 입력해주세요');
        $("#absolute1_value").focus();
        return;
    }
    if( $("#relativity1_value").val() == '' )
    {
        alert('값을 입력해주세요');
        $("#relativity1_value").focus();
        return;
    }
    if( $("#absolute2_value").val() == '' )
    {
        alert('값을 입력해주세요');
        $("#absolute2_value").focus();
        return;
    }
    if( $("#relativity2_value").val() == '' )
    {
        alert('값을 입력해주세요');
        $("#relativity2_value").focus();
        return;
    }

    var type1_chk = '';
    $('input:checkbox[name="type1_chk[]"]').each(function(index) {

        if(this.checked){//checked 처리된 항목의 값
            if( type1_chk == "" )
                type1_chk = this.value;
            else
                type1_chk += "," + this.value;
        }  
    });

    var type2_chk = '';
    $('input:checkbox[name="type2_chk[]"]').each(function(index) {

        if(this.checked){//checked 처리된 항목의 값
            if( type2_chk == "" )
                type2_chk = this.value;
            else
                type2_chk += "," + this.value;
        }  
    });

    $.ajax({
        url : '/mind/modify_preview',
        type : 'post',
        data : {
            'id' : $("#mind_val").val(),
            'type1_chk': type1_chk,
            'type2_chk': type2_chk,
            'absolute1_value': $("#absolute1_value").val(),
            'absolute2_value': $("#absolute2_value").val(),
            'relativity1_value': $("#relativity1_value").val(),
            'relativity2_value': $("#relativity2_value").val(),
            'absolute1': $("#absolute1").val(),
            'absolute2': $("#absolute1").val(),
            'relativity1': $("#relativity1").val(),
            'relativity2': $("#relativity2").val()
        },
        datatype : 'json',
        beforeSend: function() {
            $.blockUI(blockUI_config);
        },
        success:function(json_data)
        {
            if(json_data.result != 'SUCCESS'){
                alert("Error");
                location.href = location.href;
                return;
            }else{

                const labels = [ json_data.label[0], json_data.label[1], json_data.label[2], json_data.label[3], json_data.label[4],
                                json_data.label[5], json_data.label[6], json_data.label[7], json_data.label[8], json_data.label[9], ];
                const data1 = {
                    labels: labels,
                    datasets: [{
                        label: '소비자 유형별 수 (절대기준)',
                        data: [json_data.absolute[0], json_data.absolute[1], json_data.absolute[2], json_data.absolute[3], json_data.absolute[4], json_data.absolute[5], 
                                json_data.absolute[6], json_data.absolute[7], json_data.absolute[8], json_data.absolute[9]],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(97, 102, 255, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(103, 52, 155, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)',
                            'rgba(30, 253, 257, 0.2)'
                            ],
                        borderColor: [
                            'rgba(255, 99, 132)',
                            'rgba(255, 159, 64)',
                            'rgba(255, 205, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(97, 102, 255)',
                            'rgba(54, 162, 235)',
                            'rgba(103, 52, 155)',
                            'rgba(153, 102, 255)',
                            'rgba(201, 203, 207)',
                            'rgba(30, 253, 257)'
                        ],
                        borderWidth: 1
                    }]
                };

                const config1 = {
                    type: 'bar',
                    data: data1,
                    options: {
                      scales: {
                        y: {
                          beginAtZero: false
                        }
                      }
                    },
                };

                var myChart1 = new Chart(
                    document.getElementById('myChart1'),
                    config1
                );

                const data2 = {
                    labels: labels,
                    datasets: [{
                        label: '소비자 유형별 수 (상대기준)',
                        data: [json_data.relativity[0], json_data.relativity[1], json_data.relativity[2], json_data.relativity[3], json_data.relativity[4], json_data.relativity[5], 
                                json_data.relativity[6], json_data.relativity[7], json_data.relativity[8], json_data.relativity[9]],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(97, 102, 255, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(103, 52, 155, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)',
                            'rgba(30, 253, 257, 0.2)'
                            ],
                        borderColor: [
                            'rgba(255, 99, 132)',
                            'rgba(255, 159, 64)',
                            'rgba(255, 205, 86)',
                            'rgba(75, 192, 192)',
                            'rgba(97, 102, 255)',
                            'rgba(54, 162, 235)',
                            'rgba(103, 52, 155)',
                            'rgba(153, 102, 255)',
                            'rgba(201, 203, 207)',
                            'rgba(30, 253, 257)'
                        ],
                        borderWidth: 1
                    }]
                };

                const config2 = {
                    type: 'bar',
                    data: data2,
                    options: {
                      scales: {
                        y: {
                          beginAtZero: false
                        }
                      }
                    },
                };

                var myChart2 = new Chart(
                    document.getElementById('myChart2'),
                    config2
                );

            }
        },
        complete: function() {
            setTimeout(function() {
                $.unblockUI();
            }, 1500);
        }
    });

}

$(function(){

    $('#roadmap_layers')
    .keyup(function(e) {
        var keyword = $('#roadmap_layers').val();
        $.ajax({
            url: '/roadmap/get_roadmap',
            type: 'post',
            data: {
                'keyword' : $("#roadmap_layers").val(),
            },
            async: false,
            cache: false,
            datatype: JSON,
            success: function(data) {
                if(data.result == 200){
                    var table = '<table class="table table-bordered v_a_m" style="background-color:white;">';
                    table += '<tbody>';
                    $.each(data.list , function (index, item){
                        table += '<tr class="item_tr" onclick="roadmap_choice(\''+item.roadmap_layers+'\')">';
                        table += '  <td class="text-left">';
                        table += '      <span>'+item.roadmap_layers+'</span>';
                        table += '  </td>';
                        table += '</tr>';
                    });
                    table += '</tbody></table>';
                    
                    var w = $('#roadmap_layers').outerWidth();
                    $('#search_list').html(table).css('width', w).show();

                }else{
                    $('#search_list').html('해당된 로드맵이 없습니다.').show();  
                }
            }                                   
        });
    })
    .focus(function(e) {
        var keyword = $('#roadmap_layers').val();
        $.ajax({
            url: '/roadmap/get_roadmap',
            type: 'post',
            data: {
                'keyword' : $("#roadmap_layers").val(),
            },
            async: false,
            cache: false,
            datatype: JSON,
            success: function(data) {
                if(data.result == 200){
                    var table = '<table class="table table-bordered v_a_m" style="background-color:white;">';
                    table += '<tbody>';
                    $.each(data.list , function (index, item){
                        table += '<tr class="item_tr" onclick="roadmap_choice(\''+item.roadmap_layers+'\')">';
                        table += '  <td class="text-left">';
                        table += '      <span>'+item.roadmap_layers+'</span>';
                        table += '  </td>';
                        table += '</tr>';
                    });
                    table += '</tbody></table>';
                    
                    var w = $('#roadmap_layers').outerWidth();
                    $('#search_list').html(table).css('width', w).show();

                }else{
                    $('#search_list').html('해당된 로드맵이 없습니다.').show();   
                }
            }                                  
        });
    })
    .focusout(function() {
        setTimeout(function() {
            $('#search_list').html('').hide(); 
        }, 1000);
    });


    
});
