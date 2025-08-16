document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    //Form
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            credentials: e.currentTarget.querySelector("input#credentials").value,
            password: e.currentTarget.querySelector("input#password").value
        }

        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj, window.location.href, "POST")


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
                        loadingState(submit, false);
                        let goto = res.goto;

                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    }).then(res => goto ? window.location.href = goto : window.location.reload())
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