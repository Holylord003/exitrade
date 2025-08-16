
document.addEventListener("DOMContentLoaded", () => {

    let submit, cbText;

    //Filter By Amount
    try {
        document.querySelector("select.custom-select.custom-select-sm.form-control.form-control-sm").addEventListener("change", (e) => {
        window.location.href = `/admin/coupon?amount=${e.target.value}`
    })

    document.querySelector("form.search-coupon").addEventListener("submit", e => {
        e.preventDefault();
        window.location.href = `/admin/coupon?search=${e.currentTarget.querySelector("input").value}`
    });

    document.querySelector("a.reset").addEventListener("click", e => {
        window.location.href = `/admin/coupon`
    });
    } catch (error) {
        console.warn(error)
    }


    try {
        //Delete All
    document.querySelector("a.delete-all").addEventListener("click", e => {
        let obj = {
            type: "all"
        }
        swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover the coupon(s)!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
        }).then(wilDelete => {
            if (wilDelete) {
                
                submit = e.target
                fetchResourse(obj,"/admin/coupon/delete","DELETE")
            }
         })
                
        
    });
    } catch (error) {
        console.warn(error)
    }


    try {
        //Delete One
    document.querySelectorAll("a.delete-one").forEach(btn => {
        btn.addEventListener("click", e => {
            let obj = {
                type: "one",
                couponID: e.currentTarget.dataset.id
            }
           

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this coupon!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    submit = btn
                    fetchResourse(obj,"/admin/coupon/delete","DELETE")
                }
            })
            
            
        });
    });
    } catch (error) {
        console.log(error)
    }
    

    try {
        //Sort
    document.querySelector("select#type").addEventListener("change", e => {
        if (e.target.value !== "") {
            window.location.href = `/admin/coupon?status=${e.target.value}`
        }
    })
    } catch (error) {
       console.log(error) 
    }


    try {
        //COpy
    document.querySelectorAll("td.code").forEach(ele => {
        ele.addEventListener("click", e => {
            e.currentTarget.querySelector("input").select();
            document.execCommand("copy");
            /* const alertt = document.querySelector("#coupon-alert");
            

            setTimeout(() => {
                alertt.classList.add("show");
            }, 500)
            

            setTimeout(() => {
                alertt.classList.remove("show")
            },3000) */
        })
    })
    } catch (error) {
        console.warn(error)
    }

    
    try {
        document.querySelector("form#new_coupon").addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                quantity: e.currentTarget.querySelector("input#quantity").value,
                price: e.currentTarget.querySelector("select#price").value
            };

            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,window.location.href,"POST")
        })
    } catch (error) {
        console.log(error)
    }


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


