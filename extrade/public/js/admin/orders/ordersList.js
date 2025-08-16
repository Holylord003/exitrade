document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    
    //APPROVE ORDERS
    document.querySelectorAll("a#approve").forEach(i => {
        i.addEventListener("click", e => {
            const obj = {
                order_id: e.currentTarget.dataset.order_id
            }
            swal({
                title: "Are you sure?",
                text: "are you sure that the payment proof is valid?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    submit = i
                    fetchResourse(obj, document.location.href, "POST")
                }
            })

            
            
        })
    });


    //DELETE ORDERS
    document.querySelectorAll("a#delete").forEach(i => {
        i.addEventListener("click", e => {
            const id = e.currentTarget.dataset.order_id;
            
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it again",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    submit = i
                    fetchResourse({}, `${document.location.href}?id=${id}`, "DELETE")
                }
            })

            
            
        })
    })


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