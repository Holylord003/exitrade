document.addEventListener("DOMContentLoaded", () => {
    let submit,cbText;
    try {
        document.querySelector("button.navbar-toggler.sidemenu").addEventListener("click", e=>{
document.querySelector(".nav-left-sidebar").classList.toggle("sidemenu-height")
})
    } catch (error) {
        console.log(error)
    };

    
    //Renew
    try {
        document.querySelector("form#renew-form").addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                coupon: e.currentTarget.querySelector("input").value
            };

            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,"/user/renew","POST")
        })
    } catch (error) {
        console.log(error)
    }

    //Upgrade
    try {
        document.querySelector("form#upgrade-form").addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                plan: e.currentTarget.querySelector("select#input-select").value,
                coupon: e.currentTarget.querySelector("input#coupon").value
            };

            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,"/user/upgrade","POST")
        })
    } catch (error) {
        console.log(error)
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