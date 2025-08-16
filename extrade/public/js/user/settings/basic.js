document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    //Basic Settings
    document.querySelector("form#basic").addEventListener
        ("submit", e => {
        e.preventDefault();
        const obj = {
            fullname: e.currentTarget.querySelector("input#fullname").value,
            email: e.currentTarget.querySelector("input#email").value
        };
        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj,window.location.href,"PUT")
    });
    
    //Password Settings
    document.querySelector("form#password").addEventListener
        ("submit", e => {
        e.preventDefault();
        const obj = {
            oldPassword: e.currentTarget.querySelector("input#oldPassword").value,
            password: e.currentTarget.querySelector("input#password").value,
            password2: e.currentTarget.querySelector("input#password2").value,
        };
        
        //Crosschecking
        if(obj.password !== obj.password2){
            return swal({
                title: "New Password Not Matched",
                icon: "error"
            })
        }
        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj,window.location.href,"PUT")
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
            element.innerHTML = `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
    }

})