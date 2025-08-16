document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    //FIlter By Status
    document.querySelector("select#filterByStatus").addEventListener("change", e => {
        window.location.href = `/admin/members?status=${e.target.value}`
    });

    //Search By Username And Fullname
    document.querySelector("form#search").addEventListener("submit", e => {
        e.preventDefault();

        window.location.href = `/admin/members?search=${e.currentTarget.querySelector("input").value}`
    });

    //Reset
    document.querySelector("a#reset").addEventListener("click", e => {
        window.location.href = "/admin/members"
    });

    //Delete One
    document.querySelectorAll("a.delete-one").forEach(d => {
        d.addEventListener("click", e => {

            const id = e.currentTarget.dataset.id;
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
                    fetchResourse({id}, `${window.location.href}`, "DELETE")
                }
            })
            

        })
    });
    
    //Edit Member
    document.querySelectorAll("form#edit-member").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault()

            const parent = e.currentTarget.parentElement;
            
            const obj = {
                uid: e.currentTarget.dataset.id,
                username: parent.querySelector("input#username").value,
                fullname: parent.querySelector("input#fullname").value,
                email: parent.querySelector("input#email").value,
                roi_balance: parent.querySelector("input#roi_balance").value,
                referral_balance: parent.querySelector("input#referral_balance").value,
                role: parent.querySelector("select#role").value,
            };

            submit = parent.querySelector("button");
            fetchResourse(obj, `${window.location.href}`, "PUT")
            

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