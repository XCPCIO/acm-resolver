/**
 *  main.js
 */

// Vuejs
function vuejs() {
      
    var RANKS_KEY = 'icpc-ranks';
    var OPER_FLAG_KEY = 'operation-flag';

    var FLAHING_TIME = 100; // 闪烁时间
    var ROLLING_TIME = 600; // 排名上升时间

    window.Storage = {
        fetch: function(type) {
            if(type == 'ranks')
                return JSON.parse(localStorage.getItem(RANKS_KEY)) || window.resolver.rank_frozen;
            else if(type == 'opera_flag')
                return localStorage.getItem(OPER_FLAG_KEY) || 0;
        },

        update: function(type, data) {
            if(type == 'ranks')
                localStorage.setItem(RANKS_KEY, JSON.stringify(data));
            else if(type == 'opera_flag')
                localStorage.setItem(OPER_FLAG_KEY, data);
        }
    };

    window.Operation = {
        next: function() {
            vm.$data.op_status = false;
            var op = vm.$data.operations[vm.$data.op_flag];
            var op_length = vm.$data.operations.length - 1;
            
            if(vm.$data.op_flag < op_length) {
                var op_next = vm.$data.operations[vm.$data.op_flag+1];
            }

            console.log(op);

            var ranks = vm.$data.ranks;
            var rank_old = ranks[op.old_rank];

            var el_old = $('#rank-' + op.old_rank);
            var el_new = $('#rank-' + op.new_rank);

            el_old
                .find('.p-'+op.problem_index).addClass('uncover')
                .find('.p-content').addClass('uncover');
            
            if (op.new_rank == op.old_rank) {
                if (vm.$data.op_flag < op_length) {
                    var el_old_next = $('#rank-' + op_next.old_rank);
                }

                setTimeout(function() {
                    if (op.new_verdict == 'AC') {
                        rank_old.score += 1;
                        rank_old.penalty += op.new_penalty;
                        rank_old.problem[op.problem_index].old_penalty = op.new_penalty;
                    }

                    rank_old.problem[op.problem_index].old_verdict = op.new_verdict;
                    rank_old.problem[op.problem_index].new_verdict = "NA";
                    
                    //if(op.new_submissions > 0) {
                    if(op.new_verdict == 'AC'){
                        rank_old.problem[op.problem_index].old_submissions = op.new_submissions;
                        rank_old.problem[op.problem_index].frozen_submissions = 0;
                        rank_old.problem[op.problem_index].new_submissions = 0;
                    } else {
                        rank_old.problem[op.problem_index].old_submissions +=  op.frozen_submissions;
                        rank_old.problem[op.problem_index].frozen_submissions = 0;
                        rank_old.problem[op.problem_index].new_submissions = 0;
                    }

                    Vue.nextTick(function() {
                        el_old
                            .find('.p-'+op.problem_index).addClass('uncover')
                            .find('.p-content').removeClass('uncover');
                    });
                        
                    setTimeout(function() {
                        vm.selected(el_old, 'remove');
                        if(vm.$data.op_flag < op_length)
                            vm.selected(el_old_next, 'add');
                        el_old.find('.p-'+op.problem_index).removeClass('uncover');
                        // vm.scrollToTop(op.old_rank, op_next.old_rank);
                        vm.$data.op_flag += 1;
                        vm.$data.op_status = true;
                    }, FLAHING_TIME + 100);

                }, FLAHING_TIME);
            } else {
                var old_pos_top = el_old.position().top;
                var new_pos_top = el_new.position().top;
                var distance = new_pos_top - old_pos_top;
                var win_heigth = $(window).height();

                if (Math.abs(distance) > win_heigth) {
                    distance = -(win_heigth + 100);
                }
                
                var j = op.old_rank - 1;
                var el_obj = [];

                for (j; j >= op.new_rank; j--) {
                    var el = $('#rank-'+ j);
                    el.rank_obj = ranks[j];
                    el_obj.push(el);
                }

                setTimeout(function() {
                    // return function(){
                        // 修改原始数据

                        if(op.new_verdict == 'AC'){
                            rank_old.score += 1;
                            rank_old.rank_show = op.new_rank_show;
                            console.log("new_rank_show" + op.new_rank_show);
                            rank_old.penalty += op.new_penalty;
                            rank_old.problem[op.problem_index].old_penalty = op.new_penalty;
                        }

                        rank_old.problem[op.problem_index].old_verdict = op.new_verdict;
                        rank_old.problem[op.problem_index].new_verdict = "NA";
                        
                        //if(op.new_submissions > 0) {
                        if (op.new_verdict == 'AC') {
                            rank_old.problem[op.problem_index].old_submissions = op.new_submissions;
                            rank_old.problem[op.problem_index].frozen_submissions = 0;
                            rank_old.problem[op.problem_index].new_submissions = 0;
                        } else {
                            rank_old.problem[op.problem_index].old_submissions +=  op.frozen_submissions;
                            rank_old.problem[op.problem_index].frozen_submissions = 0;
                            rank_old.problem[op.problem_index].new_submissions = 0;
                            alert(rank_old.problem[op.problem_index].old_submissions);
                        }

                        Vue.nextTick(function(){
                            //添加揭晓题目闪动效果
                            el_old
                                .find('.p-'+op.problem_index).addClass('uncover')
                                .find('.p-content').removeClass('uncover');

                            //修改排名
                            el_old.find('.rank').text(op.new_rank_show);
                            el_obj.forEach(function(val,i){ 
                                var dom_rank = el_obj[i].find('.rank');
                                var dom_rank_old = el_old.find('.rank');
                                if (dom_rank.text() !== "*" && dom_rank_old.text() !== "*") {
                                    var new_rank_show = Number(dom_rank.text())+1;
                                    dom_rank.text(new_rank_show);
                                    el_obj[i].rank_obj.rank_show = new_rank_show; 
                                }
                            });
                        });

                    setTimeout(function() { 
                        el_old
                            .css('position', 'relative')
                            .animate({ top: distance+'px' }, ROLLING_TIME, function(){
                                el_new.removeAttr('style');
                                el_old.removeAttr('style');
                                var ranks_tmp = $.extend(true, [], ranks);
                                var data_old = ranks_tmp[op.old_rank];
                                var i = op.old_rank - 1;
                                for(i; i >= op.new_rank; i--){
                                    ranks_tmp[i+1] = ranks_tmp[i];
                                }
                                ranks_tmp[op.new_rank] = data_old;
                                vm.$set('ranks', ranks_tmp);
                                Vue.nextTick(function () {
                                    el_obj.forEach(function(val,i){ el_obj[i].removeAttr('style'); });
                                    el_old.find('.p-'+op.problem_index).removeClass('uncover');
                                    if(vm.$data.op_flag < op_length)
                                        var el_old_next = $('#rank-' + op_next.old_rank);
                                    vm.selected(el_old, 'remove');
                                    if(vm.$data.op_flag < op_length)
                                        vm.selected(el_old_next, 'add');
                                    // vm.scrollToTop(op.old_rank, op.new_rank);
                                    vm.$data.op_flag += 1;
                                    vm.$data.op_status = true;
                                });
                            });

                        for (var i = 0 ; i<el_obj.length ; ++i) {
                            if (106 * (i - 1) <= win_heigth) {
                                el_obj[i].animate({'top': 106+'px'}, ROLLING_TIME);
                            } else {
                                el_obj[i].css({'top': 106+'px'});
                            }
                        }
                    }, FLAHING_TIME + 100); // two loop    
                    // };
                }, FLAHING_TIME);
            }

        },

        back: function() {

        }
    };
    
    Vue.filter('toMinutes', function (value) {
        return parseInt(value/60);
    });

    Vue.filter('problemStatus', function (problem) {
        return resolver.status(problem);
    });
    
    Vue.filter('submissions', function (problem) {
        var st = resolver.status(problem);
        if(st == 'ac')
            return problem.old_submissions + '/' + parseInt(problem.old_penalty / 60);
        else if(st == 'frozen')
            return problem.old_submissions + '+' + problem.frozen_submissions;
        else if(st == 'failed')
            return problem.old_submissions;
        else 
            return String.fromCharCode("A".charCodeAt(0) + problem.problem_index);
        // TODO:
    });

    Vue.config.debug = true;

    window.vm = new Vue({
        el: '.app',

        data: {
            op_flag: Number(Storage.fetch('opera_flag')),
            op_status: true,  // running: false, stop: true
            p_count: resolver.problem_count,
            ranks: Storage.fetch('ranks'),
            //ranks: resolver.rank_frozen,
            operations: resolver.operations,
            users: resolver.users
        },

        ready: function () {
            this.$watch('ranks', function(ranks){
                Storage.update('ranks', ranks);
            }, {'deep': true});

            this.$watch('op_flag', function(op_flag){
                Storage.update('opera_flag', op_flag);
            }, {'deep': true});

            if(this.op_flag < this.operations.length){
                var op = this.operations[this.op_flag];
                this.selected($('#rank-'+op.old_rank), 'add');
            }
        },

        methods: {
            reset: function(){
                if(confirm('确定要重置排名吗？')){    
                    localStorage.clear();
                    window.location.reload();
                }
            },

            selected: function(el, type){
                if(type == 'add'){
                    el.addClass('selected');
                    // var win_heigth = $(window).height();
                    // var el_pos = el.position().top;
                    // var offset = el_pos - win_heigth + 261;
                    // window.scrollTo(0, offset);
                }else if(type == 'remove')
                    el.removeClass('selected');
            },

            // scrollToTop: function(old_rank, new_rank){
            //     var next_scrollY = -(new_rank * 75 + 52); // 75px: rank-item height; 52px: header
            //     scrollInterval = setInterval(function(){
            //         if (window.scrollY != next_scrollY) {
            //             window.scrollBy(0, -1);
            //         }
            //         else clearInterval(scrollInterval); 
            //     },30);

            // }

        }
    });
}

function clear_cache() {
    if (confirm('确定要清除缓存吗？')) { 
        localStorage.clear();
        window.location.reload();
    }
}

function main() {

    if (confirm('确定要加载数据吗？')) {
        var data = JSON.parse($('#input-data').val());
        
        $('title').text(data.contest_name)
            
        var resolver = new Resolver(data.solutions, data.users, data.problem_count, data.frozen_seconds);
        window.resolver = resolver;
        resolver.calcOperations();
        
        vuejs();
    
        // var el = $("#rank-0").position().top;
        // alert(el);
        // alert(window.scrollY);
        // alert($(document).height());
        // alert(document.body.clientHeight);
    
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            
            if (e && e.keyCode == 37 /*&& vm.$data.op_status*/) { // key left
                Operation.back();
            }

            if (e && e.keyCode == 39 && vm.$data.op_status) { // key right
                Operation.next();
            }
        };

        // $.getJSON("contest.json", function(data) {

        // });
    }
}