document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    
    try {
        //Mark One Mark All
    document.querySelector("input#head-mark").addEventListener("change", e => {
        document.querySelectorAll("input#mark").forEach(m => {
            m.checked = e.currentTarget.checked
        })
    });
    } catch (error) {
        
    }


    try {
        //Mark Request
    document.querySelector('a#pay-marked').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };

        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.withdrawal_id
                });
            }
        });

        if (!obj.data.length) {
            return
        }
        
        submit = document.querySelector("a#pay-marked")
        fetchResourse(obj,window.location.href + "/paid","POST")

    })
    } catch (error) {
        
    };
    
    //DELETE MULTIPLE
    try {
        //Mark Request
    document.querySelector('a#delete-all').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };

        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.withdrawal_id
                });
            }
        });

        if (!obj.data.length) {
            return
        }
        
        submit = document.querySelector("a#delete-all")
        fetchResourse(obj,window.location.href + "/paid","DELETE")

    })
    } catch (error) {
        
    };
    
    //EXPORT MULTIPLE
    try {
        //Mark Request
        document.querySelector('a#export-to-csv').addEventListener("click", e => {
            alert("Features Not Yet Available")
            return
        let obj = {
            data: []
        };

        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.withdrawal_id
                });
            }
        });

        
        submit = document.querySelector("a#export-to-csv");
        
        fetch(window.location.href + "/export", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(obj)
        }).then(res => res.blob())
            .then(res => {
            var a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.setAttribute("download", `payroll-${new Date().toDateString()}.csv`);
        a.click();
        a.remove()
        })
        

        

    })
    } catch (error) {
        
    };

    
    //Paid Withdrawal
    document.querySelectorAll("a#paid").forEach(i => {
        i.addEventListener("click", e => {
            const obj = {
                userId: e.currentTarget.dataset.user_id,
                withdrawalId: e.currentTarget.dataset.withdrawal_id,
                amount: e.currentTarget.dataset.amount
            };

            submit = e.currentTarget;
            fetchResourse(obj,window.location.href + "/paid","POST")
        })
    });

    //DELETE Withdrawal
    document.querySelectorAll("a#delete").forEach(i => {
        i.addEventListener("click", e => {

            const id = e.currentTarget.dataset.withdrawal_id;
            const btn = e.currentTarget;

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it again!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {

                    submit = btn;
                    fetchResourse({},`${window.location.href}/paid?id=${id}` ,"DELETE")
                }
            })


            
            
        })
    });



    function fetchResourse(body, url, method) {
        loadingState(submit,true)
        fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(res => {
                        loadingState(submit,false)
                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    }).then(()=>window.location.reload())
                        } else {
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                        loadingState(submit,false)
                    swal({
                            title: err.message,
                            icon:"error"
                    })
                    })
    }

    function loadingState(element,state) {
        if (state) {
            cbText = element.textContent;
            element.innerHTML = `<span class="dashboard-spinner spinner-warning spinner-xs"></span>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
    }

})