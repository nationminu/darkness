window.addEventListener('load', () => {
    // DEFINE DATA
    // -----------------------------
    var wdata = [
        {"id":"42","parent":"","name":"여행자케어공간","value":0},
        {"id":"4248","parent":"42","name":"헬스케어","value":1},
        {"id":"4249","parent":"42","name":"기념품및면세품쇼핑","value":2},
        {"id":"4250","parent":"42","name":"수면및휴식","value":3},
        {"id":"4251","parent":"42","name":"엔터테인먼트","value":4},
        {"id":"4252","parent":"42","name":"여행정보탐색및기록","value":5},
        {"id":"4253","parent":"42","name":"사교/커뮤니티활동","value":6},
        {"id":"4255","parent":"42","name":"공항픽업및배웅","value":7},
        {"id":"4256","parent":"42","name":"웰컴서비스및관광계획리뷰","value":8},
        {"id":"4257","parent":"42","name":"식사","value":9},
        {"id":"4258","parent":"42","name":"호텔도킹및유지보수","value":10},
        {"id":"4259","parent":"42","name":"예약및결제","value":11},
        {"id":"4260","parent":"42","name":"애완동물케어","value":12},
        {"id":"425017","parent":"4250","name":"휴게소의미래","value":13},
        {"id":"425817","parent":"4258","name":"휴게소의미래","value":14},
        {"id":"426017","parent":"4260","name":"휴게소의미래","value":15},
        {"id":"424915","parent":"4249","name":"언택트쇼핑커브사이드픽업","value":16},
        {"id":"424814","parent":"4248","name":"여행중식사데이터분석","value":17},
        {"id":"425714","parent":"4257","name":"여행중식사데이터분석","value":18},
        {"id":"425914","parent":"4259","name":"여행중식사데이터분석","value":19},
        {"id":"425113","parent":"4251","name":"XR여행콘텐츠","value":20},
        {"id":"425213","parent":"4252","name":"XR여행콘텐츠","value":21},
        {"id":"425112","parent":"4251","name":"여행중비대면가상모임","value":22},
        {"id":"425312","parent":"4253","name":"여행중비대면가상모임","value":23},
        {"id":"425211","parent":"4252","name":"빅데이터활용큐레이션관광","value":24},
        {"id":"425910","parent":"4259","name":"툰베리","value":25},
        {"id":"425710","parent":"4257","name":"툰베리","value":27},
        {"id":"424810","parent":"4248","name":"툰베리","value":26}
    ];
   
    // CHART CONFIG
    // -----------------------------
    var cdata = {
      type: 'tree',
      options: {
        aspect: 'tree-radial',
        progression: 0,
        textAttr: 'name',
        valueAttr: 'value',
        minSize: 4,
        maxSize: 10,
        link: {
          aspect: 'arc'
        },
        node: {
          type: 'circle',
          borderWidth: 0,
          hoverState: {
            borderWidth: 2,
            borderColor: '#000',
            borderAlpha: 1
          },
          label: {
            width: 100
          }
        },
        weightedLinks: 0, // set to 1 to disable collapsible nodes
      },
      series: wdata
    };
   
    // RENDER CHARTS
    // -----------------------------
    zingchart.render({
      id: 'tree_myChart',
      height: '100%',
      output: 'svg', // or 'canvas'
      data: cdata
    });
   
});

