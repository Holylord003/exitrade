document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText,oldRefText = document.querySelector("span.upline").textContent,oldRefPH = "Who Refer You? (Optional)";

    //Date
    document.querySelector("span.date").textContent = new Date().getFullYear();

    //Form
    document.querySelector("form#regform").addEventListener("submit", e => {
        e.preventDefault();

        const password2 = e.currentTarget.querySelector("input#password2").value;

        const obj = {
            fullname: e.currentTarget.querySelector("input#fullname").value,
            username: e.currentTarget.querySelector("input#username").value,
            email: e.currentTarget.querySelector("input#email").value,
            password: e.currentTarget.querySelector("input#password").value,
            upline: e.currentTarget.querySelector("input#upline").value
        }

        //Confirm Password
        if (obj.password !== password2) {
            return swal({
                title: "Password Not Matched",
                icon: "error"
            })
        }


        submit = e.currentTarget.querySelector("button[type='submit']");
        fetchResourse(obj, window.location.href, "POST")


    });


    //Upline
    document.querySelector("input#upline").addEventListener("change", e => {
        let target = e.currentTarget;
        if (!e.currentTarget.value) {
            target.classList.remove("success")
            target.classList.remove("error");
            document.querySelector("span.upline").textContent = oldRefText;
            return
        }

        fetch(`${window.location.origin + window.location.pathname}?username=${e.currentTarget.value}`, {
            method: "PUT",
            credentials: "include",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res =>{
            if (res.status) {
                document.querySelector("span.upline").textContent = res.username;
                target.classList.remove("error")
                target.classList.add("success")
            } else {
                document.querySelector("span.upline").textContent = oldRefText;

                target.classList.remove("success")
                target.classList.add("error")
            
            }
        })
        .catch(err => console.log(err))
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
                        loadingState(submit, false);
                        let goto = res.goto;

                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    }).then(res => window.location.href = goto)
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