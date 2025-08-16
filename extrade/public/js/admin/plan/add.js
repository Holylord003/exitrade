document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    document.querySelector("form#add").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            plan_name: e.currentTarget.querySelector("input#name").value,
            plan_price: e.currentTarget.querySelector("input#price").value,
            plan_duration: e.currentTarget.querySelector("input#duration").value,
            plan_withdrawal_segment: e.currentTarget.querySelector("input#withdrawal").value,
            plan_referral: e.currentTarget.querySelector("input#referral").value,
            plan_roi: e.currentTarget.querySelector("input#roi").value,
            plan_status: document.querySelector("input#visibile_check").checked ? 1 : 0

        };

        
        submit = e.currentTarget.querySelector("button")
        fetchResourse(obj,document.location.href,"POST")

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