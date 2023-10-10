javascript: (
    function main() {
        let message = `
            [らくらく残業時間確認くん]
            OKを押すと実行するよ
            機能だよ
                実行すると退社の右に残業時間の項目を追加するよ
                トータルの残業時間はカラム名に表示するよ
            ※ページリロードすれば元に戻るよ
        `

        if (confirm(message) == false) {
            alert("また遊んでね");
            return 'cancel'
        }

        function fill0(number) {
            return number < 10 ? "0" + number : number.toString();
        }

        function timeToMinutes(time) {
            const parts = time.split(':');
            if (parts.length === 2) {
                const hours = parseInt(parts[0]);
                const minutes = parseInt(parts[1]);
                if (!isNaN(hours) && !isNaN(minutes)) {
                    return hours * 60 + minutes;
                }
            }
            return 'input error';
        }

        function minutesToTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
        }

        let total_over_time = 0;
        let total_shortage_time = 0;
        const now_date = new Date();
        const now_year = now_date.getFullYear();
        let now_month = now_date.getMonth() + 1;
        // let now_month = '6' // test;

        for (let day_number = 1; day_number <= 31; day_number++) {
            try {
                let start_time_str = document.querySelector('#ttvTimeSt' + now_year + '-' + fill0(now_month) + '-' + fill0(day_number)).textContent
                let end_time_str = document.querySelector('#dateRow' + now_year + '-' + fill0(now_month) + '-' + fill0(day_number) + '> td.dval.vet.day_time0').textContent
                let day_type = document.querySelector('#dateRow' + now_year + '-' + fill0(now_month) + '-' + fill0(day_number) + '> td.dval.vstatus').getAttribute('title');
                let start_minutes = timeToMinutes(start_time_str);
                let end_minutes = timeToMinutes(end_time_str);
                let work_minutes = end_minutes - start_minutes
                if (end_time_str !== '' && day_type == '通常出勤日') {
                    if (work_minutes > 540) {
                        let over_time = minutesToTime(work_minutes - 540);
                        total_over_time += work_minutes - 540;
                        let tr_element = document.getElementById("dateRow" + now_year + '-' + fill0(now_month) + '-' + fill0(day_number));
                        if (tr_element) {
                            let tr_element_child = tr_element.querySelector(".vtelework");
                            if (tr_element_child) {
                                tr_element_child.textContent = '+' + over_time;
                            } else {
                                console.log('day' + day_number + '[error] not found vtelework element');
                            }
                        } else {
                            console.log('day' + day_number + '[error] not found tr element');
                        }
                        console.log('day' + day_number + '[success] +' + over_time);
                    } else if (work_minutes < 540) {
                        let shortage_time = minutesToTime(540 - work_minutes)
                        total_shortage_time += 540 - work_minutes;
                        let tr_element = document.getElementById("dateRow" + now_year + '-' + fill0(now_month) + '-' + fill0(day_number));
                        if (tr_element) {
                            let tr_element_child = tr_element.querySelector(".vtelework");
                            if (tr_element_child) {
                                tr_element_child.textContent = '-' + shortage_time;
                            } else {
                                console.log('day' + day_number + '[error] not found vtelework element');
                            }
                        } else {
                            console.log('day' + day_number + '[error] not found tr element');
                        }
                    }
                } else if (end_time_str == '') {
                    console.log('day' + day_number + '[error]not found end time')
                } else if (end_time_str !== '' && day_type !== '通常出勤日') {
                    if (work_minutes > 300) {
                        if (work_minutes > 540) {
                            let over_time = minutesToTime(work_minutes - 540);
                            total_over_time += work_minutes - 540;
                            let tr_element = document.getElementById("dateRow" + now_year + '-' + fill0(now_month) + '-' + fill0(day_number));
                            if (tr_element) {
                                let tr_element_child = tr_element.querySelector(".vtelework");
                                if (tr_element_child) {
                                    tr_element_child.textContent = '+' + over_time;
                                } else {
                                    console.log('day' + day_number + '[error] not found vtelework element');
                                }
                            } else {
                                console.log('day' + day_number + '[error] not found tr element');
                            }
                            console.log('day' + day_number + '[success]' + minutesToTime(work_minutes));
                        } else if (work_minutes < 540) {
                            let shortage_time = minutesToTime(540 - work_minutes)
                            total_shortage_time += 540 - work_minutes;
                            let tr_element = document.getElementById("dateRow" + now_year + '-' + fill0(now_month) + '-' + fill0(day_number));
                            if (tr_element) {
                                let tr_element_child = tr_element.querySelector(".vtelework");
                                if (tr_element_child) {
                                    tr_element_child.textContent = '-' + shortage_time;
                                } else {
                                    console.log('day' + day_number + '[error] not found vtelework element');
                                }
                            } else {
                                console.log('day' + day_number + '[error] not found tr element');
                            }
                        }
                    } else if (work_minutes < 300) {
                        let tr_element = document.getElementById("dateRow" + now_year + '-' + fill0(now_month) + '-' + fill0(day_number));
                        if (tr_element) {
                            let tr_element_child = tr_element.querySelector(".vtelework");
                            if (tr_element_child) {
                                tr_element_child.textContent = '+' + over_time;
                            } else {
                                console.log('day' + day_number + '[error] not found vtelework element');
                            }
                        } else {
                            console.log('day' + day_number + '[error] not found tr element');
                        }
                        console.log('day' + day_number + '[success] holiday work' + minutesToTime(work_minutes))
                    }
                }
            } catch (error) {
                console.log('day' + day_number + '[error]internal error');
            }

            let delete_style_element = document.getElementById("mainTable");
            if (delete_style_element) {
                let delete_style_element_child = delete_style_element.querySelectorAll('[style*="display: none;"]');
                delete_style_element_child.forEach(function (child) {
                    child.style.display = "";
                });
            } else {
                console.log("[error]not found maintable element");
            }
        }
        try {
            document.querySelector('#teleworkColumn').style.whiteSpace = "pre-line";
        } catch (error) {
            console.log('[error] not found teleworkcolumn')
        }

        try {
            if (total_over_time > total_shortage_time) {
                document.querySelector('#teleworkColumn').textContent = '残業時間\n+' + minutesToTime(total_over_time - total_shortage_time);
                alert("できたよ\n残業時間:+" + minutesToTime(total_over_time - total_shortage_time));
            } else if (total_over_time < total_shortage_time) {
                document.querySelector('#teleworkColumn').textContent = '残業時間\n-' + minutesToTime(total_shortage_time - total_over_time);
                alert("できたよ\n残業時間:-" + minutesToTime(total_shortage_time - total_over_time));
            }
        } catch (error) {
            console.log('[error]not found teleworkcolumn')
        }
    }
)();