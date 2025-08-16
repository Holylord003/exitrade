document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    document.querySelectorAll("form#edit-package").forEach(i => {
       i.addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            plan_name: e.currentTarget.parentElement.querySelector("input#name").value,
            plan_price: e.currentTarget.parentElement.querySelector("input#price").value,
            plan_duration: e.currentTarget.parentElement.querySelector("input#duration").value,
            plan_withdrawal_segment: e.currentTarget.parentElement.querySelector("input#withdrawal").value,
            plan_referral: e.currentTarget.parentElement.querySelector("input#referral").value,
            plan_roi: e.currentTarget.parentElement.querySelector("input#roi").value,
            plan_status: e.currentTarget.parentElement.querySelector("input[type=checkbox]").checked ? 1 : 0

        };
        const id = e.currentTarget.dataset.id
        submit = e.currentTarget.parentElement.querySelector("button")
        fetchResourse(obj,document.location.href + "?id=" + id,"PUT")
        

    }) 
    })

    
    //Delete
    document.querySelectorAll("a.delete-package").forEach(btn => {
        btn.addEventListener("click", (e) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover it again!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    submit = btn
                    const obj = {
                        id: btn.dataset.id
                    }
                    fetchResourse(obj, document.location.href, "DELETE")
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