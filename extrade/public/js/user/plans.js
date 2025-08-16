document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    document.querySelectorAll("form.plans-form").forEach(pl => {
        pl.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                order_plan_id: e.currentTarget.dataset.plan,
                coupon: e.currentTarget.querySelector("input#coupon").value
            };


            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,window.location.href,"POST")

        })
    })




    function fetchResourse(body, url, method) {
        loadingState(submit,true)
        fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    headers:{"content-type":"application/json"},
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(res => {
                        loadingState(submit,false)
                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    }).then(()=>window.location.href = "/dashboard")
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

    function loadingState(element, state) {
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