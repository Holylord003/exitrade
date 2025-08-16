document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    
    //NEW WALLET
    document.querySelector("form#new_wallet").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            number: e.currentTarget.querySelector("input#number").value,
            code: e.currentTarget.querySelector("select#bank_type").value
        };

        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj, window.location.href, "POST")
    });


    //EDIT WALLET
    document.querySelector("form#edit_wallet").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            number: e.currentTarget.querySelector("input#number").value,
            code: e.currentTarget.querySelector("select#bank_type").value
        };

        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj,window.location.href,"PUT")
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
            element.innerHTML = `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
    }
    
    
})
    



