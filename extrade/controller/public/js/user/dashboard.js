document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".referral-link button").addEventListener("click", (e) => {
        const input = document.querySelector(".referral-link input").select();
        document.execCommand("copy");
        swal({
            title: "Referral Link Copied!",
            icon: "success",
        });
    });
});
