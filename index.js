let prevY = 0;
$(document).on("scroll", function () {
    let currentY = $(this).scrollTop();
    if (currentY > prevY) {
        $("header").addClass("scroll-down");
        $(".navbar").find("button").addClass("scroll-down");
    }
    if (currentY === 0) {
        $("header").removeClass("scroll-down");
        $(".navbar").find("button").removeClass("scroll-down");
    }
    prevY = currentY;
});
