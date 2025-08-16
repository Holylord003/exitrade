document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    

    //Delete
    document.querySelectorAll("a.delete-one").forEach(btn => {
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
                    }).then(()=>window.location.href = window.location.origin + window.location.pathname)
                        } else {
                            loadingState(submit,false)
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