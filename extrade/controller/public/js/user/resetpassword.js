document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    //Date
    document.querySelector("span.date").textContent = new Date().getFullYear();

    //Form
    try {
        document.querySelector("form#step1").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            credentials: e.currentTarget.querySelector("input#credentials").value
        }


        submit = e.currentTarget.querySelector("button.btn.btn-primary.btn-block.btn-md");
        fetchResourse(obj, window.location.href, "POST")


    });
    } catch (error) {
        
    }
    
    //Form
    try {
        document.querySelector("form#step2").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            password: e.currentTarget.querySelector("input#password").value
        }

        const password2 = e.currentTarget.querySelector("input#password2").value


        //Confirm Password
        if (obj.password !== password2) {
            return swal({
                title: "Password Not Matched",
                icon: "error"
            })
        }

        submit = e.currentTarget.querySelector("button.btn.btn-primary.btn-block.btn-md");
        fetchResourse(obj, window.location.href, "PUT")


    });
    } catch (error) {
        
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
                        loadingState(submit, false);
                        let goto = res.goto;

                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                            }).then(res => {
                                if (goto) {
                            window.location.href = goto
                        }
                    })
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
            element.innerHTML = `Loading...`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
    }

})