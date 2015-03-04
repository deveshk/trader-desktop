(function(){
    'use strict'
    console.log("i m directive");

    angular
        .module('dashboard')
        .directive('atBarchart', barchartDirective);

    barchartDirective.$inject = ['$window'];

    /* @ngInject */
    function barchartDirective($window) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                val: '='
            }
        };
        return directive;

        /**** changes **/



        /** end **/

        function link (scope, element, attrs) {

            //console.log(JSON.stringify(newData));
            var h = 200;
            var w = 300;
            var padding = 20;
            var barheight = 20;
            var svg = d3.select("body")
                .append("svg")
                .attr("height",h)
                .attr("width",w);
            ;
            scope.$watch('val', function (n, o) {
                console.log(n);
   /*             var scalesData = n.forEach(function(o,i) {
                    newData[i] = {
                        orderId: o.orderId,
                        total: 100,
                        placed: (o.total/ o.placed),
                        executed: (o.placed/ o.executed)
                    }

                });*/







                if (!n || typeof (n[0]) === "undefined") {
                    return;
                }
                var ids = [];
                n.forEach(function(o,i){
                    return ids.push(o.orderId);
                });
                var xScale = d3.scale.linear()
                        .domain([0,100])
                        .range([0,w-padding])
                    ;


                var xAxisGen = d3.svg.axis().scale(xScale).orient("top").ticks(3).tickSize(-h, 0, 0).tickFormat(function(d) { return parseInt(d, 10) + "%"; });

                var yAxis = svg.append("g").call(yAxisGen).attr("class","scale")
                    .attr("transform","translate("+padding+","+padding+")");

                var xAxis = svg.append("g").call(xAxisGen).attr("class","scalex")
                    .attr("transform","translate("+padding+","+padding+")")
                var yScale = d3.scale.ordinal().domain(ids)
                    .rangeRoundPoints([12,h-padding-11]);
                var yAxisGen = d3.svg.axis().scale(yScale).orient("left").tickSize(-w, 0, 0) ;
                for(var i=0; i<n.length;i++){
                    var obj = n[i];
                    var d = [obj.quantity,obj.quantityPlaced,obj.quantityExecuted];

                    makeChart(d,i);
                }


            });

            function makeChart(data,index){
                svg.append("g").selectAll("rect")
                    .data(d)
                    .enter()
                    .append("rect")
                    .attr({
                        x: function(d){
                            return padding+2;
                        },
                        y: function(d,i){
                            return yScale.range()[index]+padding/2;
                        },
                        height:function(){return barheight;},
                        width:function(d,i ) {
                            return  xScale(d);
                        }
                    })
                    .style("fill",function(d,i){
                        if(i===0)
                            return '#fff4ce';
                        else if(i===1)
                            return '#fdbd5a';
                        else
                            return '#fd8300';
                    });
            }
        }
    }

})();